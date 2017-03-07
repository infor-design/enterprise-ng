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

  constructor() {
   /**
          this.allDemoItems.push({id: 1, value: 'opt-1', text: 'Option A'});
          this.allDemoItems.push({id: 2, value: 'opt-2', text: 'Option B'});
          this.allDemoItems.push({id: 3, value: 'opt-3', text: 'Option C'});
          this.allDemoItems.push({id: 4, value: 'opt-4', text: 'Option D'});
          this.allDemoItems.push({id: 5, value: 'opt-5', text: 'Option E', disabled: true});
          this.allDemoItems.push({id: 6, value: 'opt-6', text: 'Option F'});
          this.allDemoItems.push({id: 7, value: 'opt-7', text: 'Option G', selected: true});
          this.allDemoItems.push({id: 8, value: 'opt-8', text: 'Option H', selected: true});
          this.allDemoItems.push({id: 9, value: 'opt-9', text: 'Option I'});
    */  
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

          //this.swapListComponent.selected.subscribe(this.onSelected);
   }

  ngOnInit() {
  }

  onSelected(event: any) {
    console.log("onSelected begin: ");
    console.log(this.swapListComponent.selectedItems);
    console.log("onSelected end...");
  }

  onUpdated(event: any) {
    console.log("onUpdated begin: ");
    console.log(this.swapListComponent.selectedItems);
    console.log("onUpdated end...");
  }

  showModel = false;

  toggleModel() {
    this.showModel = !this.showModel;
  }

  get selectedItems(): any[] | Object | string {
    var results = [];
    var items = this.swapListComponent.selectedItems;
    for(var i=0; i < items.length; i++){
      console.log(items[i].id);
      results.push({id: items[i].id, value: items[i].value, text: items[i].text});
    }
    /**
    jQuery(this.swapListComponent.selectedItems).each(item => function(item) {
      console.log(item.id);
      results.push({id: item.id, value: item.value, text: item.text});
    });
    */
    return results;
  }
}
