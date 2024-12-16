import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { SohoSwapListComponent, SohoBusyIndicatorDirective } from 'ids-enterprise-ng';

import { SwapListDemoService } from './swaplist-demo.service';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
    selector: 'app-swaplist-service-demo',
    templateUrl: 'swaplist-service.demo.html',
    providers: [SwapListDemoService],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SwapListServiceDemoComponent implements OnInit, OnDestroy {
  @ViewChild(SohoSwapListComponent, { static: true }) swapListComponent!: SohoSwapListComponent;
  @ViewChild(SohoBusyIndicatorDirective, { static: true }) busyIndicator!: SohoBusyIndicatorDirective;

  showModel = false;
  available: SohoSwapListItem[] = [];
  selected: SohoSwapListItem[] = [];

  constructor(private service: SwapListDemoService, private sohoHeaderRef: HeaderDynamicDemoRefService) {
  }

  ngOnInit() {
    (this.sohoHeaderRef.instance as any).sectionTitle = 'SwapList Service Demo';
  }

  onSelected(_event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  onUpdated(_event: any) {
    console.log(this.swapListComponent.selectedItems);
  }

  updateData(_event: any) {
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
    (this.sohoHeaderRef.instance as any).sectionTitle = '';
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swapListComponent.selectedItems;
  }
}
