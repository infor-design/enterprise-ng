import {
    AfterViewInit,
    Component,
    ChangeDetectionStrategy,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    OnDestroy
} from '@angular/core';
import {
  ToolbarEvent
} from '../.';

declare var jQuery: any;

@Component({
  selector: 'soho-toolbar-title',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarTitleComponent {
  @HostBinding('class.title') get isTitle() { return true; };
}

@Component({
  selector: 'soho-toolbar-button-set',
  template: `<ng-content></ng-content>`,
  styles : [`:host {display:inline-block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarButtonSetComponent {
  @HostBinding('class.buttonset') get isButtonSet() { return true; };
}

@Component({
  moduleId: module.id,
  selector: 'soho-toolbar',
  templateUrl: `toolbar.component.html`,
  //styles: [`:host {display: block;}`],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.toolbar') get isToolbar() { return true; };
  @HostBinding('style.display') get isBlock() { return 'block'; };

  @Input() maxVisibleButtons: number = 3;

  @Input() rightAlign: boolean = false;

  /**
   * The beforeactivate event is fired whenever a toolbar is activated giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeactivate: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

  /**
   * The activated event is if the beforeActivate succeeds.
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

  /**
   * The afteractivate event is fired after the toolbar has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afteractivate: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

  /**
   * The selected event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<ToolbarEvent>}
   */
  @Output() selected: EventEmitter<ToolbarEvent> = new EventEmitter<ToolbarEvent>();

  private jQueryElement: any;
  private toolbar: any;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.toolbar({
      maxVisibleButtons: this.maxVisibleButtons,
      rightAlign : this.rightAlign
    });

    // bind to jquery events and emit as angular events
    this.jQueryElement.bind('beforeactivate', ((event: ToolbarEvent) => {this.beforeactivate.emit(event); }));
    this.jQueryElement.bind('activated', ((event: ToolbarEvent) => {this.activated.emit(event); }));
    this.jQueryElement.bind('afteractivate', ((event: ToolbarEvent) => {this.afteractivate.emit(event); }));
    this.jQueryElement.bind('selected', ((event: ToolbarEvent) => {this.selected.emit(event); }));

    this.toolbar = this.jQueryElement.data('toolbar');

    // // Add listeners to emit events
    // this.jQueryElement.on('selected', ((event: ToolbarEvent, item: any) => {
    //   event.item = item;
    //   event.data = item[0].dataset;
    //   this.toolbarClicked.emit(event);
    //   console.log(event);
    // }));
  }

  ngOnDestroy() {
    if (this.jQueryElement) {
      this.jQueryElement.destroy();
      this.jQueryElement = null;
    }
  }
}
