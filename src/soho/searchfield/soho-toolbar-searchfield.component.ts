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
  selector: 'span[soho-toolbar-searchfield-wrapper]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoToolbarSearchFieldWrapperComponent {
  @HostBinding('class.searchfield-wrapper') get isSearchfieldWrapper() { return true; }
  @HostBinding('class.toolbar-searchfield-wrapper') get isToolbarSearchfieldWrapper() { return true; }
}

@Component({
  selector: 'input[soho-toolbar-searchfield]', // tslint:disable-line
  template: '<ng-content></ng-content>'
})
export class SohoToolbarSearchFieldComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  @Input() options: SohoToolbarSearchFieldOptions = {};

  /** Has an X to clear. */
  @Input() set clearable(value: boolean) {
    this.options.clearable = value;
  }

  /** Where it's collapsible or not */
  @Input() set collapsible(value: boolean) {
    this.options.collapsible = value;
  }

  /** AutoComplete : Source Function/Data/Url/Array */
  @Input() set source(value: SohoAutoCompleteSource) {
    this.options.source = value;
  }

  /** Template that can be passed */
  @Input() set template(value: string) {
    this.options.template = value;
  }

  // ------------------------------------------------------------

  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() cleared: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @HostBinding('class.searchfield') get isSearchField() { return true; }

  /**
   * Local variables
   */
  private jQueryElement: JQuery;
  private toolbarsearchfield: SohoToolbarSearchFieldStatic;

  constructor(private element: ElementRef) { }
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.toolbarsearchfield(this.options);

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('cleared', (...args) => this.cleared.emit(args));

    this.toolbarsearchfield = this.jQueryElement.data('toolbarsearchfield');
  }
  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.toolbarsearchfield) {
      this.toolbarsearchfield.destroy();
      this.toolbarsearchfield = null;
    }
  }
  clear(): void {
    this.toolbarsearchfield.clear();
  }
}
