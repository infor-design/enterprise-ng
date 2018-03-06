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

  @Input() set selectable(selectable: any) {
    this.options.selectable = selectable;
  }
  private jQueryElement: JQuery;
  private blockgrid: any;
  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.blockgrid(this.options);
    this.blockgrid = this.jQueryElement.data('blockgrid');
  }

  ngOnDestroy() {
    if (this.blockgrid) {
      this.blockgrid.destroy();
      this.blockgrid = null;
    }
  }

  /** For async methods, reinit blockgrid `source` setting. */
  public updated(): SohoBlockGridComponent {
    this.blockgrid.updated();
    return this;
  }
}
