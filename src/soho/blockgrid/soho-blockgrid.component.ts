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

  @HostBinding('class') get classes() {
    return 'blockgrid';
  }

  /** Defines the data to use, must be specified for this component. */
  @Input() set dataset(dataset: Array<any>) {
    this.options.dataset = dataset;
    if (this.blockgrid) {
      this.blockgrid.settings.dataset = dataset;
      this.blockgrid.updated();
    }
  }

  @Input() set selectable(selectable: any) {
    this.options.selectable = selectable;
    if (this.blockgrid) {
      this.blockgrid.settings.selectable = selectable;
      this.blockgrid.updated();
    }
  }
  private jQueryElement: JQuery;
  private blockgrid: SohoBlockGrid;
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
