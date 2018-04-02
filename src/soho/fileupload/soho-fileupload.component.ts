import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'soho-fileupload',
  templateUrl: './soho-fileupload.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoFileUploadComponent implements AfterViewInit, OnDestroy {
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

    if (this.fileUpload) {
      if (value) {
        this.fileUpload.disable();
        this.isDisabled = true;
      } else {
        this.fileUpload.enable();
        this.isDisabled = false;
        this.isReadOnly = false;
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

  /**
   * @param name
   */
  @Input() name: string;

  /**
   * @param accepts filetypes
   */
  @Input() accept: string;

  /**
   * @param accepts string.
   */
  @Input() id: string;

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the fileupload value changes
   */
  @Output() onChange = new EventEmitter<SohoTextAreaEvent>();

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
    const $fileUpload = this.jQueryElement.find('input').fileupload();
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
}
