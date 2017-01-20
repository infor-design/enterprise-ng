import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: './checkbox.demo.html',
})
export class CheckBoxDemoComponent implements OnInit {

  public model = {
    checkBox1Value: false,
    checkBox2Value: true,
    checkBox3Value: false,
    checkBox4Value: true,
    checkBox5Value: true,
  };

  public id1: string = 'checkbox1';
  public id2: string = 'checkbox2';
  public id3: string = 'checkbox3';
  public id4: string = 'checkbox4';
  public id5: string = 'checkbox5';

  public checkBoxDisabled = false;
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
