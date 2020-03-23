import { Component } from '@angular/core';

import { SohoToastService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-homepage-editable-demo',
  templateUrl: 'homepage-editable.demo.html',
})
export class HomePageEditableDemoComponent {
  isEditingMode = false;

  constructor(private toastService: SohoToastService) { }

  onToggleEditingMode() {
    this.isEditingMode = !this.isEditingMode;
  }

  onResizeCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Resized', message: 'A widget has been resized' });
    console.log(event);
  }

  onReorderCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Reordered', message: 'A widget has been moved' });
    console.log(event);
  }

  onRemoveCard(event) {
    this.toastService.show({ draggable: true, title: 'Widget Removed', message: 'A widget has been removed' });
    console.log(event);
  }
}
