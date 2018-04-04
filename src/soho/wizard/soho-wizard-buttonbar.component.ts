import {
  Component,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
} from '@angular/core';

import { SohoWizardComponent } from './soho-wizard.component';

/**
 * Angular wrapper for the soho wizard buttonbar.
 *
 * Looks for a `div` annotated with `soho-wizard-buttonbar`, this
 * simply adds a component used to handle the button selection.
 */
@Component({
  selector: 'div[soho-wizard-buttonbar]', // tslint:disable-line
  template: `
    <hr class="fieldset-hr">
    <div class="buttonbar">
      <div class="left">
        <ng-container *ngFor="let button of buttons" >
          <button *ngIf="button.position==='left'"
            [soho-button]="button?.type" [icon]="button?.icon" [id]='button?.id' [disabled]="button?.disabled()"
            (click)='button?.click()'>{{button?.text}}</button>
        </ng-container>
      </div>
      <div class="middle">
      <ng-container *ngFor="let button of buttons" >
        <button *ngIf="button.position==='middle'"
          [soho-button]="button?.type" [icon]="button?.icon" [id]='button?.id' [disabled]="button?.disabled()"
          (click)='button?.click()'>{{button?.text}}</button>
      </ng-container>
      </div>
      <div class="right">
        <ng-container *ngFor="let button of buttons" >
          <button *ngIf="button.position==='right'"
            [soho-button]="button?.type" [icon]="button?.icon" [id]='button?.id' [disabled]="button?.disabled()"
            (click)='button?.click()'>{{button?.text}}</button>
        </ng-container>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `:host {
      flex: 0;
    }`,
    `.buttonbar {
      display:flex;
    }`,
    `.left {
      flex: 1;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }`,
    `.middle {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }`,
    `.right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardButtonbarComponent {

  @Input()
  public buttons = [
    { id:       'previous',
      text:     Soho.Locale.translate('Previous'),
      click:    () => { this.wizard.previous(); },
      disabled: () => !this.wizard.hasPrevious(),
      position: 'middle'
    },
    { id:        'next',
      text:      Soho.Locale.translate('Next'),
      click:     () => { this.wizard.next(); },
      disabled:  () => !this.wizard.hasNext(),
      isDefault: true,
      position:  'middle'
    },
    { id:        'finish',
      text:      'Finish', // Soho.Locale.translate('Finish'),
      click:     () => { this.wizard.finish(); },
      disabled:  () => this.wizard.hasFinished(),
      position:  'right'
    }];

  @HostBinding('class.buttonset') isButtonBar = false;

  constructor(private wizard: SohoWizardComponent, private changeDetectorRef: ChangeDetectorRef) {
    // Ensures all the button are redrawn, keeping track of their enabled state.
    this.wizard.afteractivated.subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }
}

interface SohoWizardButton {
  /**
   * Id for the button element.
   *
   * @type {string}
   * @memberof SohoWizardButton
   */
  id?: string;

  /**
   * Text used inside the button.
   *
   * @type {string}
   * @memberof SohoWizardButton
   */
  text: string;

  /**
   * Click handler.
   *
   * @memberof SohoWizardButton
   */
  click: () => void;

  /**
   * Disable callback.
   *
   * @memberof SohoWizardButton
   */
  disabled?: () => boolean;

  /**
   * Location in the buttonbar.
   *
   * @type {('left' | 'middle' | 'right')}
   * @memberof SohoWizardButton
   */
  position?: 'left' | 'middle' | 'right';
}
