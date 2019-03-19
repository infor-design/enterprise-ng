import {
  Component,
  ViewChild,
  QueryList,
  ContentChildren,
  forwardRef
} from '@angular/core';

import {
  SohoAccordionHeaderComponent,
  SohoAccordionComponent,
  SohoAccordionPaneComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'accordion-dynamic-demo', // tslint:disable-line
  templateUrl: './accordion-dynamic.demo.html',
})
export class AccordionDynamicDemoComponent {

  // tslint:disable-next-line:no-forward-ref
  @ContentChildren(forwardRef(() => SohoAccordionHeaderComponent))
  headers: QueryList<SohoAccordionHeaderComponent>;

  // tslint:disable-next-line:no-forward-ref
  @ContentChildren(forwardRef(() => SohoAccordionPaneComponent))
  panes: QueryList<SohoAccordionPaneComponent>;

  public sampleData = [
    { id: 1, header: 'Header 1', content: 'This is the content of header 1', expanded: false  },
    { id: 2, header: 'Header 2', content: 'This is the content of header 2', expanded: true }
  ];

  public allowOnePane = true;

  @ViewChild(SohoAccordionComponent) accordion: SohoAccordionComponent;

  public addMore() {
    this.sampleData.forEach((d) => { d.expanded = false; });
    const idx = this.sampleData.length + 1;
    this.sampleData.push({ id: idx, header: 'Header ' + idx, content: 'I\'ve added some more header ' + idx, expanded: true });

    // The updates must be called after the add has ocurred to allow for the view to be updated view, otherwise
    // the widget does not see the changes.  Consider changing the
    setTimeout(() => {
      this.accordion.updated();
    });
  }

  public toggleAllowOnePane(): void {
    this.allowOnePane = !this.allowOnePane;

    // If only one pane is allowed, then collapse them.
    if (this.allowOnePane) {
      let collapse = false;
      this.sampleData.forEach((d) => {
        if (d.expanded && !collapse) {
          collapse = true;
        } else {
          d.expanded = false;
        }
      });
    }

    setTimeout(() => { this.accordion.updated(); });
  }

  public onExpand(event: SohoAccordionEvent) {
    const header = this.sampleData.find((h) => `${h.id}` === event.anchor[0].parentElement.id);

    if (header) {
      this.headers.forEach((h) => this.accordion.collapse(h));

      // this.accordion.collapse(header)
      header.expanded = true;
    }
  }

  public onCollapse(event: SohoAccordionEvent) {
    const header = this.sampleData.find((h) => `${h.id}` === event.anchor[0].parentElement.id);

    if (header) {
      header.expanded = false;
    }

  }

}
