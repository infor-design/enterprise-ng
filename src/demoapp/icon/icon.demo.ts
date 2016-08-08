import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { SohoButtonComponent, BUTTON_TYPES, SohoIconComponent } from '../.';

@Component({
  moduleId: module.id,
  selector: 'soho-icon-demo',
  templateUrl: 'icon.demo.html',
  directives: [ SohoButtonComponent, SohoIconComponent ]
})
export class IconDemoComponent implements OnInit, AfterViewInit {
  private types = BUTTON_TYPES; // tslint:disable-line
  private jQueryElement: any;

  constructor(private element: ElementRef) {}

  ngOnInit() { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.button();
  }
}
