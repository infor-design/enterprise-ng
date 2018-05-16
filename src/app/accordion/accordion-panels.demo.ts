import { Component, ViewChild } from '@angular/core';
import { SohoAccordionComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'accordion-panels-demo', // tslint:disable-line
  templateUrl: './accordion-panels.demo.html',
})
export class AccordionPanelsDemoComponent {

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
}
