import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild
} from '@angular/core';

import { Observable ,  BehaviorSubject } from 'rxjs';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

import {
    SohoSwapListComponent
} from 'ids-enterprise-ng';

@Component({
    selector: 'soho-swaplist-dynamic-demo',
    templateUrl: './swaplist-dynamic.demo.html',
})
export class SwapListDynamicDemoComponent implements OnInit, OnDestroy {
    @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;

    private _subject1$ = new BehaviorSubject([]);
    public available = this._subject1$.asObservable();

    private _subject2$ = new BehaviorSubject([]);
    public selected = this._subject2$.asObservable();

    availableDemoItems: SohoSwapListItem[] = [];
    selectedDemoItems: SohoSwapListItem[] = [];

    showModel = false;

    constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {
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
      this.sohoHeaderRef.instance.sectionTitle = 'SwapList Dynamic Demo';
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

    ngOnDestroy() {
      this.sohoHeaderRef.instance.sectionTitle = '';
    }

    get selectedItems(): SohoSwapListItem[] {
        return this.swapListComponent.selectedItems;
    }
}
