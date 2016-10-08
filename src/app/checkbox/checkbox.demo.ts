import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: 'checkbox.demo.html',
})
export class CheckBoxDemoComponent implements OnInit {

  constructor() { }
  ngOnInit() { }

  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }
}
