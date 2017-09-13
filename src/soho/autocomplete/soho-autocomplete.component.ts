import {
  AfterViewInit,
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
  template: '<ng-content></ng-content>'
})

export class SohoAutoCompleteComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoAutoCompleteOptions = {};
  @Input() set source(source: SohoAutoCompleteSource) {
    this.options.source = source;
  }

  @Input() set sourceArguments(sourceArguments: string) {
    this.options.sourceArguments = sourceArguments
  }

  @Input() set template(template: string) {
    this.options.template = template;
  }

  @Input() set filterMode(filterMode: SohoAutoCompleteFilterMode) {
    this.options.filterMode = filterMode;
  }

  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  @Input() set width(width: SohoAutoCompleteWidth) {
    this.options.width = width;
  }

  @Input() set offset(offset: SohoAutoCompleteOffset) {
    this.options.offset = offset;
  }

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
}
