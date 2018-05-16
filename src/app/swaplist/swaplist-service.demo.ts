import {
  Component,
  ElementRef,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  Observable,
  BehaviorSubject
} from 'rxjs';

import {
  SohoSwapListComponent,
  SohoBusyIndicatorDirective
} from 'ids-enterprise-ng';

import { SwapListDemoService } from './swaplist-demo.service';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-swaplist-service-demo',
  templateUrl: './swaplist-service.demo.html',
  providers: [SwapListDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwapListServiceDemoComponent implements OnInit, OnDestroy {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  showModel = false;
  available: SohoSwapListItem[] = [];
  selected: SohoSwapListItem[] = [];

  constructor(private el: ElementRef, private service: SwapListDemoService, private sohoHeaderRef: HeaderDynamicDemoRefService) {
  }

  ngOnInit() {
    this.sohoHeaderRef.instance.sectionTitle = 'SwapList Service Demo';
  }

  onSelected(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  onUpdated(event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  updateData(event: any) {
    this.service.getData().subscribe((d: SohoSwapListOptions) => {
      this.busyIndicator.open();
      this.swapListComponent.updateDataset(d);
      this.busyIndicator.close(true);
    });
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
