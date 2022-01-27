import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'button[soho-actionsheet]', // eslint-disable-line
  templateUrl: 'soho-actionsheet.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoActionsheetComponent {
  @HostBinding('class.vertical') isVerticalIcon = true;
  @HostBinding('class.btn-actions') isButtonActions = true;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) {}

  private options: SohoActionsheetOptions = {};
  private actionsheet?: SohoActionsheet | null;
  private jQueryElement!: JQuery;

  @Input() set actions(actions: SohoActionsheetActions | undefined) {
    this.options.actions = actions;

    if (this.actionsheet) {
      this.actionsheet.settings.actions = actions;
    }
  }
  public get actions(): SohoActionsheetActions | undefined {
    if(!this.actionsheet) {
      return this.options.actions;
    }
    return this.actionsheet.settings.actions;
  }

  @Input() set showCancelButton(showCancelButton: boolean | undefined) {
    this.options.showCancelButton = showCancelButton;

    if (this.actionsheet) {
      this.actionsheet.settings.showCancelButton = showCancelButton;
    }
  }
  public get showCancelButton(): boolean | undefined {
    if (!this.actionsheet) {
      return this.options.showCancelButton;
    }
    return this.actionsheet.settings.showCancelButton;
  }
}
