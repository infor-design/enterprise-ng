import {
  Component,
  OnInit
} from '@angular/core';

import {
  SohoCheckBoxComponent
} from '../../soho/checkbox';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: 'checkbox.demo.html',
})
export class CheckBoxDemoComponent {

  constructor() { }
  ngOnInit() { }

  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }
}
