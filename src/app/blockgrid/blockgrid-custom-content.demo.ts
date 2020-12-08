import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';

// @ts-ignore
import { SohoBlockGridComponent } from 'ids-enterprise-ng';
import {
  DATA
} from './blockgrid-demo-data';

@Component({
  selector: 'app-blockgrid-custom-content-demo',
  templateUrl: 'blockgrid-custom-content.demo.html',
  styleUrls: ['./blockgrid-custom-content.demo.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridCustomContentDemoComponent implements AfterViewInit {

  @ViewChild(SohoBlockGridComponent, { static: true }) blockGrid?: SohoBlockGridComponent;

  public data = DATA;

  ngAfterViewInit() {
    this.blockGrid?.activateBlock(1);
    this.blockGrid?.selectBlocks([3, 4, 10]);
  }

  onSelected(args: any) {
    console.log('onSelected', args);
  }

  onDeselected(args: any) {
    console.log('onDeselect', args);
  }

  onActivated(args: any) {
    console.log('onActivated', args);
  }

  onDeactivated(args: any) {
    console.log('onDeactivated', args);
  }
}
