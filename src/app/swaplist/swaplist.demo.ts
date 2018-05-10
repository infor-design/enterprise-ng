import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';

import { SohoSwapListComponent } from 'ids-enterprise-ng';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-swaplist-demo',
  templateUrl: './swaplist.demo.html',
})
export class SwapListDemoComponent implements OnInit, OnDestroy {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;

  allDemoItems: any[] = [];
  availableDemoItems: any[] = [];
  selectedDemoItems: any[] = [];

  showModel = false;
  validationResults = true;

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {
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
    this.sohoHeaderRef.instance.sectionTitle = 'SwapList Basic Demo';
  }

  onSelected(event) {
    // console.log(this.swapListComponent.selectedItems);
  }

  onBeforeswap(event) {
    if (event) {
      event.result = this.validationResults;

      if (!this.validationResults) {
        console.log('No swap, validation fail');
      }
    }
  }

  onUpdated(event: any) {
    console.log('Moved: ', event.moved);
    console.log('Selected Items: ', this.swapListComponent.selectedItems);
  }

  onValidationResultsSelected(event: SohoContextMenuEvent) {
    this.validationResults = this.getResults(event.args);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  ngOnDestroy() {
    this.sohoHeaderRef.instance.sectionTitle = '';
  }

  getResults(el) {
    return (el.attr('data-result') === 'true');
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swapListComponent.selectedItems;
  }
}
