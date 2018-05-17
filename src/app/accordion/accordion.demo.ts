import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SohoAccordionComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'accordion-demo', // tslint:disable-line
  templateUrl: './accordion.demo.html',
})
export class AccordionDemoComponent implements AfterViewInit {

  @ViewChild(SohoAccordionComponent) accordion: SohoAccordionComponent;

  onBeforeCollapse(args) {
    console.log('Collapsed!', args);
  }
  onBeforeExpand(args) {
    console.log('Expanded!', args);
  }
  onBeforeSelect(args) {
    console.log('Selected!', args);
  }
  onAfterExpand(args) {
    console.log('onAfterExpand!', args);
  }
  onSelected(args) {
    console.log('onSelected!', args);
  }

  onFollowlink(args): void {
    console.log('onFollowlink!', args);
  }
  onExpand(args) {
    console.log('onExpand!', args);
  }
  onCollapse(args): void {
    console.log('onExpand!', args);
  }
  onAfterCollapse(args): void {
    console.log('onAfterCollapse!', args);
  }
  collapseAll(): void {
    this.accordion.collapseAll();
  }
  expandAll(): void {
    this.accordion.expandAll();
  }

  toggle(): void {
    this.accordion.toggle(this.accordion.getHeader(1));
  }

  expand(): void {
    this.accordion.expand(this.accordion.getHeader(1));
  }

  collapse(): void {
    this.accordion.collapse(this.accordion.getHeader(1));
  }

  disable(): void {
    this.accordion.getHeader(1).isDisabled = true;
    //    this.accordion.disable();
  }

  enable(): void {
    this.accordion.getHeader(1).isDisabled = false;
    // this.accordion.enable();
  }

  ngAfterViewInit(): void {
  }

  update(): void {
    if (this.accordion.displayChevron === undefined) {
      this.accordion.displayChevron = false;
    } else {
      this.accordion.displayChevron = !this.accordion.displayChevron;
    }
  }
}
