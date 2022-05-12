// tslint:disable-next-line:no-unused-variable
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

// tslint:disable-next-line:no-unused-variable
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
export class ExpandableHeaderComponent { }

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
export class ExpandableFooterComponent { }

@Component({
  selector: 'soho-expandable-area',
  templateUrl: 'soho-expandablearea.component.html',
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableAreaComponent implements AfterViewInit, OnDestroy {
  @Input('soho-expandable-area') id: string | undefined; // eslint-disable-line
  @Input() set disabled(value: boolean | undefined) {
    this._disabled = value;
    if (this.jQueryElement) {
      if (value) {
        this.disable();
      } else {
        this.enable();
      }
    }
  }

  /**
   * Boolean value of the disabled state of the component
   */
  get disabled(): boolean | undefined {
    return this._disabled;
  }

  @Input() set closed(value: boolean | undefined) {
    this._closed = value;
    if (value && this.jQueryElement) {
      this.close();
    }
  }

  /**
   * Boolean value of the closed state of the component
   */
  get closed(): boolean | undefined {
    return this._closed;
  }

  // Expose Methods in case Angular needs to control the DOM, using Observables
  @Input() toggle?: Observable<boolean>;

  // Get the header DOM element
  @ContentChild(forwardRef(() => ExpandableHeaderComponent), { static: true }) // eslint-disable-line
  // eslint-disable-line
  // eslint-disable-line
  public header: ExpandableHeaderComponent | undefined = undefined;

  // Get the pane DOM elements
  @ContentChildren(forwardRef(() => ExpandablePaneComponent)) // eslint-disable-line
  public panes: QueryList<ExpandablePaneComponent> | undefined;

  // @ContentChild(forwardRef(() => ExpandablePaneComponent))
  // private _pane: ExpandablePaneComponent = null;

  // Get the pane DOM element
  @ContentChild(forwardRef(() => ExpandableFooterComponent), { static: true }) // eslint-disable-line
  // eslint-disable-line
  // eslint-disable-line
  public footer?: ExpandablePaneComponent = undefined;

  // Add Events for Angular elements to listen to (can only have exposed events)
  @Output() beforeexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforecollapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() expand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() collapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afterexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() aftercollapse: EventEmitter<Object> = new EventEmitter<Object>();

  // Various local variables used for logic
  private jQueryElement?: JQuery;
  private expandablearea?: SohoExpandableAreaStatic | null;
  private _disabled?: boolean;
  private _closed?: boolean;
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
      this.jQueryElement = jQuery(this.element.nativeElement.children[0]);

      // Attach handler for Open and Close listener
      if (this.toggle) {
        this.toggle.subscribe(value => this.toggleOpen(value));
      }

      // Add listeners to emit events
      this.jQueryElement.on('beforeexpand', (event: SohoExpandableAreaEvent) => this.onBeforeExpand(event));
      this.jQueryElement.on('beforecollapse', (event: SohoExpandableAreaEvent) => this.onBeforeCollapse(event));
      this.jQueryElement.on('expand', (event: SohoExpandableAreaEvent) => this.onExpand(event));
      this.jQueryElement.on('collapse', (event: SohoExpandableAreaEvent) => this.onCollapse(event));
      this.jQueryElement.on('afterexpand', (event: SohoExpandableAreaEvent) => this.onAfterExpand(event));
      this.jQueryElement.on('aftercollapse', (event: SohoExpandableAreaEvent) => this.onAfterCollapse(event));

      // Add listeners to emit events
      // Instantiate the element via jQuery
      this.jQueryElement.expandablearea({
        id: this.id,
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
          // todo @theo what do you think about this timeout?
          this.hasFixedPane = this.panes?.filter(pane => pane.fixed).length !== 0;
          this.changeDetectorRef.markForCheck();
        });
      });
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
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
    this.ngZone.runOutsideAngular(() => this.expandablearea?.disable());
  }

  /**
   * Calls the expandablearea enable function
   */
  enable() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea?.enable());
  }

  /**
   * Toggles the state of the expandablearea (open or closed) based on the passed
   * parameter.
   */
  toggleOpen(open: boolean) {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      this._closed = !open;
      if (open) {
        this.expandablearea?.open();
      } else {
        this.expandablearea?.close();
      }
    });
  }

  close() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea?.close());
  }

  open() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => this.expandablearea?.open());
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
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.beforeexpand.emit(event));
  }

  private onBeforeCollapse(event: SohoExpandableAreaEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.beforecollapse.emit(event));
  }

  private onExpand(event: SohoExpandableAreaEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.expand.emit(event));
  }

  private onCollapse(event: SohoExpandableAreaEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.collapse.emit(event));
  }

  private onAfterExpand(event: SohoExpandableAreaEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.afterexpand.emit(event));
  }

  private onAfterCollapse(event: SohoExpandableAreaEvent) {
    // ensure we are back in the angular zone
    this.ngZone.run(() => this.aftercollapse.emit(event));
  }
}
