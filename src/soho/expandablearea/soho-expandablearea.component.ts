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
  Input,
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
      this.expandablearea.close();
    }
  }
  // Expose Methods in case Angular needs to control the DOM, using Observables
  @Input() toggle: Observable<boolean>;

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
    private changeDetectorRef: ChangeDetectorRef
  ) {}
  ngAfterViewInit() {
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement.children[0]);

    // Attach handler for Open and Close listener
    if (this.toggle) {
      this.toggle.subscribe(value => this.toggleOpen(value));
    }

    // Add listeners to emit events
    this.jQueryElement.bind('beforeexpand', ((event: SohoExpandableAreaEvent) => { this.beforeexpand.emit(event); }));
    this.jQueryElement.bind('beforecollapse', ((event: SohoExpandableAreaEvent) => { this.beforecollapse.emit(event); }));
    this.jQueryElement.bind('expand', ((event: SohoExpandableAreaEvent) => { this.expand.emit(event); }));
    this.jQueryElement.bind('collapse', ((event: SohoExpandableAreaEvent) => { this.collapse.emit(event); }));
    this.jQueryElement.bind('afterexpand', ((event: SohoExpandableAreaEvent) => { this.afterexpand.emit(event); }));
    this.jQueryElement.bind('aftercollapse', ((event: SohoExpandableAreaEvent) => { this.aftercollapse.emit(event); }));

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

    setTimeout(() => {
      this.hasFixedPane = this.panes.filter(pane => pane.fixed).length !== 0;
      this.changeDetectorRef.detectChanges();
    });
  }
  ngOnDestroy() {
    this.expandablearea.destroy();
  }
  /**
   * Calls the expandablearea disable function
   */
  disable() {
    this.expandablearea.disable();
  }
  /**
   * Calls the expandablearea enable function
   */
  enable() {
    this.expandablearea.enable();
  }
  /**
   * Toggles the state of the expandablearea (open or closed) based on the passed
   * parameter.
   */
  toggleOpen(open: boolean) {
    this._closed = !open;
    return open ? this.expandablearea.open() : this.expandablearea.close();
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
}
