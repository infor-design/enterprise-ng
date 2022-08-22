import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { SohoButtonComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-button-badge-demo',
  templateUrl: 'button-badge.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonBadgeDemoComponent implements OnInit {

  @ViewChild('togglebutton', { static: true }) buttonDemo?: SohoButtonComponent;
  public buttonToggle = true;

  public badgeOption1: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'upper-left',
      color: 'complete'
    }
  }

  public badgeOption2: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'upper-right',
      color: 'alert'
    }
  }

  public badgeOption3: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'lower-left',
      color: 'progress'
    }
  }

  public badgeOption4: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'upper-right',
      color: 'warning'
    }
  }

  public badgeOption5: SohoButtonOptions = {
    notificationBadge: true,
    notificationBadgeOptions: {
      position: 'upper-left',
      color: 'warning'
    }
  }

  constructor() { }
  ngOnInit() { }

  toggleOn() {
    this.buttonToggle = true;
    this.badgeOption5.notificationBadge = this.buttonToggle;
    this.buttonDemo?.updated(this.badgeOption5);
  }

  toggleOff() {
    this.buttonToggle = false;
    this.badgeOption5.notificationBadge = this.buttonToggle;
    this.buttonDemo?.updated(this.badgeOption5);
  }
}
