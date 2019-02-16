/// <reference path="soho-blockgrid.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input, NgZone,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';

@Component({
  selector: '[soho-blockgrid]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoBlockGridComponent implements AfterViewInit, OnDestroy {
  /** Options. */
  private options: SohoBlockGridOptions = {};

  @HostBinding('class.blockgrid') get isBlockGrid() {
    return true;
  }

  @ContentChildren('.block') blockChildren: QueryList<ElementRef>;

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.blockgrid) {
      this.blockgrid.settings.dataset = dataset;
      this.updated(this.blockgrid.settings);
    }
  }

  /** Defines the selection type. */
  @Input() set selectable(selectable: any) {
    this.options.selectable = selectable;
    if (this.blockgrid) {
      this.blockgrid.settings.selectable = selectable;
      this.updated(this.blockgrid.settings);
    }
  }

  /* Events*/
  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deselected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() activated: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deactivated: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement: JQuery;
  private blockgrid: SohoBlockGrid;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone
  ) {}

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.blockgrid(this.options);
      this.blockgrid = this.jQueryElement.data('blockgrid');

      // Setup the events
      this.jQueryElement.on('selected', (... args) => this.onSelected(args));
      this.jQueryElement.on('deselected', (... args) => this.onDeselected(args));
      this.jQueryElement.on('activated', (... args) => this.onActivated(args));
      this.jQueryElement.on('deactivated', (... args) => this.onDeactivated(args));
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
      if (!blockChildren || idx < -1 || idx >= blockChildren.length) {
        return; // safety check
      }

      this.blockgrid.selectBlock($(blockChildren[idx]),false);
    });
  }

  public selectBlocks(idx: number[]) {
    this.ngZone.runOutsideAngular(() => {
      const blockChildren: NodeList = this.element.nativeElement.querySelectorAll('.block');
      const blockChildrenArray = Array.from(blockChildren).filter((blockChild, index) => idx.includes(index));
      this.blockgrid.selectBlock($(blockChildrenArray), true);
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
}
