/// <reference path="soho-hierarchy.d.ts" />

import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input,
  OnDestroy, Output, EventEmitter, NgZone
} from '@angular/core';

@Component({
  selector: 'soho-hierarchy-leaf-template',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoHierarchyLeafTemplateComponent { }

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

  get legendKey(): string {
    return this.options.legendKey;
  }

  @Input() set templateId(id: string) {
    this.options.templateId = id;
  }

  get leafTemplateId(): string {
    return this.options.templateId;
  }

  @Input() set layout(layout: SohoHierarchyLayoutType) {
    this.options.layout = layout;
  }

  get layout(): SohoHierarchyLayoutType {
    return this.options.layout;
  }
  /**
   * Leaf is selected
   *
   */
  @Output() selected = new EventEmitter<SohoHierarchyEvent>();

  /**
   * Leaf is double clicked.
   */
  @Output() doubleClick = new EventEmitter<SohoHierarchyDoubleClickEvent>();

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  /**
   * Used to add new data lazily when a leaf is expanded
   * @param id should match the leaf id in the DOM
   */
  add(id: string, dataset: Array<any>, newData: Array<any>) {
    this.ngZone.runOutsideAngular(() => this.hierarchy.add(id, dataset, newData));
  }

  /**
   *  Reload hierarchy with a new dataset
   */
  reloadDataSet(dataSet: Array<any>) {
    this.options.dataset = dataSet;
    this.ngZone.runOutsideAngular(() => this.hierarchy.reload(this.options));
  }

  /**
   * Update actions for action menu on a leaf
   */
  updateActions(eventInfo: SohoHierarchyEvent, updatedActions: Array<SohoHierarchyAction>) {
    this.ngZone.runOutsideAngular(() => this.hierarchy.updateActions(eventInfo, updatedActions));
  }

  /**
   * Manually select leaf by id
   */
  selectLeaf(leafId: string) {
    this.ngZone.runOutsideAngular(() => this.hierarchy.selectLeaf(leafId));
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.hierarchy) {
        this.hierarchy.destroy();
        this.hierarchy = null;
      }
    });
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the "unordered list" element in a jQuery selector.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Initialise the Soho control.
      this.jQueryElement.hierarchy(this.options);

      this.jQueryElement
        .on('dblclick', ((e: JQuery.TriggeredEvent, args: SohoHierarchyDoubleClickEvent) => {
          return this.ngZone.run(() => this.doubleClick.next(args));
        }))
        .on('selected', ((e: JQuery.TriggeredEvent, args: SohoHierarchyEvent) => this.ngZone.run(() => this.selected.next(args))));

      // Assign the hierarchy control
      this.hierarchy = this.jQueryElement.data('hierarchy');
    });
  }
}
