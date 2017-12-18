import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'soho-header',
  templateUrl: './soho-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoHeaderComponent implements AfterViewInit {
  @HostBinding('class.header') get isHeader() { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }
  @HostBinding('class.has-toolbar') @Input() hasToolbar;
  @HostBinding('class.has-tabs') @Input() hasTabs;

  /**
   * This event is fired when the status of the header is changed.
   * @type {EventEmitter<any>}
   */
  @Output() updated = new EventEmitter<any>();

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the annotated SoHoXi control
  private header: SohoHeaderStatic;

  constructor(private elementRef: ElementRef) {}

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the SoHoXi control.
    this.jQueryElement.header();

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'sohoxiHeader'.
    this.header = this.jQueryElement.data('header');

    // Initialize any event handlers.
    this.jQueryElement.on('updated', (e: JQuery.Event, args: any) => { this.updated.emit(args); });
  }
}
