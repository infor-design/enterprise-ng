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
  selector: 'input[soho-autocomplete]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoAutoCompleteComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoAutoCompleteOptions = {};

  /** Defines the data to use, must be specified for this component. */
  @Input() set source(source: SohoAutoCompleteSource) {
    this.options.source = source;
  }

  /** Object is passed into the source method, and augmented with parameters. */
  @Input() set sourceArguments(sourceArguments: string) {
    this.options.sourceArguments = sourceArguments
  }

  /** Menu template, appropriate markup is expected. */
  @Input() set template(template: string) {
    this.options.template = template;
  }

  /** Filters based on the first character('startsWidth') of the string, or the entire string('contains') */
  @Input() set filterMode(filterMode: SohoAutoCompleteFilterMode) {
    this.options.filterMode = filterMode;
  }

  /** Delay between key strokes on the keypad before the end of typing */
  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  /** Width of the open menu */
  @Input() set width(width: SohoAutoCompleteWidth) {
    this.options.width = width;
  }

  /** Offset, the left or top offset */
  @Input() set offset(offset: SohoAutoCompleteOffset) {
    this.options.offset = offset;
  }

  /** Selects first item menu */
  @Input() set autoSelectFirstItem(autoSelectFirstItem: boolean) {
    this.options.autoSelectFirstItem = autoSelectFirstItem;
  }

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.autocomplete') get isAutoComplete() { return true; }

  private jQueryElement: JQuery;
  private autocomplete: any;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.autocomplete(this.options);
    this.autocomplete = this.jQueryElement.data('autocomplete');
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
  }

  ngOnDestroy() {
    if (this.autocomplete) {
      this.autocomplete.destroy();
      this.autocomplete = null;
    }
  }

   /** For async methods, reinit autocomplete `source` setting. */
  public updated(): SohoAutoCompleteComponent {
    this.autocomplete.updated();
    return this;
  }
}
