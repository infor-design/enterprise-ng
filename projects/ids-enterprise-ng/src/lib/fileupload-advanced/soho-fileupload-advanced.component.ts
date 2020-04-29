/// <reference path="soho-fileupload-advanced.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnDestroy,
  HostBinding, AfterViewChecked, NgZone, ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'soho-fileupload-advanced,div[soho-fileupload-advanced]',
  templateUrl: 'soho-fileupload-advanced.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SohoFileUploadAdvancedComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /**
   * Add class to host element to ensure correct styling and detection by EP controls.
   */
  @HostBinding('class.fileupload-advanced') isFileUploadAdvanced = true;

  /**
   * Local variables
   */

  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck: boolean;

  /** Keeps track of the enabled / disabled state. */
  public isDisabled: boolean;

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  /**
   * Set the disabled state of the control.
   */
  @Input() set disabled(value: boolean) {
    this.isDisabled = value;
    if (this.fileuploadadvanced) {
      if (value) {
        this.ngZone.runOutsideAngular(() => {
          this.fileuploadadvanced.disable();
        });
        this.isDisabled = true;
      } else {
        this.ngZone.runOutsideAngular(() => {
          this.fileuploadadvanced.enable();
        });
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
    }
  }

  get send() {
    return this.options.send;
  }

  /**
   * Restricts the number of files that can be retrieved in total.
   *
   * @param maxFiles - max files cab be upload.
   */
  @Input() set maxFiles(maxFiles: number) {
    this.options.maxFiles = maxFiles;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.maxFiles = maxFiles;
      this.markForRefresh();
    }
  }

  get maxFiles() {
    return this.options.maxFiles;
  }

  /**
   * Restricts the number of files that can be retrieved while in process.
   *
   * @param maxFilesInProcess - the callback function responsible to uploading the file.
   */
  @Input() set maxFilesInProcess(maxFilesInProcess: number) {
    this.options.maxFilesInProcess = maxFilesInProcess;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.maxFilesInProcess = maxFilesInProcess;
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
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
      this.markForRefresh();
    }
  }

  get textBtnRemove() {
    return this.options.textBtnRemove;
  }

  /**
   *
   */
  @Input() set errorMaxFiles(errorMaxFiles: string) {
    this.options.errorMaxFiles = errorMaxFiles;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.updated(this.fileuploadadvanced.settings);
      this.markForRefresh();
    }
  }

  get errorMaxFiles(): string {
    return this.options.errorMaxFiles;
  }

  /**
   *
   */
  @Input() set errorMaxFilesInProcess(errorMaxFilesInProcess: string) {
    this.options.errorMaxFilesInProcess = errorMaxFilesInProcess;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.updated(this.fileuploadadvanced.settings);
      this.markForRefresh();
    }
  }

  get errorMaxFilesInProcess(): string {
    return this.options.errorMaxFilesInProcess;
  }

  /**
   *
   */
  @Input() set errorMaxFileSize(errorMaxFilesSize: string) {
    this.options.errorMaxFileSize = errorMaxFilesSize;
    if (this.fileuploadadvanced) {
      this.fileuploadadvanced.settings.errorMaxFileSize = errorMaxFilesSize;
      this.markForRefresh();
    }
  }

  get errorMaxFileSize(): string {
    return this.options.errorMaxFileSize;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------
  /**
   * Called when the fileupload value changes
   */
  @Output() filesdragenter = new EventEmitter<JQuery.TriggeredEvent>();
  @Output() filesdropped = new EventEmitter<File[]>();
  @Output() beforecreatestatus = new EventEmitter<File[]>();
  @Output() aftercreatestatus = new EventEmitter<File[]>();
  @Output() fileprogress = new EventEmitter<File[]>();
  @Output() fileaborted = new EventEmitter<File[]>();
  @Output() filecompleteduploading = new EventEmitter<File[]>();
  @Output() fileremoved = new EventEmitter<File[]>();

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
   * Updates the control by merging the given settings into
   * the EP widget.
   *
   * @param settings the settings to merge.
   */
  updated(settings: SohoFileUploadAdvancedOptions): void {
    if (this.fileuploadadvanced) {
      this.ngZone.runOutsideAngular(() => {
        this.fileuploadadvanced.updated(settings);
      });
      this.options = this.fileuploadadvanced.settings;
    } else {
      this.options = settings;
    }
  }

  /**
   * Destroys the control.
   */
  destroy() {
    if (this.fileuploadadvanced) {
      this.ngZone.runOutsideAngular(() => {
        this.fileuploadadvanced.destroy();
      });
      this.fileuploadadvanced = null;
    }
  }

  /**
   * Constructor.
   */
  constructor(private element: ElementRef,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.fileuploadadvanced(this.options);

    this.jQueryElement
      .on('filesdragenter', (e: JQuery.TriggeredEvent) => {
        this.ngZone.run(() => {
          this.filesdragenter.next(e);
        });
      })
      .on('filesdroped', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => { this.filesdropped.next(files); });
      })
      .on('beforecreatestatus', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.beforecreatestatus.next(files);
        });
      })
      .on('aftercreatestatus', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.aftercreatestatus.next(files);
        });
      })
      .on('fileprogress', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.fileprogress.next(files);
        });
      })
      .on('fileaborted', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.fileaborted.next(files);
        });
      })
      .on('filecompleteuploading', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.filecompleteduploading.next(files);
        });
      })
      .on('fileremoved', (args: JQuery.TriggeredEvent, files: File[]) => {
        this.ngZone.run(() => {
          this.fileremoved.next(files);
        });
      });

    this.fileuploadadvanced = this.jQueryElement.data('fileuploadadvanced');
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {
        this.updated(this.options);
        this.runUpdatedOnCheck = false;
      });
    }
  }

  ngOnDestroy() {
    if (this.fileuploadadvanced) {
      this.ngZone.runOutsideAngular(() => {
        this.fileuploadadvanced.destroy();
      });
      this.fileuploadadvanced = null;
    }
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatically the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }
}
