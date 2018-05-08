import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Input, NgZone,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';

import { Observable } from 'rxjs';

/**
 * Helper Component for the ExpandableAreaComponent
 */
@Component({
  selector: 'soho-expandable-header',
  template: `
    <span class="title">
      <ng-content></ng-content>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpandableHeaderComponent {}

/**
 * Helper Component for the ExpandableAreaComponent
 */
@Component({
  selector: 'soho-expandable-pane',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandablePaneComponent {
  @HostBinding('attr.fixed')
  @Input() fixed = false;
}

/**
 * Helper Component for the ExpandableAreaComponent
 */
@Component({
  selector: 'soho-expandable-footer',
  template: `
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableFooterComponent {}

@Component({
  selector: 'soho-expandable-area',
  templateUrl: './soho-expandablearea.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableAreaComponent implements AfterViewInit, OnDestroy {
  @Input('soho-expandable-area') id: string; // tslint:disable-line
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (this.jQueryElement) {
      if (value) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  @Input() set closed(value: boolean) {
    this._closed = value;
    if (value && this.jQueryElement) {
      this.close();
    }
  }

  // Expose Methods in case Angular needs to control the DOM, using Observables
  @Input() toggle: Observable<boolean>;

  /**
   * A initial setting only of the events you'd like to have hooked up in the agnular wrapper.
   * This aids in reducing change detection as each bound event that gets called (whether you
   * are interested in it or not) causes change detection to get called which causes the screen
   * to re-render each time.
   *
   * This is backward compatible if you don't use the registerForEvents input. If you want no
   * events hooked up then use registerForEvent="". Otherwise just specify the events you want
   * hooked up to sohoxi from this angular component.
   *
   * @type {string} a space delimited list of the events to be hooked up to sohoxi.
   *       example: "activated afterActivated tabAdded"
   */
  @Input() registerForEvents = undefined;

  // Get the header DOM element
  @ContentChild(forwardRef(() => ExpandableHeaderComponent)) // tslint:disable-line
  public header: ExpandableHeaderComponent = null;

  // Get the pane DOM elements
  @ContentChildren(forwardRef(() => ExpandablePaneComponent)) // tslint:disable-line
  public panes: QueryList<ExpandablePaneComponent>;

  // @ContentChild(forwardRef(() => ExpandablePaneComponent))
  // private _pane: ExpandablePaneComponent = null;

  // Get the pane DOM element
  @ContentChild(forwardRef(() => ExpandableFooterComponent)) // tslint:disable-line
  public footer: ExpandablePaneComponent = null;

  // Add Events for Angular elements to listen to (can only have exposed events)
  @Output() beforeexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforecollapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() expand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() collapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afterexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() aftercollapse: EventEmitter<Object> = new EventEmitter<Object>();

  // Various local variables used for logic
  private jQueryElement: JQuery;
  private expandablearea: SohoExpandableAreaStatic;
  private _disabled: boolean;
  private _closed: boolean;
  public hasFixedPane = true;

  constructor(
    private element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
  ) {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Assign element to local variable
      this.jQueryElement = jQuery(this.element.nativeElement.children[ 0 ]);

      // Attach handler for Open and Close listener
      if (this.toggle) {
        this.toggle.subscribe(value => this.toggleOpen(value));
      }

      // Add listeners to emit events
      this.hookupRegisteredEvents();

      // Add listeners to emit events
      // Instantiate the element via jQuery
      this.jQueryElement.expandablearea({
        id:       this.id,
        disabled: this.disabled,
        expanded: !this.closed,
      });
      this.expandablearea = this.jQueryElement.data('expandablearea');

      // Check initial values (since constructor doesn't handle it)
      if (this.disabled) {
        this.disable();
      }
      // Be specific so that undefined is not counted
      if (this.closed) {
        this.toggleOpen(false);
      } else if (typeof this.closed !== 'undefined') {
        this.toggleOpen(true);
      }

      this.ngZone.run(() => {
        // Ensure we are back in a zone so that the timeout will trigger change detection.
        // This is necessary because hasFixedPane is part of the angular template and
        // hence angular needs to know about it.
        setTimeout(() => {
          this.hasFixedPane = this.panes.filter(pane => pane.fixed).length !== 0;
          this.changeDetectorRef.markForCheck();
        });
      });
    });
  }

  private hookupRegisteredEvents() {
    NgZone.assertNotInAngularZone();

    let eventsToRegister = null;
    if (this.registerForEvents !== undefined) {
      eventsToRegister = this.registerForEvents.split(' ');
    }

    // if no events are registered then all event will be bound for backward compatibility.
    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforeexpand')) {
      this.jQueryElement.on('beforeexpand', (event: SohoExpandableAreaEvent) => this.onBeforeExpand(event));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'beforecollapse')) {
      this.jQueryElement.on('beforecollapse', (event: SohoExpandableAreaEvent) => this.onBeforeCollapse(event));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'expand')) {
      this.jQueryElement.on('expand', (event: SohoExpandableAreaEvent) => this.onExpand(event));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'collapse')) {
      this.jQueryElement.on('collapse', (event: SohoExpandableAreaEvent) => this.onCollapse(event));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'afterexpand')) {
      this.jQueryElement.on('afterexpand', (event: SohoExpandableAreaEvent) => this.onAfterExpand(event));
    }

    if (this.registerForEvents === undefined || eventsToRegister.some(event => event === 'aftercollapse')) {
      this.jQueryElement.on('aftercollapse', (event: SohoExpandableAreaEvent) => this.onAfterCollapse(event));
    }
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.expandablearea) {
        this.expandablearea.destroy();
        this.expandablearea = null;
      }
    });
  }

  /**
   * Calls the expandablearea disable function
   */
  disable() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea.disable());
  }

  /**
   * Calls the expandablearea enable function
   */
  enable() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea.enable());
  }

  /**
   * Toggles the state of the expandablearea (open or closed) based on the passed
   * parameter.
   */
  toggleOpen(open: boolean) {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      this._closed = !open;
      open ? this.expandablearea.open() : this.expandablearea.close();
    });
  }

  private close() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea.close());
  }

  private open() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea.open());
  }

  /**
   * Boolean value of the closed state of the component
   */
  get closed() {
    return this._closed;
  }

  /**
   * Boolean value of the disabled state of the component
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * The class setter for the expandable area div element
   */
  get expandableAreaClasses() {
    return 'expandable-area';
  }

  /**
   * The class setter for the header element
   */
  get headerClasses() {
    return 'expandable-header';
  }

  /**
   * The class setter for the pane element
   */
  get paneClasses() {
    return 'expandable-pane';
  }

  /**
   * The class setter for the pane element
   */
  get footerClasses() {
    return 'expandable-footer';
  }

  /**
   * The class setter for the visible pane element
   */
  get visiblePaneClasses() {
    return 'expandable-visible-pane';
  }

  private onBeforeExpand(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.beforeexpand.emit(event), 1));
  }

  private onBeforeCollapse(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.beforecollapse.emit(event), 1));
  }

  private onExpand(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.expand.emit(event), 1));
  }

  private onCollapse(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.collapse.emit(event), 1));
  }

  private onAfterExpand(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.afterexpand.emit(event), 1));
  }

  private onAfterCollapse(event: SohoExpandableAreaEvent) {
    NgZone.assertNotInAngularZone();

    // ensure we are back in a zone so that the timeout will trigger change detection.
    this.ngZone.run(() => setTimeout(() => this.aftercollapse.emit(event), 1));
  }
}
