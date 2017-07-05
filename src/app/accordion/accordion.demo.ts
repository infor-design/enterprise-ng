import { Component } from '@angular/core';

@Component({
  selector: 'accordion-demo', // tslint:disable-line
  templateUrl: './accordion.demo.html',
})
export class AccordionDemoComponent {
  onBeforeCollapse(args) {
    console.log('Collapsed!', args);
  }
  onBeforeExpand(args) {
    console.log('Expanded!', args);
  }
  onBeforeSelect(args) {
    console.log('Selected!', args);
  }
}
