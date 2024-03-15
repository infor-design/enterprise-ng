import { Component } from '@angular/core';
import { SohoToastService } from 'ids-enterprise-ng';

/**
 * This example:
 * - Shows how to make a simple tab component with an angular template.
 */
@Component({
  selector: 'app-tabs-basic-demo',
  templateUrl: 'tabs-basic.demo.html',
})
export class TabsBasicDemoComponent {
  constructor(private toastService: SohoToastService) { }

  private title: any = '';
  private message: any = '';

  showToast(type: any, anchorId: any, anchorName: any, isVeto: boolean = false, position: SohoToastPosition = SohoToastService.TOP_RIGHT,) {
    this.message = 'The "<b>' + anchorName + '</b>" tab was clicked or triggered!';
    this.title = 'tab <span style="color:#aa1111; font-weight: bold;">' + anchorId + '</span> [' + type + '] triggered!';
    if (isVeto) {
      this.message = 'The "<b>' + anchorName + '</b>" tab was blocked!';
      this.title = 'tab <span style="color:#aa1111; font-weight: bold;">' + anchorId + '</span> [' + type + '] blocked!';
    }

    this.toastService.show({ title: this.title, message: this.message, position });
  }

  onBeforeTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onBeforeTabActivated');
    if (event.tab.innerText === 'Opportunities' || event.tab.innerText === 'Notes') {
      this.showToast(event.type, event.tab.attributes[3].value, event.tab.innerText, true);
      event.result = false;
      return false;
    }

    this.showToast(event.type, event.tab.attributes[3].value, event.tab.innerText);
  }

  onTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
    this.showToast(event.type, event.tab.attributes[3].value, event.tab.innerText);
  }

  onAfterTabActivated(event: any) {
    console.log(event.tab + ' TabsBasicDemoComponent.onAfterTabActivated');
    this.showToast(event.type, event.tab.attributes[3].value, event.tab.innerText);
  }
}
