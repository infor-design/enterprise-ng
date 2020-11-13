import { Component, AfterViewInit, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoAccordionComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'accordion-demo', // tslint:disable-line
  templateUrl: 'accordion.demo.html',
})
export class AccordionDemoComponent implements AfterViewInit {

  @ViewChild(SohoAccordionComponent, { static: true }) accordion?: SohoAccordionComponent;

  onBeforeCollapse(args: any) {
    console.log('Collapsed!', args);
  }
  onBeforeExpand(args: any) {
    console.log('Expanded!', args);
  }
  onBeforeSelect(args: any) {
    console.log('Selected!', args);
  }
  onAfterExpand(args: any) {
    console.log('onAfterExpand!', args);
  }
  onSelected(args: any) {
    console.log('onSelected!', args);
  }

  onFollowlink(args: any): void {
    console.log('onFollowlink!', args);
  }
  onExpand(args: any) {
    console.log('onExpand!', args);
  }
  onCollapse(args: any): void {
    console.log('onExpand!', args);
  }
  onAfterCollapse(args: any): void {
    console.log('onAfterCollapse!', args);
  }
  collapseAll(): void {
    this.accordion?.collapseAll();
  }
  expandAll(): void {
    this.accordion?.expandAll();
  }

  toggle(): void {
    this.accordion?.toggle(this.accordion?.getHeader(1));
  }

  expand(): void {
    this.accordion?.expand(this.accordion?.getHeader(1));
  }

  collapse(): void {
    this.accordion?.collapse(this.accordion?.getHeader(1));
  }

  disable(): void {
    (this.accordion as any).getHeader(1).isDisabled = true;
    //    this.accordion?.disable();
  }

  enable(): void {
    (this.accordion as any).getHeader(1).isDisabled = false;
    // this.accordion?.enable();
  }

  ngAfterViewInit(): void {
  }

  update(): void {
    if (this.accordion?.displayChevron === undefined) {
      (this.accordion as any).displayChevron = false;
    } else {
      (this.accordion as any).displayChevron = !this.accordion?.displayChevron;
    }
  }
}
