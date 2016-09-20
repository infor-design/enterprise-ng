import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'soho-datepicker-demo',
  templateUrl: 'datepicker.demo.html',
})
export class DatepickerDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    standard: '12/12/2016',
    anniversary: '',
    birthday: '',
    year: '',
    datetime: ''
  };
  private showModel = false;

  constructor() { }
  ngOnInit() { }
  toggleModel() {
    this.showModel = !this.showModel;
  }
  onChange(event: Event) {
    console.log('DatepickerDemoComponent.onChange');
  }
}
