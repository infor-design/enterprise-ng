import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input,
  OnDestroy, Output, EventEmitter
} from '@angular/core';

@Component({
  selector: 'soho-hierarchy-leaf-template',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHierarchyLeafTemplateComponent {}

@Component({
  selector: 'figure[soho-hierarchy]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHierarchyComponent implements OnDestroy, AfterViewInit {

  private hierarchy: SohoHierarchyStatic;
  private jQueryElement: JQuery;

  /** An internal options object that gets updated by using the component's Inputs(). */
  private options: SohoHierarchyOptions = {};

  @HostBinding('attr.class') hostClass = 'hierarchy';

  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;
  }

  get dataset(): Array<any> {
    return this.options.dataset;
  }

  @Input() set legend(legend: Array<SohoHierarchyLegend>) {
    this.options.legend = legend;
  }

  get legend(): Array<SohoHierarchyLegend> {
    return this.options.legend;
  }

  @Input() set legendKey(key: string) {
    this.options.legendKey = key;
  }

  get legendKey (): string {
    return this.options.legendKey;
  }

  @Input() set templateId(id: string) {
    this.options.templateId = id;
  }

  get leafTemplateId(): string {
    return this.options.templateId;
  }

  @Input() set paging(bool: boolean) {
    this.options.paging = bool;
  }

  get paging(): boolean {
    return this.options.paging;
  }

  /**
   * Leaf is selected
   * @type {EventEmitter<SohoHierarchyEvent>}
   */
  @Output() selected = new EventEmitter<SohoHierarchyEvent>();

  constructor(private elementRef: ElementRef) {}

  /**
   * Used to add new data lazily when a leaf is expanded
   * @param {string} id should match the leaf id in the DOM
   */
  add(id: string, dataset: Array<any>, newData: Array<any>) {
    this.hierarchy.add(id, dataset, newData);
  }

  /**
   *  Reload hierarchy with a new dataset
   */
  reloadDataSet(dataSet:  Array<any>) {
    this.options.dataset = dataSet;
    this.hierarchy.reload(this.options);
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.hierarchy) {
      this.hierarchy.destroy();
      this.hierarchy = null;
    }
  }

  ngAfterViewInit() {
    // Wrap the "unordered list" element in a jQuery selector.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the Soho control.
    this.jQueryElement.hierarchy(this.options);

    // Initialize any event handlers.
    this.jQueryElement
        .on('selected', ( (e: JQuery.Event, args: SohoHierarchyEvent) => {
          this.selected.next(args);
        }));

    // Assign the hierarchy control
    this.hierarchy = this.jQueryElement.data('hierarchy');

  }
}
