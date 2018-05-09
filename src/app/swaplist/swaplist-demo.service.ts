import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { SohoSwapListService } from '../../soho/swaplist';

@Injectable()
export class SwapListDemoService extends SohoSwapListService {
  private options: SohoSwapListOptions = {};
  private availableDemoItems: SohoSwapListItem[] = [];
  private selectedDemoItems: SohoSwapListItem[] = [];
  private additionalDemoItems: SohoSwapListItem[] = [];

  getData(): Observable<SohoSwapListOptions> {
    console.log(this.options.available);
    return of(this.options);
  }

  constructor() {
    super();
    this.init();
  }

  init() {
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

    this.additionalDemoItems.push(
      { id: 10, value: 'opt-10', text: 'Option J' },
      { id: 12, value: 'opt-12', text: 'Option L' },
      { id: 13, value: 'opt-13', text: 'Option M' },
      { id: 14, value: 'opt-14', text: 'Option N' });

    this.options.available = this.availableDemoItems;
    this.options.selected = this.selectedDemoItems;
    this.options.additional = this.additionalDemoItems;
  }
}
