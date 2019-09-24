import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  Output
} from '@angular/core';

// @ts-ignore
@Component({                                    // tslint:disable-line
  selector: 'div[soho-standalone-pager]',       // tslint:disable-line
  template: `<div class="pager-container"></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoStandalonePagerComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() set pageSize(pageSize: number) {
    this.options.pagesize = pageSize;
    this.updateRequired = !!this.pager;
  }

  @Input() set pageSizes(pageSizes: number[]) {
    this.options.pagesizes = pageSizes;
    this.updateRequired = !!this.pager;
  }

  @Input() set showFirstButton(showFirstButton: boolean) {
    this.options.showFirstButton = showFirstButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set showLastButton(showLastButton: boolean) {
    this.options.showLastButton = showLastButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set showNextButton(showNextButton: boolean) {
    this.options.showNextButton = showNextButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set showPreviousButton(showPreviousButton: boolean) {
    this.options.showPreviousButton = showPreviousButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set showPageSizeSelector(showPageSizeSelector: boolean) {
    this.options.showPageSizeSelector = showPageSizeSelector;
    this.updateRequired = !!this.pager;
  }

  @Input() set enableFirstButton(enableFirstButton: boolean) {
    this.options.enableFirstButton = enableFirstButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set enableLastButton(enableLastButton: boolean) {
    this.options.enableLastButton = enableLastButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set enablePreviousButton(enablePreviousButton: boolean) {
    this.options.enablePreviousButton = enablePreviousButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set enableNextButton(enableNextButton: boolean) {
    this.options.enableNextButton = enableNextButton;
    this.updateRequired = !!this.pager;
  }

  @Input() set previousPageTooltip(previousPageTooltip: string) {
    this.options.previousPageTooltip = previousPageTooltip;
    this.updateRequired = !!this.pager;
  }

  @Input() set firstPageTooltip(firstPageTooltip: string) {
    this.options.firstPageTooltip = firstPageTooltip;
    this.updateRequired = !!this.pager;
  }

  @Input() set nextPageTooltip(nextPageTooltip: string) {
    this.options.nextPageTooltip = nextPageTooltip;
    this.updateRequired = !!this.pager;
  }

  @Input() set lastPageTooltip(lastPageTooltip: string) {
    this.options.lastPageTooltip = lastPageTooltip;
    this.updateRequired = !!this.pager;
  }

  @Input() set attachPageSizeMenuToBody(attachPageSizeMenuToBody: boolean) {
    this.options.attachPageSizeMenuToBody = attachPageSizeMenuToBody;
    this.updateRequired = !!this.pager;
  }

  @Input() set smallPageSizeSelector(smallPageSizeSelector: boolean) {
    this.options.smallPageSizeSelector = smallPageSizeSelector;
    this.updateRequired = !!this.pager;
  }

  @Input() set pageSizeMenuSettings(options: object) {
    this.options.pageSizeMenuSettings = options;
    this.updateRequired = !!this.pager;
  }

  @Output() firstPage: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() lastPage: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() previousPage: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() nextPage: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() pageSizeChange: EventEmitter<Object> = new EventEmitter<Object>();

  private jQueryElement: JQuery;
  private pager: SohoStandalonePagerStatic;
  private options: SohoStandalonePagerOptions = {};
  private updateRequired = false;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone
  ) {}

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // -----------------------------------------------------------------------------------
      // Workaround for pagesizeevent not being fired unless the onPageSizeChange property
      // is set. Once that is fixed in soho/ep then this can be removed.
      // -----------------------------------------------------------------------------------
      (this.options as any).onPageSizeChange = () => {};
      // -----------------------------------------------------------------------------------

      this.options.type = 'standalone';
      this.jQueryElement.pager(this.options);
      this.pager = this.jQueryElement.data('pager');

      // Setup the events
      this.jQueryElement.on('firstpage', (... args) => this.ngZone.run(() => this.firstPage.emit(args)));
      this.jQueryElement.on('lastpage', (... args) => this.ngZone.run(() => this.lastPage.emit(args)));
      this.jQueryElement.on('previouspage', (... args) => this.ngZone.run(() => this.previousPage.emit(args)));
      this.jQueryElement.on('nextpage', (... args) => this.ngZone.run(() => this.nextPage.emit(args)));
      this.jQueryElement.on('pagesizechange', (... args) => this.ngZone.run(() => this.pageSizeChange.emit(args)));
    });
  }

  ngAfterViewChecked() {
    if (this.pager && this.updateRequired) {
      this.pager.updated(this.options);
      this.updateRequired = false;
    }
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.pager) {
        this.pager.destroy();
        this.pager = null;
      }
    });
  }
}
