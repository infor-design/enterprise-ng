import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit} from '@angular/core';

  /**
   * Angular wrapper for the soho wizard page.
   *
   * @todo WIP
   */
@Component({
  selector: 'div[soho-wizard-page]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardPageComponent implements AfterViewInit {
  jqueryElement: JQuery;
  @HostBinding('class.wizard-page') isWizardPage = true;

  @HostBinding('class.hidden') hidden = false;

  /** This id of the tick. */
  @Input()
  tickId: string;

  constructor(public el: ElementRef) {}

  ngAfterViewInit() {
    this.jqueryElement = $(this.el.nativeElement);
  }
}
