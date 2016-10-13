import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: 'checkbox.demo.html',
})
export class CheckBoxDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    checkBox1Value: false,
    checkBox2Value: true,
    checkBox3Value: false,
    checkBox4Value: true,
    checkBox5Value: true,
  };

  id1: string = 'checkbox1';
  id2: string = 'checkbox2';
  id3: string = 'checkbox3';
  id4: string = 'checkbox4';
  id5: string = 'checkbox5';

  constructor() { }
  ngOnInit() { }

  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }
}
