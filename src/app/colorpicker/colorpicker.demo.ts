import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  SohoColorPickerComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'app-colorpicker-demo',
  templateUrl: 'colorpicker.demo.html',
})
export class ColorPickerDemoComponent implements OnInit, AfterViewInit {

  @ViewChild(SohoColorPickerComponent, { static: true }) colorpicker: SohoColorPickerComponent;

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

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.colorPickerDisabled = this.colorpicker.disabled;
      this.colorPickerEditable = this.colorpicker.editable;
    }, 300);
  }
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

  setStatus() {
    this.colorPickerDisabled = !this.colorPickerDisabled;
    this.colorpicker.disabled = this.colorPickerDisabled;
  }

  setEditable() {
    this.colorPickerEditable = !this.colorPickerEditable;
    this.colorpicker.editable = this.colorPickerEditable;
  }

  setReadonly() {
    this.colorPickerReadOnly = !this.colorPickerReadOnly;
    this.colorpicker.readonly = this.colorPickerReadOnly;
  }

  setClearable() {
    this.colorPickerClearable = !this.colorPickerClearable;
    this.colorpicker.clearable = this.colorPickerClearable;
  }

  changeCustomColors() {
    const newColors = Array<SohoColorOption>();
    newColors.push({label: 'Grape', value: '2578a9', number: '10'} as SohoColorOption);
    newColors.push({label: 'Blueberry', value: '2578A9', number: '08'});
    newColors.push({label: 'Banana', value: 'efa836', number: '09'});

    this.colorpicker.customColors = true;
    this.colorpicker.colors = newColors;

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
