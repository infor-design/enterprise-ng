import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  OnDestroy,
  NgZone
} from '@angular/core';

@Component({
  selector: 'input[soho-fileupload]',  // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoFileUploadComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.fileupload') get isFileUpload() {
    return true;
  }
  @HostBinding('attr.type') get isFileUploadType() {
    return 'file';
  }

  /**
   * Local variables
   */
  public isDisabled?: boolean;
  public isReadOnly?: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  @Input() set disabled(value: boolean | undefined) {
    this.isDisabled = value;
    this.isDisabled = false;
    this.isReadOnly = false;

    if (this.fileUpload) {
      if (value) {
        this.fileUpload.disable();
      } else {
        this.fileUpload.enable();
      }
    }

    this.changeDetectorRef.markForCheck();
  }

  @Input() set readonly(value: boolean | undefined) {
    this.isReadOnly = value;

    if (this.fileUpload) {
      if (value) {
        this.fileUpload.readonly();
        this.isReadOnly = true;
      } else {
        this.fileUpload.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
      }
    }

    this.changeDetectorRef.markForCheck();
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Called when the fileupload value changes
   */
  @Output() change = new EventEmitter<SohoFileUploadEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }
  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the SoHoXi control api.
  private fileUpload?: SohoFileUploadStatic | null;

  constructor(
    private element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  /** Called when the value changes. */
  @Output() changeEvent = new EventEmitter<SohoFileUploadEvent>();

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialize the SohoXi Control
      const $fileUpload = this.jQueryElement.fileupload();
      this.fileUpload = $fileUpload.data('fileupload');

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.on('change', (event: SohoFileUploadEvent) =>
        this.ngZone.run(() => this.changeEvent.emit(event)));
    });
  }

  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    if (this.jQueryElement) {
      this.jQueryElement.off();
    }
    if (this.fileUpload) {
      this.fileUpload.destroy();
      this.fileUpload = null;
    }
  }

  clearUploadFile() {
    if (this.fileUpload) {
      this.fileUpload.clearUploadFile();
    }
  }
}
