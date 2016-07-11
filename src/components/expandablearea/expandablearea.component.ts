import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  forwardRef,
} from '@angular/core';
import { Observable } from 'rxjs/Rx';

declare var jQuery: any;

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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() fixed: boolean = false;
}

@Component({
  moduleId: module.id,
  selector: 'soho-expandable-area',
  templateUrl: 'expandablearea.component.html',
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
      this.jQueryElement.close();
    }
  }
  // Expose Methods in case Angular needs to control the DOM, using Observables
  @Input() toggle: Observable<boolean>;

  // Get the header DOM element
  @ContentChild(forwardRef(() => ExpandableHeaderComponent))
  private _header: ExpandableHeaderComponent = null;
  // Get the pane DOM element
  @ContentChild(forwardRef(() => ExpandablePaneComponent))
  private _pane: ExpandablePaneComponent = null;

  // Add Events for Angular elements to listen to (can only have exposed events)
  @Output() beforeexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() beforecollapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() expand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() collapse: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() afterexpand: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() aftercollapse: EventEmitter<Object> = new EventEmitter<Object>();

  // Various local variables used for logic
  private jQueryElement: any;
  private expandablearea: any;
  private _disabled: boolean;
  private _closed: boolean;

  constructor(private element: ElementRef) {}
  ngAfterViewInit() {
    // Check that header and pane exist
    if (!this._header) {
      console.error('Missing expandable header in expandable area.');
    }
    if (!this._pane) {
      console.error('Missing expandable pane in expandable area.');
    }
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement.children[0]);

    // Attach handler for Open and Close listener
    if (this.toggle) {
      this.toggle.subscribe(value => this.toggleOpen(value));
    }

    // Add listeners to emit events
    this.jQueryElement.bind('beforeexpand', ((event: ExpandableAreaEvent) => { this.beforeexpand.emit(event); }));
    this.jQueryElement.bind('beforecollapse', ((event: ExpandableAreaEvent) => { this.beforecollapse.emit(event); }));
    this.jQueryElement.bind('expand', ((event: ExpandableAreaEvent) => { this.expand.emit(event); }));
    this.jQueryElement.bind('collapse', ((event: ExpandableAreaEvent) => { this.collapse.emit(event); }));
    this.jQueryElement.bind('afterexpand', ((event: ExpandableAreaEvent) => { this.afterexpand.emit(event); }));
    this.jQueryElement.bind('aftercollapse', ((event: ExpandableAreaEvent) => { this.aftercollapse.emit(event); }));

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
   * The class setter for the visible pane element
   */
  get visiblePaneClasses() {
    return 'expandable-visible-pane';
  }
}

/**
 * Holds all directives usable for expandablearea
 */
export const EXPANDABLEAREA_COMPONENTS = [
  ExpandableAreaComponent,
  ExpandableHeaderComponent,
  ExpandablePaneComponent,
];

/**
 * Interface for the jQuery event emitted
 */
export interface ExpandableAreaEvent {
  currentTarget: HTMLElement;
  data: any;
  delegateTarget: HTMLElement;
  handleObj: Object;
  isTrigger: number;
  namespace: string;
  result: any;
  rnamespace: any;
  target: HTMLElement;
  timeStamp: number;
  type: string;
}
