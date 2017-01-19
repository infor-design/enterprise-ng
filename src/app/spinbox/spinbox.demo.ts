import { Component, ViewChild } from '@angular/core';
import { SohoSpinboxComponent } from '../../soho/spinbox';

@Component({
  selector: 'soho-spinbox-demo',
  templateUrl: './spinbox.demo.html'
})

export class SpinboxDemoComponent {
  @ViewChild(SohoSpinboxComponent) spinbox: SohoSpinboxComponent;

  public disabled: boolean = false;
  public id1: string= 'regular-spinbox';
  public id2: string= 'limited-spinbox';
  public id3: string= 'dirty-spinbox';
  public id4: string= 'disabled-spinbox';
  public id5: string= 'stepped-spinbox';
  public id6: string= 'error-spinbox';
  public val: number= 5;

  constructor() { }

  setDisable() {
    this.disabled = this.spinbox.disabled = true;
  }

  setEnable() {
    this.disabled = this.spinbox.disabled = false;
  }

  update() {
    this.val = 46;
    if (!this.disabled) {
      this.spinbox.updateValue = this.val;
    }
  }

}
