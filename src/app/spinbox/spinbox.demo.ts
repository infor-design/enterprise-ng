import { Component, ViewChild } from '@angular/core';
// @ts-ignore
import { SohoSpinboxComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-spinbox-demo',
  templateUrl: 'spinbox.demo.html'
})

export class SpinboxDemoComponent {
  @ViewChild('spinbox', { static: true }) spinbox?: SohoSpinboxComponent;

  public model = { // eslint-disable-line
    value1: '50'
  };
  public disabled = false;
  public id1 = 'regular-spinbox';
  public id2 = 'limited-spinbox';
  public id3 = 'dirty-spinbox';
  public id4 = 'ngmodel-spinbox';
  public id5 = 'stepped-spinbox';
  public id6 = 'error-spinbox';
  public val = 5;
  public showModel = false;

  constructor() {
  }

  setDisable() {
    this.disabled = (this.spinbox as any).disabled = true;
  }

  setEnable() {
    this.disabled = (this.spinbox as any).disabled = false;
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  update() {
    this.val = 46;
    if (!this.disabled) {
      (this.spinbox as any).value = 80;
    }
  }

}
