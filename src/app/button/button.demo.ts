import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild
} from '@angular/core';
import { SohoButtonComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-button-demo',
  templateUrl: 'button.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoComponent implements OnInit {
  public shouldSayHi = false;

  @ViewChild('primaryGenerative', { static: true }) primaryGenerative?: SohoButtonComponent;
  @ViewChild('tertiaryGenerative', { static: true }) tertiaryGenerative?: SohoButtonComponent;
  @ViewChild('iconGenerative', { static: true }) iconGenerative?: SohoButtonComponent;

  constructor() { }
  ngOnInit() { }
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }

  performAnimation() {
    this.primaryGenerative?.performAnimation(5000);
    this.tertiaryGenerative?.performAnimation(5000);
    this.iconGenerative?.performAnimation(5000);
  }

  startAnimation() {
    this.primaryGenerative?.startAnimation();
    this.tertiaryGenerative?.startAnimation();
    this.iconGenerative?.startAnimation();
  }

  stopAnimation() {
    this.primaryGenerative?.stopAnimation();
    this.tertiaryGenerative?.stopAnimation();
    this.iconGenerative?.stopAnimation();
  }
}
