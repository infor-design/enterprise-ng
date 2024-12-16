import {
    Component,
    OnInit,
    ViewChild
  } from '@angular/core';
import { SohoListViewComponent } from 'ids-enterprise-ng';
  
  // @ts-ignore
  @Component({
    selector: 'app-listview-context',
    templateUrl: 'listview-context.demo.html',
    standalone: false
})
  export class ListViewContextDemoComponent implements OnInit {
  
    @ViewChild(SohoListViewComponent, { static: true }) sohoListViewComponent?: SohoListViewComponent;

    listOffset = { x: 100, y: 30 }

    data1 = ['ONE', 'TWO', 'THREE'];
    data2 = ['Four', 'FIVE', 'SIX', 'SEVEN'];
    data = this.data1;
  
    ngOnInit() {
      (this.sohoListViewComponent as any).selectable = 'single';
    }

    changeToDataSet1() {
      this.data = this.data1;
    }
    changeToDataSet2() {
      this.data = this.data2;
    }
  }
  