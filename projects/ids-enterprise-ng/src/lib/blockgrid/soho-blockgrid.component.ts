import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-blockgrid]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoBlockGridComponent implements AfterViewInit, OnDestroy {

  /** Options. */
  private options: SohoBlockGridOptions = {
    pagerSettings: {
      position: 'bottom'
    }
  };
  private jQueryElement: JQuery;
  private blockgrid: SohoBlockGrid;

  @HostBinding('class.blockgrid') get isBlockGrid() {
    return true;
  }

  /** Defines the data to use, must be specified for this component. */
  @Input()
  public set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.blockgrid) {
      this.blockgrid.settings.dataset = dataset;
      this.updated(this.blockgrid.settings);
    }
  }
  public get dataset(): Array<any> {
    if (!this.blockgrid) {
      return this.options.dataset;
    }
    return this.blockgrid.settings.dataset;
  }

  /** Defines the selection type. */
  @Input()
  public set selectable(selectable: SohoBlockGridSelectable) {
    this.options.selectable = selectable;
    if (this.blockgrid) {
      this.blockgrid.settings.selectable = selectable;
      this.updated(this.blockgrid.settings);
    }
  }
  public get selectable(): SohoBlockGridSelectable {
    if (!this.blockgrid) {
      return this.options.selectable;
    }
    return this.blockgrid.settings.selectable;
  }

  /** Defines whether or not paging is active. */
  @Input()
  public set paging(paging: boolean) {
    this.options.paging = paging;
    if (this.blockgrid) {
      this.blockgrid.settings.paging = paging;
      this.updated(this.blockgrid.settings);
    }
  }
  public get paging(): boolean {
    if (!this.blockgrid) {
      return this.options.paging;
    }
    return this.blockgrid.settings.paging;
  }

  /** Defines the current page size */
  @Input()
  public set pagesize(pagesize: number) {
    this.options.pagerSettings.pagesize = pagesize;
    if (this.blockgrid) {
      this.blockgrid.settings.pagerSettings.pagesize = pagesize;
      this.updated(this.blockgrid.settings);
    }
  }
  public get pagesize(): number {
    if (!this.blockgrid) {
      return this.options.pagerSettings.pagesize;
    }
    return this.blockgrid.settings.pagerSettings.pagesize;
  }

  /** Defines the array of selectable page sizes */
  @Input()
  public set pagesizes(pagesizes: Array<number>) {
    this.options.pagerSettings.pagesizes = pagesizes;
    if (this.blockgrid) {
      this.blockgrid.settings.pagerSettings.pagesizes = pagesizes;
      this.updated(this.blockgrid.settings);
    }
  }
  public get pagesizes(): Array<number> {
    if (!this.blockgrid) {
      return this.options.pagerSettings.pagesizes;
    }
    return this.blockgrid.settings.pagerSettings.pagesizes;
  }

  /** Add extra attributes like id's to the component **/
  @Input()
  public set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;
    if (this.blockgrid) {
      this.blockgrid.settings.attributes = attributes;
      this.updated(this.blockgrid.settings);
    }
  }
  public get attributes():  Array<Object> | Object {
    if (!this.blockgrid) {
      return this.options.attributes;
    }
    return this.blockgrid.settings.attributes;
  }

  /* Events*/
  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deselected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() activated: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deactivated: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() page: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() pagesizechange: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.blockgrid(this.options);
      this.blockgrid = this.jQueryElement.data('blockgrid');

      // Setup the events
      this.jQueryElement.on('selected', (...args) => this.onSelected(args));
      this.jQueryElement.on('deselected', (...args) => this.onDeselected(args));
      this.jQueryElement.on('activated', (...args) => this.onActivated(args));
      this.jQueryElement.on('deactivated', (...args) => this.onDeactivated(args));

      if (this.blockgrid.pagerAPI) {
        this.jQueryElement.on('page', (...args) => this.onPage(args));
        this.jQueryElement.on('pagesizechange', (...args) => this.onPageSizeChange(args));
      }
    });
  }

  /** Tear Down */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.blockgrid) {
        this.blockgrid.destroy();
        this.blockgrid = null;
      }
    });
  }

  /** Reinit blockgrid settings */
  public updated(settings: any): SohoBlockGridComponent {
    this.ngZone.runOutsideAngular(() => this.blockgrid.updated(settings));
    return this;
  }

  public activateBlock(idx: number): void {
    this.ngZone.runOutsideAngular(() => {
      const blockChildren: NodeList = this.element.nativeElement.querySelectorAll('.block');
      if (!blockChildren || idx <= -1 || idx >= blockChildren.length) {
        return; // safety check
      }

      this.blockgrid.select($(blockChildren[idx]), false);
    });
  }

  public deactivateBlock(): void {
    this.blockgrid.select($(), false);
  }

  public selectBlocks(idx: number[]) {
    this.ngZone.runOutsideAngular(() => {
      const blockChildren: NodeList = this.element.nativeElement.querySelectorAll('.block');
      const blockChildrenArray = Array.from(blockChildren).filter((blockChild, index) => idx.includes(index));
      this.blockgrid.select($(blockChildrenArray), true);
    });
  }

  private onSelected(args: any[]) {
    this.ngZone.run(() => this.selected.emit(args));
  }

  private onDeselected(args: any[]) {
    this.ngZone.run(() => this.deselected.emit(args));
  }

  private onActivated(args: any[]) {
    this.ngZone.run(() => this.activated.emit(args));
  }

  private onDeactivated(args: any[]) {
    this.ngZone.run(() => this.deactivated.emit(args));
  }

  private onPage(args: any[]) {
    this.ngZone.run(() => this.page.emit(args));
  }

  private onPageSizeChange(args: any[]) {
    this.ngZone.run(() => this.pagesizechange.emit(args));
  }
}
