import {
  HostBinding,
  Input,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  AfterViewInit,
  Output,
  EventEmitter
} from '@angular/core';

/**
 * Angular wrapper for the soho wizard page.
 */
@Component({
    selector: 'div[soho-wizard-page]', // eslint-disable-line
    template: `<ng-content></ng-content>`,
    styles: [
        `:host {
        flex:           1;
        display:        flex;
        flex-direction: column;
        overflow-y:     auto;
    }`
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SohoWizardPageComponent implements AfterViewInit {
  jQueryElement!: JQuery;
  @HostBinding('class.wizard-page') isWizardPage = true;

  /**
   * Is this wizard page hidden? Return true by default to avoid
   * displaying all the pages for a moment.  The wizard will
   * ensure only a single page is displayed.
   *
   *
   */
  @HostBinding('class.hidden') hidden = true; // tslint: ignore-line

  /** This id of the associated tick. */
  @Input()
  tickId!: string; // tslint: ignore-line

  /**
   * Event fired when the page is activated.
   */
  @Output() activated = new EventEmitter<SohoWizardEvent>();

  /**
   * Constructor.
   *
   * @param el owning DOM element
   *
   */
  constructor(private el: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = $(this.el.nativeElement);
  }

  /**
   * Fire the activated event, using the given SohoWizardEvent.
   *
   * I'd have rather done this with an event, but we end up
   * with a circular dependency.
   *
   * @param e - the soho wizard event.
   *
   */
  fireActivated(e: SohoWizardEvent) {
    this.activated.next(e);
  }
}
