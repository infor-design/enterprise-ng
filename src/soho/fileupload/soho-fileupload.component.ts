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
  OnDestroy
} from '@angular/core';

@Component({
  selector: 'input[soho-fileupload]',  // tslint:disable-line
  template:  '<ng-content></ng-content>',
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
  public isDisabled: boolean;
  public isReadOnly: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
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

  /**
   * @param readonly
   */
  @Input() set readonly(value: boolean) {
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
  @Output() onChange = new EventEmitter<SohoFileUploadEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled() {
    return this.isDisabled;
  }
  get readonly() {
    return this.isReadOnly;
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private fileUpload: SohoFileUploadStatic;

  constructor(private element: ElementRef, private changeDetectorRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    // Initialize the SohoXi Control
    const $fileUpload = this.jQueryElement.fileupload();
    this.fileUpload = $fileUpload.data('fileupload');

    /**
     * Bind to jQueryElement's events
     */
    this.jQueryElement.on('change', (event: SohoFileUploadEvent) => this.onChange.emit(event));
  }

  ngOnDestroy() {
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
