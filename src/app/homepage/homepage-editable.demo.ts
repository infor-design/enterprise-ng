import { Component } from '@angular/core';
// @ts-ignore
import { SohoToastService, SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-homepage-editable-demo',
  templateUrl: 'homepage-editable.demo.html',
})
export class HomePageEditableDemoComponent {
  isEditingMode = false;

  constructor(private toastService: SohoToastService, private messageService: SohoMessageService) { }

  onToggleEditingMode() {
    this.isEditingMode = !this.isEditingMode;
  }

  onResizeCard(event: SohoHomePageEditEvent & SohoHomePageWidgetEditEvent) {
    this.toastService.show({ draggable: true, title: `${event.widget ? 'Widget' : 'Homepage'}`, message: `A widget has been resized` });
    console.log(event);
  }

  onReorderCard(event: SohoHomePageEditEvent & SohoHomePageWidgetEditEvent) {
    this.toastService.show({ draggable: true, title: `${event.widget ? 'Widget' : 'Homepage'}`, message: `A widget has been reordered` });
    console.log(event);
  }

  // Use arrow function for proper resolution of this in the callback
  public onBeforeRemoveCard = (_event: any) => {
    const result = new Promise((resolve, reject) => {
      const buttons = [
        {
          text: 'Cancel', click: (_e: any, modal: any) => {
            modal.close(true);
            this.toastService.show({
              draggable: true, title: 'Widget Remove Cancelled', message: 'The user cancelled the remove operation.'
            });
            reject();
          }, isDefault: true
        },
        {
          text: 'Remove', click: (_e: any, modal: any) => {
            modal.close(true);
            resolve();
          }
        }];

      this.messageService
        .confirm()
        .title('Confirm Remove')
        .message('Are you sure you want to remove this widget?')
        .buttons(buttons)
        .open();
    });
    return result;
  }

  onRemoveCard(event: SohoHomePageEditEvent & SohoHomePageWidgetEditEvent) {
    this.toastService.show({ draggable: true, title: `${event.widget ? 'Widget' : 'Homepage'}`, message: `A widget has been removed` });
    console.log(event);
  }
}
