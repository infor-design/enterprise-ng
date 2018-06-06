import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SohoColorPickerComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'soho-colorpicker-demo',
  templateUrl: './colorpicker.demo.html',
})
export class ColorPickerDemoComponent implements OnInit {

  @ViewChild(SohoColorPickerComponent) colorpicker: SohoColorPickerComponent;

  public model = { // tslint:disable-line
    color: '#1a1a1a',
    label: 'Slate10'
  };
  public showModel = false;
  public colorPickerDisabled = false;
  public colorPickerReadOnly = false;
  public colorPickerEditable = true;
  public colorPickerClearable = true;
  public showLabel = false;

  constructor() { }

  ngOnInit() {}

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: Event) {
    this.model = {
      color: this.colorpicker.getHexValue(),
      label: this.colorpicker.getLabelValue()
    };
  }

  setEnable() {
    this.colorpicker.disabled = false;
    this.colorPickerDisabled = this.colorpicker.disabled;
    this.colorPickerReadOnly = this.colorpicker.readonly;
  }

  setEditable() {
    this.colorPickerEditable = !this.colorPickerEditable;
    this.colorpicker.editable = this.colorPickerEditable;
  }

  setDisable() {
    this.colorpicker.disabled = true;
    this.colorPickerDisabled = this.colorpicker.disabled;
  }

  setReadonly() {
    this.colorpicker.readonly = true;
    this.colorPickerReadOnly = this.colorpicker.readonly;
  }

  setClearable() {
    this.colorPickerClearable = !this.colorPickerClearable;
    this.colorpicker.clearable = this.colorPickerClearable;
  }

  changeColors() {
    const newColors = Array<SohoColorOption>();
    newColors.push({label: 'Slate', number: '10', value: '1a1a1a'} as SohoColorOption);
    newColors.push({label: 'Slate', number: '09', value: '292929'});
    newColors.push({label: 'Slate', number: '08', value: '383838', border: 'dark'});
    newColors.push({label: 'Slate', number: '07', value: '454545', border: 'dark'});
    newColors.push({label: 'Slate', number: '06', value: '5C5C5C'});
    newColors.push({label: 'Slate', number: '05', value: '737373'});
    newColors.push({label: 'Slate', number: '04', value: '999999'});
    newColors.push({label: 'Slate', number: '03', value: 'BDBDBD'});
    newColors.push({label: 'Slate', number: '02', value: 'D8D8D8'});
    newColors.push({label: 'Slate', number: '01', value: 'F0F0F0', border: 'light, high-contrast'});

    this.colorpicker.colors = newColors;
  }

  toggleLabel() {
    this.showLabel = !this.showLabel;
    this.colorpicker.showLabel = this.showLabel;

    // Clear the value since we cant easily toggle
    // the label value on the fly with this setting
    this.model = {
      color: '',
      label: ''
    };
  }
}
