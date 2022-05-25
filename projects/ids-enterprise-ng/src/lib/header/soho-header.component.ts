import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'soho-header',
  templateUrl: 'soho-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoHeaderComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.header') isHeader = true;
  @HostBinding('class.is-personalizable') isPersonalizable = true;
  @HostBinding('class.has-toolbar') @Input() hasToolbar: any;
  @HostBinding('class.has-tabs') @Input() hasTabs: any;

  /**
   * This event is fired when the status of the header is changed.
   *
   */
  @Output() updated = new EventEmitter<any>();

  // Reference to the jQuery element.
  private jQueryElement?: JQuery;

  // Reference to the annotated SoHoXi control
  private header?: SohoHeaderStatic;

  constructor(private elementRef: ElementRef) { }

  /**
   * Used to manually remove the back button when
   * Which is used in the header via the list/detail pattern
   */
  removeBackButton() {
    this.header?.removeBackButton();
  }

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
    this.jQueryElement.on('updated', (_e: JQuery.TriggeredEvent, args: any) => {
      this.updated.emit(args);
    });
  }

  ngOnDestroy(): void {
    if (this.jQueryElement) {
      this.jQueryElement.off();
      this.jQueryElement = undefined;
    }
    if (this.header) {
      this.header.destroy();
      this.header = undefined;
    }
  }
}
