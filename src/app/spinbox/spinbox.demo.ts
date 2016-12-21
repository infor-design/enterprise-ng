import {Component, ViewChild } from '@angular/core';
import { SohoSpinboxComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-spinbox-demo',
  templateUrl:'./spinbox.demo.html'
})

export class SpinboxDemoComponent {
  @ViewChild(SohoSpinboxComponent) spinbox: SohoSpinboxComponent;

  private disabled: boolean = false;
  private id1: string= 'regular-spinbox';
  private id2: string= 'limited-spinbox';
  private id3: string= 'dirty-spinbox';
  private id4: string= 'disabled-spinbox';
  private id5: string= 'stepped-spinbox';
  private id6: string= 'error-spinbox';
  private val: number= 5;

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
