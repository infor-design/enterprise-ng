import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'input[soho-radiobutton]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoRadioButtonComponent implements AfterViewInit {
  /**
   * Called when the radiobutton value changes
   */
  @Output() change: EventEmitter<SohoRadioButtonEvent> = new EventEmitter<SohoRadioButtonEvent>();

  /**
   * Bind attributes to the host input element
   */
  @HostBinding('attr.type') get isRadioType() {
    return 'radio';
  }

  @HostBinding('class.radio') get isRadioButton() {
    return true;
  }

  /**
   * Sets the element to disabled
   */
  @HostBinding('attr.disabled') @Input() disabled: boolean;

  /**
   * Sets the element to indicate checked
   */
  @HostBinding('attr.checked') @Input() checked: boolean;

  /**
   * Local variables
   */
  private jQueryElement: any;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // no control initializer for radiobutton

    this.jQueryElement.on('change', (event: SohoRadioButtonEvent) => this.change.emit(event));
  }
}
