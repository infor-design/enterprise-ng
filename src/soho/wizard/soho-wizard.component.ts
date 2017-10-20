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
import { SohoWizardPageComponent } from 'soho/wizard/soho-wizard-page.component';

/**
 * Angular Wrapper for the Soho Wizard Component.
 *
 * This component searches for adiv with the attribute
 * 'soho-wizard' in the DOM, initialising those found with
 * the SoHo Wizard control.
 *
 * TODO:
 * =====
 *
 * - setting initial tick (page)
 * - better handling of ticks / tick model.
 * - model driven
 * - add default button bar (like modal)
 *
 * Alot of this depends on which way the SoHo widge goes.
 */
@Component({
  selector: 'div[soho-wizard]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardComponent implements AfterViewInit, AfterContentInit, OnInit, OnDestroy {
  _currentTickId: string;

  /** List of underlyinh pages. */
  @ContentChildren(SohoWizardPageComponent) pages: QueryList<SohoWizardPageComponent>;

  @ContentChildren(SohoWizardTickComponent) tickComponents: QueryList<SohoWizardTickComponent>;

  private pageList: Array<SohoWizardPageComponent> = [];

  // -------------------------------------------
  // Inputs
  // -------------------------------------------

  /**
   * Ticks for the settings - ??
   */
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

  /** Id of the current tick. */
  @Input()
  set currentTickId(tickId: string) {
    if (this._currentTickId !== tickId) {
      const page: SohoWizardPageComponent = this.pages.find(p => (p.tickId === tickId));
      this.pages.forEach(p => p.hidden = (p.tickId !== tickId));
      if (this.wizard && page) {
        this.wizard.activate(null, page.jqueryElement);
      }
   }
  }

  get currentTickId(): string {
    return this._currentTickId;
  }

  /**
   * Provides a `beforeActivate` vetoable handler, which
   * allows the caller to prevent activation of a link.
   *
   * @todo needs linking with any buttons!
   */
  @Input()
  private beforeActivate?: (tick: SohoWizardTick) => boolean;

  /**
   * This event is fired when a tick is activated.
   */
  @Output()
  public activated = new EventEmitter<SohoWizardEvent>();

  /**
   * This event is fired after a tick is activated.
   */
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

  public next() {

  }

  public previous() {

  }

  public finish() {

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

  }

  ngAfterContentInit() {
    this._currentTickId = this.tickComponents.find(p => p.isCurrentTick()).tickId;
  }

  ngOnDestroy() {
    if (this.wizard) {
      this.wizard.destroy();
      this.wizard = null;
    }
  }

  private onActivated(tick: JQuery): void {
    const page = this.pages.find(p => p.jqueryElement === tick);
    this._currentTickId = page.tickId;
    this.pages.forEach(p => p.hidden = p.tickId !== this._currentTickId);
    this.activated.next({ tick: tick });
  }

  private onBeforeActivate(tick: SohoWizardTick): boolean {
    return this.beforeActivate != null ? this.beforeActivate.call(tick) : true;
  }
}
