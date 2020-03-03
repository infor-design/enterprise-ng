/// <reference path="soho-personalize.d.ts" />

import {
  AfterViewInit,
  Directive,
  EventEmitter,
  Input,
  Output,
  NgZone,
  OnDestroy,
} from '@angular/core';

/**
 * Angular Wrapper for the enterprise personalise widget.
 *
 * This component searches for an element with the attribute
 * 'soho-personalize'.
 */
@Directive({
  selector: '[soho-personalize]',
})
export class SohoPersonalizeDirective implements AfterViewInit, OnDestroy {

  /** Options. */
  @Input() public options: SohoPersonalizeOptions = {};

  /** The starting color. */
  @Input() set colors(colors: string | SohoPersonalizeColors) {
    this.options.colors = colors;
    if (this.personalize) {
      this.ngZone.runOutsideAngular(() => {
        this.personalize.setColors(colors);
       });
    }
  }

  /** The starting theme. */
  @Input() set theme(theme: string) {
    this.options.theme = theme;
    if (this.personalize) {
      this.ngZone.runOutsideAngular(() => {
        this.personalize.setTheme(theme);
       });
    }
  }

  @Output() changetheme = new EventEmitter<SohoChangeThemePersonalizeEvent>();

  @Output() changecolors = new EventEmitter<SohoChangeColorsPersonalizeEvent>();

  /** EP api */
  private personalize: SohoPersonalizeStatic;

  /** jQuery Widget */
  private jQueryElement: JQuery<HTMLElement>;

  /**
   * Constructor.
   */
  constructor(
    private ngZone: NgZone) {
  }

  /**
   * After the control has been initialised, and the view is ready,
   * get the SoHoXi controls to apply any renderings.
   */
  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // assign element to local variable - not this must attach to a root
      // element in this case 'body'
      this.jQueryElement = jQuery('html');

      // Check the element has attached to the body.
      if (this.jQueryElement.length === 0) {
        throw Error('No html tag found');
      }

      this.jQueryElement
        .on('themechanged',
          (ev: JQuery.TriggeredEvent, theme: string) => { this.onChangeTheme(ev, theme); })
        .on('colorschanged',
          (ev: JQuery.TriggeredEvent, colors: any) => { this.onChangeColors(ev, colors); });

      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement.personalize(this.options);

      // extract the api
      this.personalize = this.jQueryElement.data('personalize');
    });
  }

  /**
   * The theme currently set
   */
  public get currentTheme(): SohoTheme {
    return Soho.theme.currentTheme;
  }

  /**
   * Return a list of all the available themes.
   * @returns The list of themes.
   */
  public themes(): SohoTheme[] {
    return Soho.theme.themes();
  }

  /**
   * Return the colors used in the current theme that are recommended for personalization.
   * @returns An object full of the colors with id, name, and hex value.
   */
  public personalizationColors(): SohoPersonalizationColors {
    return Soho.theme.personalizationColors();
  }

  onChangeTheme(e: JQuery.TriggeredEvent, theme: string) {
    this.ngZone.run(() => {
      const event = e as SohoChangeThemePersonalizeEvent;
      event.theme = theme;
      // Set the legacy property
      event.data = theme;
      this.changetheme.emit(event);
    });
  }

  onChangeColors(e: JQuery.TriggeredEvent, colors: any) {
    this.ngZone.run(() => {
      const event = e as SohoChangeColorsPersonalizeEvent;
      event.colors = colors;
      // Set the legacy property
      event.data = colors;
      this.changecolors.emit(event);
    });
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {

      if (this.jQueryElement) {
        this.jQueryElement.off();
      }

      if (this.personalize) {
        this.personalize.destroy();
        this.personalize = null;
      }
    });
  }
}
