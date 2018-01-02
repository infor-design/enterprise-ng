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
  ContentChildren,
  ContentChild
} from '@angular/core';

import { SohoWizardTickComponent } from './soho-wizard-tick.component';
import { SohoWizardHeaderComponent } from './soho-wizard-header.component';
import { SohoWizardPagesComponent } from './soho-wizard-pages.component';
import { SohoWizardPageComponent } from './soho-wizard-page.component';

/**
 * Angular Wrapper for the Soho Wizard Component.
 *
 * This component searches for a div with the attribute
 * 'soho-wizard' in the DOM, initialising those found with
 * the SoHo Wizard control.
 *
 * TODO:
 * =====
 *
 * - handling of ticks / tick model (based on underlying widget)
 * - model driven
 * - support Builder Panel style (with title?)
 * - support for "modal style" buttons.
 * - extract state machine
 */
@Component({
  selector: 'div[soho-wizard]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [
    `:host {
        display:        flex;
        flex:           1;
        flex-direction: column;
    }`
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoWizardComponent implements AfterViewInit, AfterContentInit, OnDestroy {
  /**
   * Reference to the underlying container for the pages.
   *
   * @type {SohoWizardPagesComponent}
   * @memberof SohoWizardComponent
   */
  @ContentChild(SohoWizardPagesComponent) pagesContainer: SohoWizardPagesComponent;

  /**
   * Reference to the header, container for the ticks.
   *
   * @type {SohoWizardHeaderComponent}
   * @memberof SohoWizardComponent
   */
  @ContentChild(SohoWizardHeaderComponent) header: SohoWizardHeaderComponent;

  // -------------------------------------------
  // Inputs
  // -------------------------------------------

  /**
   * Ticks for the settings - this does not really work yet (i think).
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
    this.pagesContainer.pages.forEach(p => p.hidden = (p.tickId !== tickId));
    const step = this.header.steps.find(s => s.tickId === tickId);
    if (this.wizard && step) {
      this.wizard.activate(null, step.jQueryElement);
    }
  }

  get currentTickId(): string {
    const step = this.currentStep();
    return step ? step.tickId : null;
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
   * Ordered list of steps.
   *
   * @private
   * @type {SohoWizardTickComponent[]}
   * @memberof SohoWizardComponent
   */
  private _steps: SohoWizardTickComponent[];

  /**
   * Has the wizard finished.
   */
  private finished = false;

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

  /**
   * Returns the currently selected page.
   */
  public get currentPage(): SohoWizardPageComponent {
    if (this.pagesContainer && this.pagesContainer.pages) {
      return this.pagesContainer.pages.find(p => p.tickId === this.currentTickId);
    }
    return null;
  }

  /**
   * Moves to the first state if possible.
   */
  public first() {
    if (!this.finished && this.stepCount() > 0) {
      this.wizard.activate(null, this.stepAt(0).jQueryElement);
    }
  }

  /**
   * Attempts to move to the next step, if allowed.
   *
   * @memberof SohoWizardComponent
   */
  public next() {
    // This is a bit grim ... but we need to rely on ticks for the state.
    let currentIndex = this.currentIndex();

    // @todo handle disabled states.
    if (!this.finished && ++currentIndex < this.stepCount()) {
      this.wizard.activate(null, this.stepAt(currentIndex).jQueryElement);
    }
  }

  /**
   * Attempts to move to the previous step, if allowed.
   *
   * @memberof SohoWizardComponent
   */
  public previous() {
    let currentIndex = this.currentIndex();
    if (!this.finished && --currentIndex >= 0) {
      this.wizard.activate(null, this.stepAt(currentIndex).jQueryElement);
    }
  }

  /**
   * Attempts to move to the last step, if allowed.
   *
   * @memberof SohoWizardComponent
   */
  public last() {
    const step = this.stepAt(this.stepCount() - 1);
    this.wizard.activate(null, step.jQueryElement);
  }

  /**
   * Attempts to move to the last step, and finish the wizard.
   *
   * @memberof SohoWizardComponent
   */
  public finish() {
    // Mark the wizard as finished.
    this.finished = true;

    // Disabled all ticks.
    this.header.steps.forEach(p => p.disabled = this.finished);

    // Move to the last tick.
    this.last();
  }

  /**
   * Is there another step after the current step?
   *
   * @returns {boolean} true if there is another step; otherwise false.
   * @memberof SohoWizardComponent
   */
  public hasNext(): boolean {
    return !this.finished && this.currentIndex() < this.stepCount() - 1;
  }

  /**
   * Is there previous step.
   */
  public hasPrevious(): boolean {
    return !this.finished && this.currentIndex() > 0;
  }

  /**
   * Returns true if the process has finished,
   * otherwise false.
   *
   * @returns {boolean}
   * @memberof SohoWizardComponent
   */
  public hasFinished(): boolean {
    return this.finished;
  }

  /**
   * Resets the state machine, moving to the first page
   * and clearing finished flag.
   */
  public reset(): void {
    this.finished = false;
    this.first();
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

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
      .on('activated', (e: JQuery.Event, tick: JQuery) => this.onActivated(tick))
      .on('afteractivated', (e: JQuery.Event, tick: JQuery) => this.afteractivated.next({ tick: tick }));

    // Reset the cached steps if the list of steps changes.
    if (this.header) {
      this.header.steps.changes.subscribe(() => { this._steps = null; });
    }
  }

  ngAfterContentInit() {
    // Added delay otherwise the component is not complete
    // causing the active page to not be displayed.
    setTimeout(() => {
      if (this.header) {
        const step = this.header.steps.find(s => s.isCurrentTick());
        this.pagesContainer.pages.forEach(p => p.hidden = (!step || step.tickId !== p.tickId));
      }
    });
  }

  /**
   * Handle component destruction by clearing down the SoHo
   * wizard component.
   *
   * @memberof SohoWizardComponent
   */
  ngOnDestroy() {
    if (this.wizard) {
      this.wizard.destroy();
      this.wizard = null;
    }
  }

  private onActivated(tick: JQuery): void {
    // When activated - make sure the rest of the component is
    // updated ...
    if (tick) {
      // ... find the id of the tick activated ...
      const tickId = tick.attr('tickId');

      // ... if we have one (to avoid errors) ...
      if (tickId) {
        // hide all the inactive pages and show the active page.
        this.pagesContainer.pages.forEach(
          (p) => {
            if (tickId === p.tickId) {
              // fire an event on the page.
              p.fireActivated({ tick: tick });

              // ... show it.
              p.hidden = false;
            } else {

              // hide it.
              p.hidden = true;
            }
          });

        // ... publish.
        this.activated.next({ tick: tick });
      }
    }
  }

  private onBeforeActivate(tick: SohoWizardTick): boolean {
    // Check for vetoing.
    return this.beforeActivate != null ? this.beforeActivate.call(tick) : true;
  }

  private stepCount(): number {
    return this.header.steps.length;
  }

  private steps(): SohoWizardTickComponent[] {
    if (!this._steps) {
      this._steps = this.header.steps.toArray();
    }
    return this._steps;
  }
  private stepAt(index: number): SohoWizardTickComponent {
    return this.steps()[index];
  }

  private currentIndex(): number {
    return this.steps().indexOf(this.currentStep());
  }

  private currentStep(): SohoWizardTickComponent {
    return this.steps().find(s => s.isCurrentTick());
  }
}
