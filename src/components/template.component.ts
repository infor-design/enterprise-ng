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
export class SohoTemplateComponent implements AfterViewInit, OnDestroy {
  /**
   * Available Soho Template control settings as Inputs
   * Should match the Soho properties for the component
   */
  @Input() something: any;

  /**
   * Available Soho Template events as Output (EventEmitters passing the event)
   * Should match the Soho event names for the component
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

    this.jQueryElement.template({
      /**
       * Pass in the Input values as settings to the initializer
       */
    });

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('someevent', (/*event: EventInterface*/) => { /*this.outputevent.emit(event);*/ });

    this.template = this.jQueryElement.data('template');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    this.template.destroy();
  }
}
