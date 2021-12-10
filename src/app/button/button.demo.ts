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
  
  public badgeOption1: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'upper-left',
      color: 'alert'
    }
  }

  public badgeOption2: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'lower-left',
      color: 'yield'
    }
  }

  public badgeOption3: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'lower-right',
      color: 'complete'
    }
  }
  
  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
