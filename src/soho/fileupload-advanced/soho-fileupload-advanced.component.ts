import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-fileupload-advanced,div[soho-fileupload-advanced]',
  templateUrl: './soho-fileupload-advanced.component.html'
})

export class SohoFileUploadAdvancedComponent implements AfterViewInit, OnDestroy {
  private settings: SohoFileUploadAdvancedOptions = {};

  @HostBinding('class.fileupload-advanced') isFileUploadAdvanced = true;

  /**
   * Local variables
   */
  public isDisabled: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
    if (this.fileUploadAdvanced) {
      if (value) {
        this.fileUploadAdvanced.disable();
        this.isDisabled = true;
      } else {
        this.fileUploadAdvanced.enable();
        this.isDisabled = false;
      }
    }
  }

  /**
   * On page(true) -or- on modal (false) , this is used for some visual style only.
   *
   * @param isStandalone true for onPage otherwise false.
   */
  @Input() set isStandalone(isStandaline: boolean) {
    this.settings.isStandalone = isStandaline;
    if (this.fileUploadAdvanced) {
      this.fileUploadAdvanced.settings.isStandalone = isStandaline;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }
  get isStandalone(): boolean {
    return this.settings.isStandalone;
  }


  /**
   * Restrict file types(ie. 'jpg|png|gif') ['*' all types]
   *
   * @param allowedTypes - the allowed types.
   */
  @Input() set allowedTypes(allowedTypes: string) {
    this.settings.allowedTypes = allowedTypes;
    if (this.fileUploadAdvanced) {
      this.fileUploadAdvanced.settings.allowedTypes = allowedTypes;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }
  get allowedTypes(): string {
    return this.settings.allowedTypes;
  }

  /**
   * Defines the send method used to upload the files.
   *
   * The send function takes the FormData containing the file, and a
   * status interface to provide fedback to the control whilst uploading.
   *
   * @param sendFn - the callback function responsible to uploading the file.
   */
  @Input() set send(sendFn: SohoFileUploadAdvancedSendFunction) {
    this.settings.send = sendFn;
    if (this.fileUploadAdvanced) {
      this.fileUploadAdvanced.settings.send = sendFn;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get send() {
    return this.settings.send;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the fileupload value changes
   */
  @Output() filesdragenter = new EventEmitter<JQueryEventObject>();
  @Output() filesdropped = new EventEmitter<File[]>();
  @Output() beforecreatestatus = new EventEmitter<File[]>();
  @Output() aftercreatestatus = new EventEmitter<File[]>();
  @Output() fileprogress = new EventEmitter<File[]>();
  @Output() fileaborted = new EventEmitter<File[]>();
  @Output() filecompleteduploading = new EventEmitter<File[]>();

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  get disabled() {
    return this.isDisabled;
  }

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private fileUploadAdvanced: SohoFileUploadAdvancedStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.fileuploadadvanced(this.settings);

    this.jQueryElement
      .on('filesdragenter', (e: JQueryEventObject) => { this.filesdragenter.next(e); })
      .on('filesdroped', (args: JQueryEventObject, files: File[]) => { this.filesdropped.next(files); })
      .on('beforecreatestatus', (args: JQueryEventObject, files: File[]) => { this.beforecreatestatus.next(files); })
      .on('aftercreatestatus', (args: JQueryEventObject, files: File[]) => { this.aftercreatestatus.next(files); })
      .on('fileprogress', (args: JQueryEventObject, files: File[]) => { this.fileprogress.next(files); })
      .on('fileaborted', (args: JQueryEventObject, files: File[]) => { this.fileaborted.next(files); })
      .on('filecompleteuploading', (args: JQueryEventObject, files: File[]) => { this.filecompleteduploading.next(files); });

    this.fileUploadAdvanced = this.jQueryElement.data('fileuploadadvanced');
  }

  ngOnDestroy() {
    if (this.fileUploadAdvanced) {
      this.fileUploadAdvanced.destroy();
      this.fileUploadAdvanced = null;
    }
  }
}
