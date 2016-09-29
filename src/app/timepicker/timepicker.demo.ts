import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-timepicker-demo',
  templateUrl: 'timepicker.demo.html',
})
export class TimePickerDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    hhmm: '1:23 PM',
    HHmm24: ''
  };
  private showModel = false;

  constructor() { }
  ngOnInit() { }
  toggleModel() {
    this.showModel = !this.showModel;
  }
  onChange(event: Event) {
    console.log('TimepickerDemoComponent.onChange');
  }
}
