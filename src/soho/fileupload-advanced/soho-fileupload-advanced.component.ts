import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'soho-fileupload-advanced,div[soho-fileupload-advanced]',
  templateUrl: './soho-fileupload-advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SohoFileUploadAdvancedComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.fileupload-advanced') isFileUploadAdvanced = true;

  /**
   * Local variables
   */

  /** Keeps track of the enabled / disabled state. */
  public isDisabled: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------
  /**
   * Set the disabled state of the control.
   * @param disabled
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
    if (this.fileuploadadvanced) {
      if (value) {
        this.fileuploadadvanced.disable();
        this.isDisabled = true;
      } else {
        this.fileuploadadvanced.enable();
        this.isDisabled = false;
      }
    }
  }

  get disabled() {
    return this.isDisabled;
  }

  /**
   * On page(true) -or- on modal (false) , this is used for some visual style only.
   *
   * @param isStandalone true for onPage otherwise false.
   */
  @Input() set isStandalone(isStandaline: boolean) {
    this.options.isStandalone = isStandaline;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.isStandalone = isStandaline;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }
  get isStandalone(): boolean {
    return this.options.isStandalone;
  }

  /**
   * Restrict file types(ie. 'jpg|png|gif') ['*' all types]
   *
   * @param allowedTypes - the allowed types.
   */
  @Input() set allowedTypes(allowedTypes: string) {
    this.options.allowedTypes = allowedTypes;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.allowedTypes = allowedTypes;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }
  get allowedTypes(): string {
    return this.options.allowedTypes;
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
    this.options.send = sendFn;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.send = sendFn;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get send() {
    return this.options.send;
  }

  /**
   * Restricts the number of files that can be retrieved.
   *
   * @param maxFilesInProcess - the callback function responsible to uploading the file.
   */
  @Input() set maxFilesInProcess(maxFilesInProcess: number) {
    this.options.maxFilesInProcess = maxFilesInProcess;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.maxFilesInProcess = maxFilesInProcess;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get maxFilesInProcess() {
    return this.options.maxFilesInProcess;
  }

  /**
   * Max file size in bytes, -1 for unlimited.
   *
   * @param maxFileSize - Max file size in bytes, -1 for unlimited.
   */
  @Input() set maxFileSize(maxFileSize: number) {
    this.options.maxFileSize = maxFileSize;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.maxFileSize = maxFileSize;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get maxFileSize() {
    return this.options.maxFileSize;
  }

  /**
   * Variable name to read from server.
   *
   * @param fileName - Variable name to read from server..
   */
  @Input() set fileName(fileName: string) {
    this.options.fileName = fileName;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.fileName = fileName;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get fileName() {
    return this.options.fileName;
  }

  /**
   * Add way to browse files to upload
   *
   * @param showBrowseButton - if true, displays the browse button; otherwise do not.
   */
  @Input() set showBrowseButton(showBrowseButton: boolean) {
    this.options.showBrowseButton = showBrowseButton;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.showBrowseButton = showBrowseButton;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get showBrowseButton() {
    return this.options.showBrowseButton;
  }

  /**
   * Text to show in drop area.
   *
   * @param textDropArea - Text to show in drop area.
   */
  @Input() set textDropArea(textDropArea: string) {
    this.options.textDropArea = textDropArea;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.textDropArea = textDropArea;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get textDropArea() {
    return this.options.textDropArea;
  }

  /**
   * Text to show in drop area when browse option true.
   *
   * @param textDropAreaWithBrowse - Text to show in drop area when browse option true.
   */
  @Input() set textDropAreaWithBrowse(textDropAreaWithBrowse: string) {
    this.options.textDropAreaWithBrowse = textDropAreaWithBrowse;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.textDropAreaWithBrowse = textDropAreaWithBrowse;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get textDropAreaWithBrowse() {
    return this.options.textDropAreaWithBrowse;
  }

  /**
   * Hidden text for cancel button.
   *
   * @param textBtnCancel - Hidden text for cancel button.
   */
  @Input() set textBtnCancel(textBtnCancel: string) {
    this.options.textBtnCancel = textBtnCancel;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.textBtnCancel = textBtnCancel;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get textBtnCancel() {
    return this.options.textBtnCancel;
  }

  /**
   * Hidden text for error close button
   *
   * @param textBtnCloseError - Hidden text for error close button.
   */
  @Input() set textBtnCloseError(textBtnCloseError: string) {
    this.options.textBtnCloseError = textBtnCloseError;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.textBtnCloseError = textBtnCloseError;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get textBtnCloseError() {
    return this.options.textBtnCloseError;
  }

    /**
   * Hidden text for remove button.
   *
   * @param textBtnRemove - Hidden text for remove button.
   */
  @Input() set textBtnRemove(textBtnRemove: string) {
    this.options.textBtnRemove = textBtnRemove;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.textBtnRemove = textBtnRemove;
      // @todo provide an update method on the widget or destroy and recreate
    }
  }

  get textBtnRemove() {
    return this.options.textBtnRemove;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the fileupload value changes
   */
  @Output() filesdragenter = new EventEmitter<JQuery.Event>();
  @Output() filesdropped = new EventEmitter<File[]>();
  @Output() beforecreatestatus = new EventEmitter<File[]>();
  @Output() aftercreatestatus = new EventEmitter<File[]>();
  @Output() fileprogress = new EventEmitter<File[]>();
  @Output() fileaborted = new EventEmitter<File[]>();
  @Output() filecompleteduploading = new EventEmitter<File[]>();

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Set of options for this control. */
  private options: SohoFileUploadAdvancedOptions = {};

    // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the SoHoXi control api.
  private fileuploadadvanced: SohoFileUploadAdvancedStatic;

  // -------------------------------------------
  // Public API
  // -------------------------------------------

  /**
   * Destroys the control.
   */
  destroy() {
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.destroy();
      this.fileuploadadvanced = null;
    }
  }

  /**
   * Constructor.
   */
  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.fileuploadadvanced(this.options);

    this.jQueryElement
      .on('filesdragenter', (e: JQuery.Event) => { this.filesdragenter.next(e); })
      .on('filesdroped', (args: JQuery.Event, files: File[]) => { this.filesdropped.next(files); })
      .on('beforecreatestatus', (args: JQuery.Event, files: File[]) => { this.beforecreatestatus.next(files); })
      .on('aftercreatestatus', (args: JQuery.Event, files: File[]) => { this.aftercreatestatus.next(files); })
      .on('fileprogress', (args: JQuery.Event, files: File[]) => { this.fileprogress.next(files); })
      .on('fileaborted', (args: JQuery.Event, files: File[]) => { this.fileaborted.next(files); })
      .on('filecompleteuploading', (args: JQuery.Event, files: File[]) => { this.filecompleteduploading.next(files); });

    this.fileuploadadvanced = this.jQueryElement.data('fileuploadadvanced');
  }

  ngOnDestroy() {
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.destroy();
      this.fileuploadadvanced = null;
    }
  }
}
