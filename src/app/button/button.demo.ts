import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-button-demo',
  templateUrl: './button.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoComponent implements OnInit {
  public shouldSayHi = false;

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {
    sohoHeaderRef.instance.pageTitle = 'Buttons';
  }
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
