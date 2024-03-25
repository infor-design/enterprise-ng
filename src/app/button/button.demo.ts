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

  performGenerativeAction() {
    this.primaryGenerative?.performGenerativeAction(5000);
    this.tertiaryGenerative?.performGenerativeAction(5000);
    this.iconGenerative?.performGenerativeAction(5000);
  }
}
