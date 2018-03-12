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

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;

    if (this.blockgrid) {
      this.blockgrid.settings.dataset = dataset;
      this.blockgrid.updated(this.blockgrid.settings);
    }
  }

  /** Defines the selection type. */
  @Input() set selectable(selectable: any) {
    this.options.selectable = selectable;
    if (this.blockgrid) {
      this.blockgrid.settings.selectable = selectable;
      this.blockgrid.updated(this.blockgrid.settings);
    }
  }

  /* Events*/
  @Output() selected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deselected: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() activated: EventEmitter<Object[]> = new EventEmitter<Object[]>();
  @Output() deactivated: EventEmitter<Object[]> = new EventEmitter<Object[]>();

  private jQueryElement: JQuery;
  private blockgrid: SohoBlockGrid;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.blockgrid(this.options);
    this.blockgrid = this.jQueryElement.data('blockgrid');

    // Setup the events
    this.jQueryElement.on('selected', (...args) => this.selected.emit(args));
    this.jQueryElement.on('deselected', (...args) => this.deselected.emit(args));
    this.jQueryElement.on('activated', (...args) => this.activated.emit(args));
    this.jQueryElement.on('deactivated', (...args) => this.deactivated.emit(args));
  }

  /** Tear Down */
  ngOnDestroy() {
    if (this.blockgrid) {
      this.blockgrid.destroy();
      this.blockgrid = null;
    }
  }

  /** Reinit blockgrid settings */
  public updated(settings: any): SohoBlockGridComponent {
    this.blockgrid.updated(settings);
    return this;
  }

}
