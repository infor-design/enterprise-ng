import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';

// @ts-ignore
import { SohoColorPickerComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-colorpicker-demo',
    templateUrl: 'colorpicker.demo.html',
    standalone: false
})
export class ColorPickerDemoComponent implements OnInit, AfterViewInit {

  @ViewChild(SohoColorPickerComponent, { static: true }) colorpicker?: SohoColorPickerComponent;

  public model = {
    color: '#1a1a1a',
    label: 'Slate10',
    attributes: { name: 'id', value: 'background-color' }
  };

  public showModel?: any = false;
  public colorPickerDisabled?: any = false;
  public colorPickerReadOnly?: any = false;
  public colorPickerEditable?: any = true;
  public colorPickerClearable?: any = true;
  public showLabel?: any = false;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      this.colorPickerDisabled = this.colorpicker?.disabled;
      this.colorPickerEditable = this.colorpicker?.editable;
    }, 300);
  }
  ngOnInit() {}

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(_event: Event) {
    this.model = {
      color: this.colorpicker?.getHexValue(),
      label: this.colorpicker?.getLabelValue(),
      attributes: { name: 'id', value: 'background-color' }
    };
  }

  setStatus() {
    this.colorPickerDisabled = !this.colorPickerDisabled;
    (this.colorpicker as any).disabled = this.colorPickerDisabled;
  }

  setEditable() {
    this.colorPickerEditable = !this.colorPickerEditable;
    (this.colorpicker as any).editable = this.colorPickerEditable;
  }

  setReadonly() {
    this.colorPickerReadOnly = !this.colorPickerReadOnly;
    (this.colorpicker as any).readonly = this.colorPickerReadOnly;
  }

  setClearable() {
    this.colorPickerClearable = !this.colorPickerClearable;
    (this.colorpicker as any).clearable = this.colorPickerClearable;
  }

  changeCustomColors() {
    const newColors = Array<SohoColorOption>();
    newColors.push({label: 'Grape', value: '2578a9', number: '10'} as SohoColorOption);
    newColors.push({label: 'Blueberry', value: '2578A9', number: '08'});
    newColors.push({label: 'Banana', value: 'efa836', number: '09'});

    (this.colorpicker as any).customColors = true;
    (this.colorpicker as any).colors = newColors;

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

    (this.colorpicker as any).colors = newColors;
  }

  toggleLabel() {
    this.showLabel = !this.showLabel;
    (this.colorpicker as any).showLabel = this.showLabel;

    // Clear the value since we cant easily toggle
    // the label value on the fly with this setting
    this.model = {
      color: '',
      label: '',
      attributes: { name: 'id', value: 'background-color' }
    };
  }
}
