import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  AfterContentInit,
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
  selector: 'div[soho-wizard]', // eslint-disable-line
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
   *
   *
   */
  @ContentChild(SohoWizardPagesComponent, { static: true }) pagesContainer?: SohoWizardPagesComponent;

  /**
   * Reference to the header, container for the ticks.
   *
   *
   *
   */
  @ContentChild(SohoWizardHeaderComponent, { static: true }) header?: SohoWizardHeaderComponent;

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
    return this._options.ticks as any;
  }

  /** Id of the current tick. */
  @Input()
  set currentTickId(tickId: string) {
    this.pagesContainer?.pages.forEach(p => p.hidden = (p.tickId !== tickId));
    const step = this.header?.steps?.find(s => s.tickId === tickId);

    if (this.wizard && step?.jQueryElement) {
      this.wizard.activate(null, step.jQueryElement);
    }
  }

  get currentTickId(): string {
    const step = this.currentStep();
    const tickId = step?.tickId;
    return tickId || '';
  }

  /**
   * Provides a `beforeActivate` vetoable handler, which
   * allows the caller to prevent activation of a link.
   *
   * @todo needs linking with any buttons!
   */
  @Input()
  private beforeActivate?: (tick?: SohoWizardTick) => boolean;

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
  private jQueryElement?: JQuery;

  /** Reference to the SoHo wizard control api. */
  private wizard?: SohoWizardStatic | undefined;

  /** An internal options object that gets updated by using the component's Inputs(). */
  private _options: SohoWizardOptions = {};

  /**
   * Ordered list of steps.
   *
   *
   *
   *
   */
  private _steps?: SohoWizardTickComponent[];

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
  public get currentPage(): SohoWizardPageComponent | undefined {
    if (this.pagesContainer && this.pagesContainer?.pages) {
      return this.pagesContainer?.pages.find(p => p.tickId === this.currentTickId);
    }
    return undefined;
  }

  /**
   * Moves to the first state if possible.
   */
  public first() {
    if (this.wizard && !this.finished && this.stepCount() > 0) {
      const step = this.stepAt(0);
      if (step && step.jQueryElement) {
        this.wizard.activate(null, step.jQueryElement);
      }
    }
  }

  /**
   * Attempts to move to the next step, if allowed.
   *
   *
   */
  public next() {
    // This is a bit grim ... but we need to rely on ticks for the state.
    let currentIndex = this.currentIndex();

    // @todo handle disabled states.
    if (!this.finished && ++currentIndex < this.stepCount()) {
      const step = this.stepAt(currentIndex);
      if (step && step.jQueryElement) {
        this.wizard?.activate(null, step.jQueryElement);
      }
    }
  }

  /**
   * Attempts to move to the previous step, if allowed.
   *
   *
   */
  public previous() {
    let currentIndex = this.currentIndex();
    if (!this.finished && --currentIndex >= 0) {
      const step = this.stepAt(currentIndex);
      if (step && step.jQueryElement) {
        this.wizard?.activate(null, step.jQueryElement);
      }
    }
  }

  /**
   * Attempts to move to the last step, if allowed.
   *
   *
   */
  public last() {
    const step = this.stepAt(this.stepCount() - 1);
    if (step && step.jQueryElement) {
      this.wizard?.activate(null, step.jQueryElement);
    }
  }

  /**
   * Attempts to move to the last step, and finish the wizard.
   *
   *
   */
  public finish() {
    // Mark the wizard as finished.
    this.finished = true;

    // Disabled all ticks.
    this.header?.steps?.forEach(p => p.disabled = this.finished);

    // Move to the last tick.
    this.last();
  }

  /**
   * Is there another step after the current step?
   *
   * @return  true if there is another step; otherwise false.
   *
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
      .on('beforeactivate', (_e: JQuery.TriggeredEvent, tick: SohoWizardTick) => this.onBeforeActivate(tick))
      .on('activated', (_e: JQuery.TriggeredEvent, tick: JQuery) => this.onActivated(tick))
      .on('afteractivated', (_e: JQuery.TriggeredEvent, tick: JQuery) => this.afteractivated.next({ tick }));

    // Reset the cached steps if the list of steps changes.
    if (this.header) {
      this.header.steps?.changes.subscribe(() => {
        this._steps = [];
      });
    }
  }

  ngAfterContentInit() {
    // Added delay otherwise the component is not complete
    // causing the active page to not be displayed.
    setTimeout(() => {
      if (this.header) {
        const step = this.header.steps?.find(s => s.isCurrentTick());
        this.pagesContainer?.pages.forEach(p => p.hidden = (!step || step.tickId !== p.tickId));
      }
    });
  }

  /**
   * Handle component destruction by clearing down the SoHo
   * wizard component.
   *
   *
   */
  ngOnDestroy() {
    if (this.wizard) {
      this.wizard.destroy();
      this.wizard = undefined;
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
        this.pagesContainer?.pages.forEach(
          (p) => {
            if (tickId === p.tickId) {
              // fire an event on the page.
              p.fireActivated({ tick });

              // ... show it.
              p.hidden = false;
            } else {

              // hide it.
              p.hidden = true;
            }
          });

        // ... publish.
        this.activated.next({ tick });
      }
    }
  }

  private onBeforeActivate(tick: SohoWizardTick): boolean {
    // Check for vetoing.
    return this.beforeActivate != null ? this.beforeActivate.call(tick) : true;
  }

  private stepCount(): number {
    return this.header?.steps?.length || 0;
  }

  private steps(): SohoWizardTickComponent[] | undefined {
    if (!this._steps && this.header) {
      this._steps = this.header?.steps?.toArray();
    }
    return this._steps;
  }
  private stepAt(index: number): SohoWizardTickComponent | undefined {
    const steps = this.steps();
    return steps ? steps[index] : undefined;
  }

  private currentIndex(): number {
    const steps = this.steps();
    const currentStep = this.currentStep();
    return steps && currentStep ? steps.indexOf(currentStep) : -1;
  }

  private currentStep(): SohoWizardTickComponent | undefined {
    const steps = this.steps();
    return steps ? steps.find(s => s.isCurrentTick()) : undefined;
  }
}
