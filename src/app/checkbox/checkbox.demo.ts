import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: './checkbox.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckBoxDemoComponent implements OnInit {
  showModel = false;

  public model = {
    checkBox1Value: false,
    checkBox2Value: true,
    checkBox3Value: false,
    checkBox4Value: true,
    checkBox5Value: true,
  };

  public id1 = 'checkbox1';
  public id2 = 'checkbox2';
  public id3 = 'checkbox3';
  public id4 = 'checkbox4';
  public id5 = 'checkbox5';

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

  toggleModel() {
    this.showModel = !this.showModel;
  }
}
