import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Angular Wrapper for the SohoEmptyMessage Control.
 */
@Directive({
  selector: '[soho-emptymessage]', // tslint:disable-line
  exportAs: 'soho-emptymessage'
})
export class SohoEmptyMessageDirective implements AfterViewInit {

  /**
   * The `emptyMessage` option.
   */
  @Input() set emptyMessageOptions(options: SohoEmptyMessageOptions) {
    /** Check for undefined/null and reset to the default message */
    options = options || {
      title: (Locale ? Locale.translate('NoData') : 'No Data Available'),
      info: '',
      icon: 'icon-empty-no-data'
    };

    this._emptyMessageOptions = options;
    if (this.jQueryElement) {
      this.emptymessage.settings = options;
    }
  }

  get emptyMessageOptions(): SohoEmptyMessageOptions {
    if (this.emptymessage) {
      return this.emptymessage.settings;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions;
  }

  @Input() set title(title: string) {
    this._emptyMessageOptions.title = title;
    if (this.emptymessage) {
      this.emptymessage.settings.title = title;
    }
  }

  get title(): string {
    if (this.emptymessage) {
      return this.emptymessage.settings.title;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.title;
  }

  @Input() set info(info: string) {
    this._emptyMessageOptions.info = info;
    if (this.emptymessage) {
      this.emptymessage.settings.info = info;
    }
  }

  get info(): string {
    if (this.emptymessage) {
      return this.emptymessage.settings.info;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.info;
  }

  @Input() set icon(icon: string) {
    this._emptyMessageOptions.icon = icon;
    if (this.emptymessage) {
      this.emptymessage.settings.icon = icon;
    }
  }

  get icon(): string {
    if (this.emptymessage) {
      return this.emptymessage.settings.icon;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.icon;
  }

  @Input() set button(button: SohoEmptyMessageButtonOptions) {
    this._emptyMessageOptions.button = button;
    if (this.emptymessage) {
      this.emptymessage.settings.button = button;
    }
  }

  get button(): SohoEmptyMessageButtonOptions {
    if (this.emptymessage) {
      return this.emptymessage.settings.button;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.button;
  }

  private _emptyMessageOptions: SohoEmptyMessageOptions = {};
  private jQueryElement: JQuery;
  private emptymessage: SohoEmptyMessageStatic;

  constructor(private element: ElementRef) {}

  /**
   * After the control has been initialised and the view is ready,
   * construct the empty message sohoxi component.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.emptymessage(this.emptyMessageOptions);
    this.emptymessage = this.jQueryElement.data('emptymessage');
  }
}
