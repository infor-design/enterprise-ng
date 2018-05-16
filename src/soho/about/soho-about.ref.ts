import { Subject } from 'rxjs';

/**
 * Wrapper for the jQuery about control.
 */
export class SohoAboutRef {

  /** Selector referencing the about-dialog after it has been moved to the dialog container. */
  private jQueryElement: JQuery;

  /** Soho Control Api */
  private _about: SohoAboutStatic;

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
  options(options: SohoAboutOptions): SohoAboutRef {
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
   * Constructor.
   *
   * @param placeholder for the about dialog; defaults to the body.
   */
  constructor() {
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
    this.jQueryElement = this._placeholder.find('about');

    // Get the api.
    this._about = this.jQueryElement.data('about');

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

}
