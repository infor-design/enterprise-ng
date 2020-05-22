/// <reference path="soho-buttonset.d.ts" />

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  Input,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'div[soho-buttonset]', // tslint:disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoButtonsetComponent implements AfterViewInit, AfterViewChecked, OnDestroy {

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  /** Reference to the jQuery control. */
  private jQueryElement: JQuery;

  /** Reference to the Soho buttonset api. */
  private buttonset: SohoButtonsetStatic;

  /** Settings (options) */
  private settings: SohoButtonsetOptions = {};

  /** Flag to force an update of the control after the view is created. */
  private runUpdatedOnCheck: boolean;

  /**
   * Constructor.
   *
   * @param element - the element matching the component's selector.
   * @param ref - change detector reference for the component.
   * @param ngZone - angular zone.
   */
  constructor(
    private element: ElementRef,
    private ref: ChangeDetectorRef,
    private ngZone: NgZone) {
  }

  // ------------------------------------------
  // Inputs
  // ------------------------------------------

  /**
   * The list of buttons definitions.
   *
   * @params buttons - list of modal button definitions to use.
   */
  @Input()
  public set buttons(buttons: SohoButtonOptions[]) {
    this.settings.buttons = buttons;
    if (this.buttonset) {
      this.markForRefresh();
    }
  }

  public get buttons(): SohoButtonOptions[] {
    if (this.buttonset) {
      return this.buttonset.settings.buttons;
    } else {
      return this.settings.buttons;
    }
  }

  /**
   * Detect existing buttons in the markup rather than generating
   * new button markup.
   */
  @Input()
  set detectHTMLButtons(value: boolean) {
    this.settings.detectHTMLButtons = value;
    if (this.buttonset) {
      this.markForRefresh();
    }
  }

  get detectHTMLButtons(): boolean {
    if (this.buttonset) {
      return this.buttonset.settings.detectHTMLButtons;
    } else {
      return this.settings.detectHTMLButtons;
    }
  }

  /**
   * Styles to add to any generated button markup.
   */
  @Input()
  set style(style: string) {
    this.settings.style = style;
    if (this.buttonset) {
      this.markForRefresh();
    }
  }

  get style(): string {
    if (this.buttonset) {
      return this.buttonset.settings.style;
    } else {
      return this.settings.style;
    }
  }

  get buttonAPIs(): SohoButtonStatic[] {
    return this.buttonset.buttons;
  }

  /**
   * Disable all the buttons on the buttonset.
   *
   * @param val whether or not the Buttonset is disabled.
   */
  @Input()
  set disabled(val: boolean) {
    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.disabled = val;
      });
    }
  }

  /**
   * Adds a new button to the Buttonset.
   *
   * @param button button definition.
   * @param [doAddDOM=false] if true, appends the new element to the Buttonset container after creation/update.
   */
  public add(button: SohoButtonOptions, doAddDOM?: boolean): void {
    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.add(button, doAddDOM);
      });
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Removes a button from the buttonset, based on the API, HTML Element or element id.
   *
   * @param buttonAPI a button, an html element, or button id.
   * @param [doRemoveDOM=false] if true, removes the button's HTML from the page.
   */
  public remove(buttonAPI?: SohoButtonStatic | HTMLButtonElement | string, doRemoveDOM?: boolean): void {
    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.remove(buttonAPI, doRemoveDOM);
      });
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Removes ALL buttons from the buttonset
   *
   * @param [doRemoveDOM=false] if true, removes the button's HTML from the page.
   */
  public removeAll(doRemoveDOM?: boolean): void {
    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.removeAll(doRemoveDOM);
      });
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Returns a ButtonSet API in a specified place in the buttons array.
   *
   * @param idx index to target
   * @returns the Button API at the given index
   */
  public at(idx: number): SohoButtonStatic {
    if (this.buttonset) {
      return this.ngZone.runOutsideAngular(() => {
        return this.buttonset.at(idx);
      });
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Provides a JSON-compatible data representation of this button component for use with
   * higher-level components.
   *
   * @param addContextElement if true, adds a reference to this button element to the return data (NOT JSON-compatible).
   * @returns JSON-compatible representation of this button's configuration.
   */
  public toData(addContextElement: boolean): string {
    if (this.buttonset) {
      return this.ngZone.runOutsideAngular(() => {
        return this.buttonset.toData(addContextElement);
      });
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Update the component with new settings.
   *
   * @param settings The settings you would like to modify.
   * @returns This component's API.
   */
  public updated(settings: SohoButtonsetOptions): SohoButtonsetStatic {
    // Merge the settings.
    if (settings) {
      this.settings = Soho.utils.mergeSettings(this.element[0], settings, this.settings);
    }

    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.updated(this.settings);
      });
      return this.buttonset;
    } else {
      throw Error('buttonset not initialised');
    }
  }

  /**
   * Teardown and remove any added markup and events.
   */
  public destroy(): void {
    if (this.buttonset) {
      this.ngZone.runOutsideAngular(() => {
        this.buttonset.destroy();
      });
      this.buttonset = null;
    } else {
      throw Error('buttonset not initialised');
    }
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialise the Soho control.
      this.jQueryElement.buttonset(this.settings);

      // Once the control is initialised, extract the control
      // plug-in from the element.s  The element name is defined
      // by the plug-in, but in this case is 'button'.
      this.buttonset = this.jQueryElement.data('buttonset');
    });

    // There are no 'extra' event handlers for buttonset.
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      this.ngZone.runOutsideAngular(() => {
        this.updated(this.settings);
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Destructor.
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.buttonset) {
        this.buttonset.destroy();
        this.buttonset = null;
      }
    });
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  private markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }
}
