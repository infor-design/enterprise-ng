import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'soho-accordion',
  templateUrl: './soho-accordion.component.html',
})
export class SohoAccordionComponent implements AfterViewInit {
  @Input() allowOnePane: boolean;
  @Input() displayChevron: boolean;
  @Input() rerouteOnLinkClick: boolean;
  @Input() source: Function;

  @Output() beforeexpand: EventEmitter<any> = new EventEmitter<any>();
  @Output() beforecollapse: EventEmitter<any> = new EventEmitter<any>();
  @Output() beforeselect: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Local variables
   */
  private jQueryElement: JQuery;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement.childNodes[0]);

    const options: SohoAccordionOptions = {};

    const checkBooleanAndAdd = (val, property) => {
      if (typeof val === 'boolean') {
        options[property] = val;
      }
    };

    checkBooleanAndAdd(this.allowOnePane, 'allowOnePane');
    checkBooleanAndAdd(this.displayChevron, 'displayChevron');
    checkBooleanAndAdd(this.rerouteOnLinkClick, 'rerouteOnLinkClick');

    if (this.source) {
      options.source = this.source;
    }

    this.jQueryElement
      .on('beforeexpand', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforeexpand.emit(event); })
      .on('beforecollapse', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforecollapse.emit(event); })
      .on('beforeselect', (event: SohoAccordionEvent, anchor) => { event.anchor = anchor; this.beforeselect.emit(event); });

    this.jQueryElement.accordion(options);
  }
}
