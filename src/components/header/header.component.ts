import {
  Component,
  AfterViewInit,
  HostBinding,
  ElementRef,
  Output,
  EventEmitter
} from '@angular/core';

declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'soho-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements AfterViewInit {
  @HostBinding('class') get classes() {
    return 'header is-personalizable';
  }

  // Reference to the jQuery element.
  private jQueryElement: any;

  // Reference to the annotated SoHoXi control
  private header: any;

  // This event is fired when the status of the header is changed.
  @Output() onChange = new EventEmitter<any>();

  // @Input() set updated(value : any) {
  //   if (value) {
  //     $(this.elementRef.nativeElement).trigger('updated');
  //   }
  // }

  update() {
    this.header.updated();
  }

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = $(this.elementRef.nativeElement);

    // Initialise the SoHoXi control.
    this.jQueryElement.header();

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'sohoxiHeader'.
    this.header = this.jQueryElement.data('header');

    // Initialize any event handlers.
    this.jQueryElement.on('updated', (e: any, args: any) => { this.onChange.next(args); });
  }
}
