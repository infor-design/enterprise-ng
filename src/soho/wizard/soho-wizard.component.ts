import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  Optional,
  OnInit,
  OnDestroy,
  ViewChildren,
  QueryList,
  AfterContentInit,
  ViewChild,
  ContentChildren
} from '@angular/core';

import { SohoWizardTickComponent } from './soho-wizard-tick.component';
import { SohoWizardHeaderComponent } from './soho-wizard-header.component';

/**
 * Angular Wrapper for the Soho Wizard Component.
 *
 * This component searches for adiv with the attribute
 * 'soho-wizard' in the DOM, initialising those found with
 * the SoHo Wizard control.
 */
@Component({
  selector: 'div[soho-wizard]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardComponent implements AfterViewInit, AfterContentInit, OnInit, OnDestroy {
  // Can't see ticks as they are nested in another component, not directly in this one.
  @ViewChildren(SohoWizardTickComponent) _wizardStepComponents: QueryList<SohoWizardTickComponent>;

  // -------------------------------------------
  // Inputs
  // -------------------------------------------

  @Input()
  set ticks(ticks: SohoWizardTick[]) {
    this._options.ticks = ticks;

    if (this.wizard) {
      this.wizard.settings.ticks = this._options.ticks;
      this.wizard.updated();
    }
  }

  get ticks() {
    return this._options.ticks;
  }

  @Input()
  private beforeActivate?: (tick: SohoWizardTick) => boolean;

  @Output()
  public activated = new EventEmitter<SohoWizardEvent>();

  @Output()
  public afteractivated = new EventEmitter<SohoWizardEvent>();

  // -------------------------------------------
  // Hostbinding
  // -------------------------------------------

  @HostBinding('class.wizard') isWizardClass = true;

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery control. */
  private jQueryElement: JQuery;

  /** Reference to the SoHo wizard control api. */
  private wizard: SohoWizardStatic;

  /** An internal options object that gets updated by using the component's Inputs(). */
  private _options: SohoWizardOptions = {};

  /**
   * Constructor.
   *
   * @param elementRef - the element matching this component.
   */
  constructor(private elementRef: ElementRef) {
  }

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  public activate(tick: JQuery) {
    // @todo not happy with this!
    this.wizard.activate(null, tick);
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngOnInit() {
  }

  ngAfterViewInit() {
    // Wrap the "unordered list" element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the Soho control.
    this.jQueryElement.wizard(this._options);

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case it is 'wizard'.
    this.wizard = this.jQueryElement.data('wizard');

    // Initialize any event handlers.
    this.jQueryElement
      .on('beforeactivate', ((e: any) => this.onBeforeActivate(e)))
      .on('activated', (e: JQueryEventObject, args: JQuery) => this.onActivated(args))
      .on('afteractivated', (e: JQueryEventObject, args: SohoWizardEvent) => this.afteractivated.next(args));

      this.wizard.activate(null, $(`[tickId=1]`));
  }

  ngAfterContentInit() {
  }

  ngOnDestroy() {
    if (this.wizard) {
      this.wizard.destroy();
      this.wizard = null;
    }
  }

  private onActivated(args: JQuery): void {
    this.activated.next({ tick: args });
  }

  private onBeforeActivate(tick: SohoWizardTick): boolean {
    return this.beforeActivate != null ? this.beforeActivate.call(tick) : true;
  }
}
