import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, NgZone, OnDestroy, Output, QueryList, ViewChild } from "@angular/core";
import { SohoListViewItemComponent } from "../listview";

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[soho-listbuilder]',
  templateUrl: 'soho-listbuilder.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoListBuilderComponent implements AfterViewInit, OnDestroy, AfterViewChecked {
  @HostBinding('class.listbuilder') get isListbuilder() {
    return true;
  }

  /**
   * Local variables
   */
  private jQueryElement?: JQuery;
  private listbuilder?: SohoListBuilderStatic | null;
  private options: SohoListBuilderOptions = {};

  /**
  * Force a update to fire next viewChecked.
  */
  public updateRequired?: boolean;

  /**
   * Constructor.
   */
  constructor(
    private ngZone: NgZone
  ) { }

  // Used to locate the listBuilderReference in the HTML to init the component through jQuery
  @ViewChild('listbuilder', { static: true }) listBuilderRef: ElementRef | undefined;

  @Input() sohoListBuilderElementId?: string;

  /**
   * String of classes to append to the class for the list-view div element
   */
  @Input() class?: string;

  get listClass() {
    let classes = 'listbuilder';
    if (this.class) {
      classes += ` ${this.class}`;
    }
    return classes;
  }

  /**
   * Array of data
   */
  @Input() set dataset(value: Object[] | undefined) {
    this.options.dataset = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.dataset = value;
      this.updateRequired = true;
    }
  }

  get dataset(): Object[] | undefined {
    return this.options.dataset;
  }

  /** The CSS Class of the handle element */
  @Input() set handle(value: string) {
    this.options.handle = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.handle = value;
      this.updateRequired = true;
    }
  }

  /** "Add" action button (takes a string representing a "data-action" attribute */
  @Input() set btnAdd(value: string) {
    this.options.btnAdd = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.btnAdd = value;
      this.updateRequired = true;
    }
  }

  /** "Edit" action button (takes a string representing a "data-action" attribute */
  @Input() set btnEdit(value: string) {
    this.options.btnEdit = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.btnEdit = value;
      this.updateRequired = true;
    }
  }

  /** "Delete" action button (takes a string representing a "data-action" attribute */
  @Input() set btnDelete(value: string) {
    this.options.btnDelete = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.btnDelete = value;
      this.updateRequired = true;
    }
  }

  /** "GoUp" action button (takes a string representing a "data-action" attribute */
  @Input() set btnGoUp(value: string) {
    this.options.btnGoUp = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.btnGoUp = value;
      this.updateRequired = true;
    }
  }

  /** "GoDown" action button (takes a string representing a "data-action" attribute */
  @Input() set btnGoDown(value: string) {
    this.options.btnGoDown = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.btnGoDown = value;
      this.updateRequired = true;
    }
  }

  /** Add extra attributes like id's to the chart elements. For example `attributes: { name: 'id', value: 'my-unique-id' } */
  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.attributes = attributes;
      this.updateRequired = true;
    }
  }

  /** Html Template String of list. */
  @Input() set template(value: string) {
    this.options.template = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.template = value;
      this.updateRequired = true;
    }
  }

  /** Html Template String of list item. */
  @Input() set templateNewItem(value: string) {
    this.options.templateNewItem = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.templateNewItem = value;
      this.updateRequired = true;
    }
  }

  /** Html Template String of list item inner content. */
  @Input() set templateItemContent(value: string) {
    this.options.templateItemContent = value;
    if (this.jQueryElement && this.listbuilder) {
      this.listbuilder.settings.templateItemContent = value;
      this.updateRequired = true;
    }
  }

  /** Calls events after a top button action */
  @Output() afteradd: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() aftergoup: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() aftergodown: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() afterdelete: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  /** Calls events before a top button action */
  @Output() beforeedit: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() beforeadd: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() beforegoup: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() beforegodown: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() beforedelete: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  /** Update event on arranging items (drag and drop item) */
  @Output() arrangeupdate: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  /** Calls events for edit item */
  @Output() entereditmode: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  @Output() exiteditmode: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  ngAfterViewInit(): void {
    if (!this.listBuilderRef) {
      throw Error('Unable to find listbuilder reference...');
    }

    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.listBuilderRef?.nativeElement);
      this.jQueryElement.listbuilder(this.options);
      this.listbuilder = this.jQueryElement.data('listbuilder');

      this.jQueryElement.on('afteradd', (...args) => this.ngZone.run(() => this.afteradd.emit(args)));
      this.jQueryElement.on('aftergoup', (...args) => this.ngZone.run(() => this.aftergoup.emit(args)));
      this.jQueryElement.on('aftergodown', (...args) => this.ngZone.run(() => this.aftergodown.emit(args)));
      this.jQueryElement.on('afterdelete', (...args) => this.ngZone.run(() => this.afterdelete.emit(args)));
      this.jQueryElement.on('beforeadd', (...args) => this.ngZone.run(() => this.beforeadd.emit(args)));
      this.jQueryElement.on('beforegoup', (...args) => this.ngZone.run(() => this.beforegoup.emit(args)));
      this.jQueryElement.on('beforegodown', (...args) => this.ngZone.run(() => this.beforegodown.emit(args)));
      this.jQueryElement.on('beforedelete', (...args) => this.ngZone.run(() => this.beforedelete.emit(args)));
      this.jQueryElement.on('entereditmode', (...args) => this.ngZone.run(() => this.entereditmode.emit(args)));
      this.jQueryElement.on('exiteditmode', (...args) => this.ngZone.run(() => this.exiteditmode.emit(args)));
      this.jQueryElement.on('arrangeupdate', (...args) => this.ngZone.run(() => this.arrangeupdate.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.listbuilder?.updated());
      this.updateRequired = false;
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      if (this.listbuilder) {
        this.listbuilder.destroy();
        this.listbuilder = null;
      }
    });
  }
}
