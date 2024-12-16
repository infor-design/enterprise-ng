import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  Input
} from '@angular/core';

/**
 * Angular Wrapper for the SohoEmptyMessage Control.
 */
@Directive({
    selector: '[soho-emptymessage]', // eslint-disable-line
    exportAs: 'soho-emptymessage',
    standalone: false
})
export class SohoEmptyMessageDirective implements AfterViewChecked, AfterViewInit {

  /**
   * The `emptyMessage` option.
   */
  @Input() set emptyMessageOptions(options: SohoEmptyMessageOptions) {
    /** Check for undefined/null and reset to the default message */
    options = options || {
      title: (Soho.Locale ? Soho.Locale.translate('NoData') : 'No Data Available'),
      info: '',
      icon: 'icon-empty-no-data'
    };

    this._emptyMessageOptions = options;
    if (this.jQueryElement) {
      (this.emptymessage as any).settings = options;
      this.markForCheck();
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

  @Input() set title(title: string | undefined) {
    this._emptyMessageOptions.title = title;
    if (this.emptymessage) {
      this.emptymessage.settings.title = title;
      this.markForCheck();
    }
  }

  get title(): string | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.title;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.title;
  }

  @Input() set info(info: string | undefined) {
    this._emptyMessageOptions.info = info;
    if (this.emptymessage) {
      this.emptymessage.settings.info = info;
      this.markForCheck();
    }
  }

  get info(): string | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.info;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.info;
  }

  @Input() set icon(icon: string | undefined) {
    this._emptyMessageOptions.icon = icon;
    if (this.emptymessage) {
      this.emptymessage.settings.icon = icon;
      this.markForCheck();
    }
  }

  get icon(): string | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.icon;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.icon;
  }

  @Input() set height(height: string | undefined) {
    this._emptyMessageOptions.height = height;
    if (this.emptymessage) {
      this.emptymessage.settings.height = height;
      this.markForCheck();
    }
  }

  get height(): string | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.height;
    }
    return this._emptyMessageOptions.height;
  }

  @Input() set button(button: SohoEmptyMessageButtonOptions | undefined) {
    this._emptyMessageOptions.button = button;
    if (this.emptymessage) {
      this.emptymessage.settings.button = button;
      this.markForCheck();
    }
  }

  get button(): SohoEmptyMessageButtonOptions | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.button;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.button;
  }

  @Input() set color(color: EmptyMessageColor | undefined) {
    this._emptyMessageOptions.color = color;
    if (this.emptymessage) {
      this.emptymessage.settings.color = color;
      this.markForCheck();
    }
  }

  get color(): EmptyMessageColor | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.color;
    }

    // ... we've been called before the component has completed
    // initialisation, so return the current value from the
    // options.
    return this._emptyMessageOptions.color;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined ) {
    this._emptyMessageOptions.attributes = attributes;
    if (this.emptymessage) {
      this.emptymessage.settings.attributes = attributes;
      this.markForCheck();
    }
  }

  get attributes(): Array<Object> | Object | undefined {
    if (this.emptymessage) {
      return this.emptymessage.settings.attributes;
    }
    return this._emptyMessageOptions.attributes;
  }

  private _emptyMessageOptions: SohoEmptyMessageOptions = {};
  private jQueryElement?: JQuery;
  private emptymessage?: SohoEmptyMessageStatic;
  private updateComponent = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
  ) { }

  /**
   * After the control has been initialised and the view is ready,
   * construct the empty message sohoxi component.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.emptymessage(this.emptyMessageOptions);
    this.emptymessage = this.jQueryElement.data('emptymessage');
  }

  /**
   *
   */
  ngAfterViewChecked() {
    if (this.updateComponent) {
      this.emptymessage?.updated();
      this.updateComponent = false;
    }
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  private markForCheck() {

    this.updateComponent = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.changeDetector.markForCheck();
  }
}
