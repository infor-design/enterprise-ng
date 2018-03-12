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

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;
  }

  /** Defines the selection type. */
  @Input() set selectable(selectable: any) {
    this.options.selectable = selectable;
  }
  private jQueryElement: JQuery;
  private blockgrid: SohoBlockGrid;
  constructor(private element: ElementRef) { }

  /** Setup */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.blockgrid(this.options);
    this.blockgrid = this.jQueryElement.data('blockgrid');
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
