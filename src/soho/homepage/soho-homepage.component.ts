import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input } from '@angular/core';

@Component({
  selector: 'div[soho-homepage]', // tslint:disable-line
  template: `<div class="content">
                <ng-content></ng-content>
             </div>
            `
})
export class SohoHomePageComponent implements AfterViewInit {
  @Input() columns: number;
  @HostBinding('class.homepage') isHomepage = true;

  // Reference to the jQuery element.
  private jQueryElement: JQuery;

  // Reference to the annotated SoHoXi control
  private homePage: SohoHomePageStatic;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    // Wrap for later.
    this.jQueryElement = jQuery(this.elementRef.nativeElement);

    // Initialise the SoHoXi control.
    this.jQueryElement.homepage();

    // Once the control is initialised, extract the control
    // plug-in from the element.  The element name is
    // defined by the plug-in, but in this case is 'homepage'.
    this.homePage = this.jQueryElement.data('homepage');
  }
}
