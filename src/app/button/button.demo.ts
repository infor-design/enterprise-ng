import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'app-button-demo',
  templateUrl: 'button.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoComponent implements OnInit {
  public shouldSayHi = false;

  public notifOptions = {
    badge: true,
    badgeOptions: {
      position: 'upper-left',
      color: 'yield'
    }
  }
  
  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
