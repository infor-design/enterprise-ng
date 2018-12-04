import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { SohoAccordionComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'accordion-dynamic-demo', // tslint:disable-line
  templateUrl: './accordion-dynamic.demo.html',
})
export class AccordionDynamicDemoComponent implements AfterViewInit {

  public sampleData = [
    { header: 'Header 1', content: 'This is the content of header 1', expanded: false  },
    { header: 'Header 2', content: 'This is the content of header 2', expanded: true },
    { header: 'Header 3', content: 'This is the content of header 3', expanded: false },
    { header: 'Header 4', content: 'This is the content of header 3', expanded: false },
    { header: 'Header 5', content: 'This is the content of header 3', expanded: false }
  ];

  @ViewChild(SohoAccordionComponent) accordion: SohoAccordionComponent;

  ngAfterViewInit(): void {
    this.accordion.updated();
  }

  addMore() {
    this.sampleData.forEach((d) => { d.expanded = false; });
    const idx = this.sampleData.length + 1;
    this.sampleData.push({ header: 'Header ' + idx, content: 'I\'ve added some more header ' + idx, expanded: true });
    this.accordion.updated();
  }
}
