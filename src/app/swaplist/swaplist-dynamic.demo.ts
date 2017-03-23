import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  SohoSwapListComponent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-swaplist-dynamic-demo',
  templateUrl: './swaplist-dynamic.demo.html',
})
export class SwapListDynamicDemoComponent implements OnInit {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;

  private _subject1$ = new BehaviorSubject([]);
  public available = this._subject1$.asObservable();

  private _subject2$ = new BehaviorSubject([]);
  public selected = this._subject2$.asObservable();

  availableDemoItems: SohoSwapListItem[] = [];
  selectedDemoItems: SohoSwapListItem[] = [];

  showModel = false;

  constructor() {
    this.availableDemoItems.push(
      { id: 1, value: 'opt-1', text: 'Option A' },
      { id: 2, value: 'opt-2', text: 'Option B' },
      { id: 3, value: 'opt-3', text: 'Option C' },
      { id: 5, value: 'opt-5', text: 'Option E', disabled: true },
      { id: 6, value: 'opt-6', text: 'Option F' },
      { id: 8, value: 'opt-8', text: 'Option H' },
      { id: 9, value: 'opt-9', text: 'Option I' });

    this.selectedDemoItems.push(
      { id: 4, value: 'opt-4', text: 'Option D' },
      { id: 7, value: 'opt-7', text: 'Option G' },
      { id: 11, value: 'opt-11', text: 'Option K' });
  }

  ngOnInit() {
  }

  onSelected(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  onUpdated(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  updateData(event: any) {
    this._subject1$.next(this.availableDemoItems);
    this._subject2$.next(this.selectedDemoItems);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swapListComponent.selectedItems;
  }
}
