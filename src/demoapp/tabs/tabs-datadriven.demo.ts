
import {Component} from '@angular/core';

import {TabsComponent, TabsEvent} from '../../components';

@Component({
  selector: 'tabs-datadriven-demo',
  template: 'tabs-datadriven.demo.html',
  directives: [TabsComponent],
})
export class TabsDataDrivenSampleComponent {

  private tabs:Array<any> = [];

  ngOnInit() {
      this.tabs.push({id:'one',   title: 'One',   content: "Tab One Content"});
      this.tabs.push({id:'two',   title: 'Two',   content: "Tab Two Content"});
      this.tabs.push({id:'three', title: 'Three', content: "Tab Three Content"});
      this.tabs.push({id:'four',  title: 'Four',  content: "Tab Four Content"});
  }

  private onTabSelected(event:TabsEvent) {
      console.log("TabsDataDrivenSampleComponent.onTabSelected: " + JSON.stringify(event));
  }
}
