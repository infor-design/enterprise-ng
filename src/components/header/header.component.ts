import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import {
  TabsEvent
  // TABS_LIST_COMPONENTS
} from '../../components';

@Component({
  moduleId: module.id,
  selector: 'soho-header',
  templateUrl: 'header.component.html'
  // directives: [ TABS_LIST_COMPONENTS ]
})
export class SohoHeaderComponent implements AfterViewInit, OnInit {
  @HostBinding('class.header')            get isHeader()         { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; };
  @HostBinding('class.has-tabs') @Input() showHeaderTabs: boolean = false;

  // This event is fired when the status of the header is changed.
  @Output() onChange = new EventEmitter<any>();

  // This event is fired when the status of the header is changed.
  @Output() tabActivated = new EventEmitter<TabsEvent>();

  // @Input() set updated(value : any) {
  //   if (value) {
  //     $(this.elementRef.nativeElement).trigger('updated');
  //   }
  // }

  // Reference to the jQuery element.
  private jQueryElement: any;

  // Reference to the annotated SoHoXi control
  private header: any;

  update() {
    this.header.updated();
  }

  constructor(
    private elementRef: ElementRef) {}
    // private headerComponentRef: SohoHeaderComponentRefService)

  ngOnInit() {
    // this.headerComponentRef.instance = this;
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

  onTabActivated(tabEvent: TabsEvent) { this.tabActivated.emit(tabEvent); }

  // onToolbarButtonClicked(toolbarButtonEvent:ToolbarButtonEvent)
  // {
  //   this.console.log(["@BannerHeaderComponent -> onToolbarButtonClicked -> ", toolbarButtonEvent.buttonSpec]);
  //   this.toolbarButtonClicked.emit(toolbarButtonEvent);
  // }
  //
  // onToolbarMenuItemClicked(toolbarMenuItemEvent:ToolbarMenuItemEvent)
  // {
  //   this.console.log(["@BannerHeaderComponent -> onToolbarMenuItemClicked -> Id:", toolbarMenuItemEvent]);
  //   this.toolbarMenuItemClicked.emit(toolbarMenuItemEvent);
  // }
}
