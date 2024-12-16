import { Component, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoAccordionComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'accordion-panels-demo', // eslint-disable-line
    templateUrl: 'accordion-panels.demo.html',
    standalone: false
})
export class AccordionPanelsDemoComponent {

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
}
