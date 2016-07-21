import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'soho-template',
  templateUrl: 'template.component.html'
})
export class TemplateComponent implements AfterViewInit, OnDestroy {
  /**
   * Available SoHo Dropdown control settings as Inputs
   */
  @Input() something: any;

  /**
   * Available SoHo Dropdown events as Output (EventEmitters passing the event)
   */
  @Output() outputevent: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Local variables
   */
  private jQueryElement: any;
  private template: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    // TODO: Figure out what element to send to jQuery to init the component
    this.jQueryElement = jQuery();

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.bind('someevent', (/*event: EventInterface*/) => { /*this.outputevent.emit(event);*/ });

    this.jQueryElement.template({
      /**
       * Pass in the Input values as settings to the initializer
       */
    });
    this.template = this.jQueryElement.data('template');
  }
  ngOnDestroy() {
    this.template.destroy();
  }
}
