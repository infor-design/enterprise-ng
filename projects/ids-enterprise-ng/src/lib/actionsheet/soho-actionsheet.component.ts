import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'div[soho-actionsheet]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoActionsheetComponent implements AfterViewInit, OnDestroy {
  @HostBinding('style.display') display = 'inline-block';

  /**
   * Constructor
   * 
   * @param elementRef - the element matching the component's selector.
   * @param ngZone - the angular zone for this component.
   */
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  private _options: SohoActionsheetOptions = {
    breakpoint: 'phone-to-tablet',
    displayAsActionSheet: 'responsive',
    autoFocus: true,
    overlayOpacity: 0.7,
    tray: false,
    trayOpts: {
      backgroundColor: 'slate'
    },
    showCancelButton: true
  };
  private actionsheet?: SohoActionsheetStatic | null;
  private jQueryElement!: JQuery | undefined;

  @Input() set actions(actions: SohoActionsheetActions | undefined) {
    this._options.actions = actions;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.actions = actions;
    }
  }
  public get actions(): SohoActionsheetActions | undefined {
    if (!this.actionsheet) {
      return this._options.actions;
    }
    return this.actionsheet.settings.actions;
  }

  @Input() set showCancelButton(showCancelButton: boolean | undefined) {
    this._options.showCancelButton = showCancelButton;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.showCancelButton = showCancelButton;
    }
  }
  public get showCancelButton(): boolean | undefined {
    if (!this.actionsheet) {
      return this._options.showCancelButton;
    }
    return this.actionsheet.settings.showCancelButton;
  }

  @Input() set autoFocus(autoFocus: boolean | undefined) {
    this._options.autoFocus = autoFocus;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.autoFocus = autoFocus;
    }
  }
  public get autoFocus(): boolean | undefined {
    if (!this.actionsheet) {
      return this._options.autoFocus;
    }
    return this.actionsheet.settings.autoFocus;
  }

  @Input() set breakpoint(breakpoint: string | undefined) {
    this._options.breakpoint = breakpoint;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.breakpoint = breakpoint;
    }
  }
  public get breakpoint(): string | undefined {
    if (!this.actionsheet) {
      return this._options.breakpoint;
    }
    return this.actionsheet.settings.breakpoint;
  }

  @Input() set displayAsActionSheet(displayAsActionSheet: SohoActionsheetDisplay | undefined) {
    this._options.displayAsActionSheet = displayAsActionSheet;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.displayAsActionSheet = displayAsActionSheet;
    }
  }
  public get displayAsActionSheet(): SohoActionsheetDisplay | undefined {
    if (!this.actionsheet) {
      return this._options.displayAsActionSheet;
    }
    return this.actionsheet.settings.displayAsActionSheet;
  }

  @Input() set overlayOpacity(overlayOpacity: number | undefined) {
    this._options.overlayOpacity = overlayOpacity;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.overlayOpacity = overlayOpacity;
    }
  }
  public get overlayOpacity(): number | undefined {
    if (!this.actionsheet) {
      return this._options.overlayOpacity;
    }
    return this.actionsheet.settings.overlayOpacity;
  }

  @Input() set onSelect(onSelect: Function | undefined) {
    this._options.onSelect = onSelect;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.onSelect = onSelect;
    }
  }
  public get onSelect(): Function | undefined {
    if (!this.actionsheet) {
      return this._options.onSelect;
    }
    return this.actionsheet.settings.onSelect;
  }

  @Input() set onCancel(onCancel: Function | undefined) {
    this._options.onCancel = onCancel;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.onCancel = onCancel;
    }
  }
  public get onCancel(): Function | undefined {
    if (!this.actionsheet) {
      return this._options.onCancel;
    }
    return this.actionsheet.settings.onCancel;
  }

  @Input() set tray(tray: boolean | undefined) {
    this._options.tray = tray;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.tray = tray;
    }
  }
  public get tray(): boolean | undefined {
    if (!this.actionsheet) {
      return this._options.tray;
    }
    return this.actionsheet.settings.tray;
  }

  @Input() set trayOpts(trayOpts: SohoActionsheetTrayOptions | undefined) {
    this._options.trayOpts = trayOpts;
    this.updated();

    if (this.actionsheet) {
      this.actionsheet.settings.trayOpts = trayOpts;
    }
  }
  public get trayOpts(): SohoActionsheetTrayOptions | undefined {
    if (!this.actionsheet) {
      return this._options.trayOpts;
    }
    return this.actionsheet.settings.trayOpts;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this._options.attributes = attributes;
    this.updated();

    if (this.actionsheet) {
      (this.actionsheet as any).settings.attributes = attributes;
    }
  }
  public get attributes(): Array<Object> | Object | undefined {
    if (!this.actionsheet) {
      return this._options.attributes;
    }
    return this.actionsheet.settings.attributes;
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialize the Soho Control.
      this.jQueryElement.actionsheet(this._options);

      // Add classes for styling of the actionsheet trigger
      this.jQueryElement.find('button').addClass('btn-actions vertical');
    });
  }

  /** Tears down and removes any added markup and events. */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.actionsheet) {
        this.actionsheet.destroy();
        this.actionsheet = null;
      }
    });
  }

  /**
   * Triggers a UI Resync.
   */
  updated(settings?: SohoActionsheetOptions) {
    if (settings) {
      this._options = settings;
    }

    if (!this.actionsheet) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.actionsheet?.updated(this._options);
    });
  }

  /**
   * Tears down and removes any added markup and events.
   */
  destroy() {
    if (!this.actionsheet) {
      return;
    }

    this.ngZone.runOutsideAngular(() => {
      this.actionsheet?.destroy();
    });
  }
}
