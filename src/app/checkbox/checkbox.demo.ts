import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl:'./checkbox.demo.html',
})
export class CheckBoxDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    checkBox1Value: false,
    checkBox2Value: true,
    checkBox3Value: false,
    checkBox4Value: true,
    checkBox5Value: true,
  };

  private id1: string = 'checkbox1'; // tslint:disable-line
  private id2: string = 'checkbox2'; // tslint:disable-line
  private id3: string = 'checkbox3'; // tslint:disable-line
  private id4: string = 'checkbox4'; // tslint:disable-line
  private id5: string = 'checkbox5'; // tslint:disable-line

  private checkBoxDisabled = false;
  constructor() { }
  ngOnInit() { }

  setDisable() {
    this.checkBoxDisabled = true;
  }

  setEnable() {
    this.checkBoxDisabled = false;
  }

  setCheck() {
    this.model.checkBox1Value = true;
  }

  setUncheck() {
    this.model.checkBox1Value = false;
  }

  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }
}
