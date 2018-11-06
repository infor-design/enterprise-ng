/// <reference path="soho-personalize.d.ts" />

import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  NgZone,
  OnDestroy,
} from '@angular/core';

/**
 * Angular Wrapper for the SoHo Personalise Directive.
 *
 * This component searches for an element with the attribute
 * 'soho-personalize'.
 */
@Directive({
  selector: '[soho-personalize]',
})
export class SohoPersonalizeDirective implements AfterViewInit, OnDestroy {

  /** EP api */
  private personalize: SohoPersonalizeStatic;

  /** jQuery Widget */
  private jQueryElement: JQuery<HTMLElement>;

  /** Options. */
  @Input() options: SohoPersonalizeOptions = {};

  /** The starting colour. */
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

  /**
   * Constructor.
   */
  constructor(
    private element: ElementRef,
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
      // assign element to local variable - not this must attach to a root#
      // element in this case 'body'
      this.jQueryElement = jQuery('body');

      // initialise the colorpicker control
      const api = this.jQueryElement.personalize(this.options);
      /**
       * Bind to jQueryElement's events
       */
      this.jQueryElement
        .on('changetheme.personalize',
          (ev: JQuery.Event, theme: string) => { console.log(`changetheme.personalize`); this.onChangeTheme(ev, theme); })
        .on('changecolors.personalize',
          (ev: JQuery.Event, colors: any) => { console.log(`changecolors.personalize`); this.onChangeColors(ev, colors); });

      // extract the api
      this.personalize = this.jQueryElement.data('personalize');
    });

  }

  onChangeTheme(e: JQuery.Event, theme: string) {
    this.ngZone.run(() => {
      const event = e as SohoChangeThemePersonalizeEvent;
      event.theme = theme;
      // Set the legacy property
      event.data = theme;
      this.changetheme.emit(event);
    });
  }

  onChangeColors(e: JQuery.Event, colors: any) {
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
