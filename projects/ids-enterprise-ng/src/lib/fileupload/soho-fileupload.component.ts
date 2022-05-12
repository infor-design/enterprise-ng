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
  selector: 'input[soho-fileupload]',  // eslint-disable-line
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

  get disabled(): boolean | undefined {
    return this.isDisabled;
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

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Called when the fileupload value changes
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() change = new EventEmitter<SohoFileUploadEvent>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the SoHoXi control api.
  private fileUpload?: SohoFileUploadStatic | null;
  private options: SohoFileUploadOptions = {};

  constructor(
    private element: ElementRef,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  /** Called when the value changes. */
  @Output() changeEvent = new EventEmitter<SohoFileUploadEvent>();

  @Input() public set attributes(attributes: Array<Object> | Object | undefined) {
    this.options.attributes = attributes;
    if (this.jQueryElement) {
      this.options.attributes = this.options.attributes;
      this.jQueryElement?.data('fileupload').updated(this.options);
    }
  }
  public get attributes(): Array<Object> | Object | undefined {
    return this.options.attributes;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialize the SohoXi Control
      const $fileUpload = this.jQueryElement.fileupload(this.options);
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
      this.jQueryElement = undefined;
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
