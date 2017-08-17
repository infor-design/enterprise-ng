import { Component, ViewChild } from '@angular/core';
import { SohoSpinboxComponent } from '../../soho/spinbox';

@Component({
  selector: 'soho-spinbox-demo',
  templateUrl: './spinbox.demo.html'
})

export class SpinboxDemoComponent {
  @ViewChild('spinbox') spinbox: SohoSpinboxComponent;

  public model = { // tslint:disable-line
    value1: '10'
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
    this.disabled = this.spinbox.disabled = true;
  }

  setEnable() {
    this.disabled = this.spinbox.disabled = false;
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  update() {
    this.val = 46;
    if (!this.disabled) {
      this.spinbox.value = 80;
    }
  }

}
