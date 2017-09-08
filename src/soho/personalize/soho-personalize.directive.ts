import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  Output,
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
export class SohoPersonalizeDirective implements AfterViewInit {

  /** Options. */
  @Input() options: SohoPersonalizeOptions = {};

  /** The starting colour. */
  @Input() set colors(colors: string) {
    this.options.colors = colors;
  }

  /** The starting theme. */
  @Input() set theme(theme: string) {
    this.options.theme = theme;
  }

  @Output() changetheme: EventEmitter<Object> = new EventEmitter<Object>();

  @Output() changecolors: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * Constructor.
   */
  constructor(private el: ElementRef) {
  }

  /**
   * After the control has been initialised, and the view is ready,
   * get the SoHoXi controls to apply any renderings.
   */
  ngAfterViewInit() {
    jQuery('body').personalize(this.options)
      .on('changetheme.personalize', (ev, data) => { ev.data = data; this.changetheme.emit(ev); })
      .on('changecolors.personalize', (ev, data) => { ev.data = data; this.changecolors.emit(ev); });
  }
}
