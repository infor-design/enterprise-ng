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
    badge: true,
    badgeOptions: {
      position: 'upper-left',
      color: 'alert'
    }
  }

  public badgeOption2: SohoButtonOptions = {
    badge: true,
    badgeOptions: {
      position: 'lower-left',
      color: 'yield'
    }
  }

  public badgeOption3: SohoButtonOptions = {
    badge: true,
    badgeOptions: {
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
