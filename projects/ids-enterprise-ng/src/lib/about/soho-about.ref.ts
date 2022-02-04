import { NgZone } from "@angular/core";
/**
 * Wrapper for the jQuery about control.
 */
export class SohoAboutRef {
  private eventGuard: SohoAboutDialogEventGuard | null | undefined = {};

  /** Selector referencing the about-dialog after it has been moved to the dialog container. */
  private jQueryElement?: JQuery;

  /** Soho Control Api */
  private _about?: SohoAboutStatic;

  /** Dialog placeholder, defaults to $('body')*/
  private _placeholder: JQuery;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  /**
   * Cached options.
   */
  private _options: SohoAboutOptions = {};

  /**
   * Sets the whole options block for this modal dialog.
   *
   * @param options - the options to set.
   */
  options(options?: SohoAboutOptions): SohoAboutRef {
    this._options = options || {};
    return this;
  }

  /**
   * Sets the appName on the about dialog
   *
   * @param appName - the application name
   */
  appName(appName: string): SohoAboutRef {
    this._options.appName = appName;
    return this;
  }

  /**
   * Sets the additional 'content' that the about dialog displays.
   *
   * @param content - the additional text content
   */
  content(content: string): SohoAboutRef {
    this._options.content = content;
    return this;
  }

  /**
   * Sets the copyrightYear of the about dialog.
   */
  copyrightYear(copyrightYear: string): SohoAboutRef {
    this._options.copyrightYear = copyrightYear;
    return this;
  }

  /**
   * Sets Whether or not to show the deviceSpecs
   *
   * @param deviceSpecs - if true; the about dialog will show device info
   */
  deviceSpecs(deviceSpecs: boolean): SohoAboutRef {
    this._options.deviceSpecs = deviceSpecs;
    return this;
  }

  /**
   * Sets The Additional productName
   *
   * @param productName - the product name
   */
  productName(productName: string): SohoAboutRef {
    this._options.productName = productName;
    return this;
  }

  /**
   * Sets The Additional productName
   *
   * @param productName - the product name
   */
  useDefaultCopyright(useDefaultCopyright: boolean): SohoAboutRef {
    this._options.useDefaultCopyright = useDefaultCopyright;
    return this;
  }

  /**
   * Sets about dialog version
   *
   * @param version - the semantic version no fx 4.0.1
   */
  version(version: string): SohoAboutRef {
    this._options.version = version;
    return this;
  }

  /**
   * Add extra attributes like id's to the component
   *
   * @param attributes - the array or object of attributes to add
   */
  attributes(attributes: Array<Object> | Object): SohoAboutRef {
    this._options.attributes = attributes;
    return this;
  }

  /**
   * Constructor.
   *
   * @param placeholder for the about dialog; defaults to the body.
   */
  constructor(private ngZone: NgZone) {
    this._placeholder = $('body');
  }

  /**
   * Displays the about dialog.
   *
   * @return the dialog ref.
   */
  open(): SohoAboutRef {
    // Returns the body!
    this._placeholder.about(this._options);

    // Need a better way of locating the about dialog dialog.
    this.jQueryElement = this._placeholder.find('.about');
    this._about = this.jQueryElement.data('about');

    this.jQueryElement?.off('beforeopen.about').on('beforeopen.about', ((event: any) => this.ngZone.run(() => this.onBeforeOpen(event))));
    this.jQueryElement?.off('close.about').on('close.about', ((event: any) => this.ngZone.run(() => this.onClose(event))));
    this.jQueryElement?.off('afterclose.about').on('afterclose.about', ((event: any) => this.ngZone.run(() => this.onAfterClose(event))));

    return this;
  }

  /**
   * Closes the about dialog, if open.
   *
   * @param dialogResult - optional result - held for the caller.
   */
  close(): SohoAboutRef {
    if (this._about) {
      this._about.close();
    }
    return this;
  }

  /**
   * Registers a before open guard.
   *
   * @param eventFn - the function to call before openning the dialog.
   */
  beforeOpen(eventFn: (dialogRef?: SohoAboutRef) => boolean): SohoAboutRef {
    (this.eventGuard as any).beforeOpen = eventFn;
    return this;
  }

  /**
   * Registers a closed guard.
   *
   * @param eventFn - the function to call before openning the dialog.
   */
  closed(eventFn: (dialogRef?: SohoAboutRef) => boolean): SohoAboutRef {
    (this.eventGuard as any).closed = eventFn;
    return this;
  }

  /**
   * Registers a after close guard.
   *
   * @param eventFn - the function to call before openning the dialog.
   */
  afterClose(eventFn: (dialogRef?: SohoAboutRef) => boolean): SohoAboutRef {
    (this.eventGuard as any).afterClose = eventFn;
    return this;
  }

  /**
   * Handles the 'beforeOpen' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   *
   * @return true if the dialog can be opened; otherwise false if veoted.
   */
  private onBeforeOpen(_event: any): boolean {
    const fn: Function = (this.eventGuard?.beforeOpen as any);
    return fn ? fn.call(this.eventGuard, this) : true;
  }

  /**
   * Handles the 'closed' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   *
   * @return true if the dialog can be opened; otherwise false if veoted.
   */
  private onClose(_event: any): boolean {
    const fn: Function = (this.eventGuard?.closed as any);
    return fn ? fn.call(this.eventGuard, this) : true;
  }

  /**
   * Handles the 'afterClose' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   *
   * @return true if the dialog can be opened; otherwise false if veoted.
   */
  private onAfterClose(_event: any): boolean {
    const fn: Function = (this.eventGuard?.afterClose as any);
    return fn ? fn.call(this.eventGuard, this) : true;
  }
}


/**
 * Event Handlers.
 */
export interface SohoAboutDialogEventGuard {
  /**
   * Invoked before a modal is opened.
   *
   * @return false to veto the open action; otherwise true.
   */
  beforeOpen?(dialogRef: SohoAboutRef): boolean;

  /**
   * Invoked when closing a modal.
   *
   * @return false to veto the open action; otherwise true.
   */
  closed?(dialogRef: SohoAboutRef): boolean;

  /**
   * Invoked after the modal is closed.
   *
   * @return false to veto the open action; otherwise true.
   */
  afterClose?(dialogRef: SohoAboutRef): boolean;
}
