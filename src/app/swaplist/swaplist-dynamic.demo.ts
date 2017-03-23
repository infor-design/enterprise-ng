import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
    SohoSwapListComponent,
    SohoBusyIndicatorDirective
} from '@infor/sohoxi-angular';

import { SwapListDemoService } from './swaplist-demo.service';

@Component({
  selector: 'soho-swaplist-dynamic-demo',
  templateUrl: './swaplist-dynamic.demo.html',
  providers: [SwapListDemoService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SwapListDynamicDemoComponent implements OnInit {
  @ViewChild(SohoSwapListComponent) swapListComponent: SohoSwapListComponent;
  @ViewChild(SohoBusyIndicatorDirective) busyIndicator: SohoBusyIndicatorDirective;

  showModel = false;

  constructor(private el: ElementRef, private service: SwapListDemoService) {
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
      this.service.getData().subscribe((d: SohoSwapListOptions) => {
        this.busyIndicator.open();
        this.swapListComponent.updateDataset(d);
        this.busyIndicator.close(true);
        //setTimeout(() => this.updateData(event), 2000);
    });
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swapListComponent.selectedItems;
  }
}
