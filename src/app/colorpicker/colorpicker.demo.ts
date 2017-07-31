import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoColorPickerComponent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-colorpicker-demo',
  templateUrl: './colorpicker.demo.html',
})
export class ColorPickerDemoComponent implements OnInit {

  @ViewChild(SohoColorPickerComponent) colorpicker: SohoColorPickerComponent;

  public model = { // tslint:disable-line
    color: '#900000'
  };
  public showModel = false;
  public colorPickerDisabled = false;
  public colorPickerReadOnly = false;

  constructor() { }

  ngOnInit() {}

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: Event) {
    console.log('ColorPickerDemoComponent.onChange');
  }

  setEnable() {
    this.colorpicker.disabled = false;
    this.colorPickerDisabled = this.colorpicker.disabled;
    this.colorPickerReadOnly = this.colorpicker.readonly;
  }

  setDisable() {
    this.colorpicker.disabled = true;
    this.colorPickerDisabled = this.colorpicker.disabled;
  }

  setReadonly() {
    this.colorpicker.readonly = true;
    this.colorPickerReadOnly = this.colorpicker.readonly;
  }
}
