import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoSwapListComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-swaplist-three-demo',
  templateUrl: './swaplist-one-third.demo.html',
})
export class SwapListOneThirdDemoComponent implements OnInit {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;

  allDemoItems: any[] = [];
  availableDemoItems: any[] = [];
  selectedDemoItems: any[] = [];
  addtionalDemoItems: any[] = [];
  showModel = false;

  constructor() {

    this.availableDemoItems.push({id: 1, value: 'opt-1', text: 'Option A'});
    this.availableDemoItems.push({id: 2, value: 'opt-2', text: 'Option B'});
    this.availableDemoItems.push({id: 3, value: 'opt-3', text: 'Option C'});
    this.availableDemoItems.push({id: 5, value: 'opt-5', text: 'Option E', disabled: true});
    this.availableDemoItems.push({id: 6, value: 'opt-6', text: 'Option F'});
    this.availableDemoItems.push({id: 8, value: 'opt-8', text: 'Option H'});
    this.availableDemoItems.push({id: 9, value: 'opt-9', text: 'Option I'});

    this.selectedDemoItems.push({id: 4, value: 'opt-4', text: 'Option D'});
    this.selectedDemoItems.push({id: 7, value: 'opt-7', text: 'Option G'});
    this.selectedDemoItems.push({id: 11, value: 'opt-11', text: 'Option K'});

    this.addtionalDemoItems.push({id: 10, value: 'opt-10', text: 'Option J'});
    this.addtionalDemoItems.push({id: 12, value: 'opt-12', text: 'Option L'});
    this.addtionalDemoItems.push({id: 13, value: 'opt-13', text: 'Option M'});
    this.addtionalDemoItems.push({id: 14, value: 'opt-14', text: 'Option N'});
   }

  ngOnInit() {
  }

  onSelected(event: any) {
    console.log('onSelected begin: ');
    console.log(this.swapListComponent.selectedItems);
    console.log('onSelected end...');
  }

  onUpdated(event: any) {
    console.log('onUpdated begin: ');
    console.log(this.swapListComponent.selectedItems);
    console.log('onUpdated end...');
  }


  toggleModel() {
    this.showModel = !this.showModel;
  }

  get selectedItems(): any[] | Object | string {
    const results = [];
    const items = this.swapListComponent.selectedItems;
    for(let i = 0; i < items.length; i++){
      console.log(items[i].id);
      results.push({id: items[i].id, value: items[i].value, text: items[i].text});
    }
    return results;
  }

   get additionalItems(): any[] | Object | string {
    const results = [];
    const items = this.swapListComponent.additionalItems;
    for (let i = 0; i < items.length; i++){
      console.log(items[i].id);
      results.push({id: items[i].id, value: items[i].value, text: items[i].text});
    }
    return results;
  }
}
