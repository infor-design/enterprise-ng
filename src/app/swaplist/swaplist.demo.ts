import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoSwapListComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-swaplist-demo',
  templateUrl: './swaplist.demo.html',
})
export class SwapListDemoComponent implements OnInit {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;

  allDemoItems: any[] = [];
  availableDemoItems: any[] = [];
  selectedDemoItems: any[] = [];

  showModel = false;

  constructor() {
    this.availableDemoItems.push(
      {id: 1, value: 'opt-1', text: 'Option A'},
      {id: 2, value: 'opt-2', text: 'Option B'},
      {id: 3, value: 'opt-3', text: 'Option C'},
      {id: 5, value: 'opt-5', text: 'Option E', disabled: true},
      {id: 6, value: 'opt-6', text: 'Option F'},
      {id: 8, value: 'opt-8', text: 'Option H'},
      {id: 9, value: 'opt-9', text: 'Option I'});

    this.selectedDemoItems.push(
      {id: 4, value: 'opt-4', text: 'Option D'},
      {id: 7, value: 'opt-7', text: 'Option G'},
      {id: 11, value: 'opt-11', text: 'Option K'});
   }

  ngOnInit() {
  }

  onSelected(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  onUpdated(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swapListComponent.selectedItems;
  }
}
