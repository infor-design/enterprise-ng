//tslint:disable
import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit
} from '@angular/core';

/**
 * Angular wrapper for the soho wizard page.
 */
@Component({
  selector: 'div[soho-wizard-page]',
  template: `<ng-content></ng-content>`,
  styles: [
    `:host {
        flex:           1;
        display:        flex;
        flex-direction: column;
        overflow-y:     auto;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardPageComponent implements AfterViewInit {
  jQueryElement: JQuery;
  @HostBinding('class.wizard-page') isWizardPage = true;

  /**
   * Is this wizard page hidden? Return true by default to avoid
   * displaying all the pages for a moment.  The wizard will
   * ensure only a single page is displayed.
   *
   * @memberof SohoWizardPageComponent
   */
  @HostBinding('class.hidden') hidden = true; // tslint: ignore-line

  /** This id of the associated tick. */
  @Input()
  tickId: string; // tslint: ignore-line

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
    this.jQueryElement = $(this.el.nativeElement);
  }
}
