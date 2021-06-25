import {
  Component,
  HostBinding,
  OnInit,
  ViewChild
} from '@angular/core';

//@ts-ignore
import { SohoMonthViewComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-monthview-demo',
  templateUrl: 'monthview.demo.html',
})
export class MonthViewDemoComponent implements OnInit {

  @ViewChild(SohoMonthViewComponent) sohoMonthViewComponent?: SohoMonthViewComponent;

  public initialMonth = 1;
  public initialYear = 2021;

  ngOnInit() { }
}
