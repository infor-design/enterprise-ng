import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-radiobutton-demo',
  templateUrl: './radiobutton.demo.html'
})
export class RadioButtonDemoComponent implements OnInit {

  public model = { // tslint:disable-line
    horizontal: '3',
    vertical: '1'
  };
  public showModel = false;
  public isDisabled: boolean;

  ngOnInit() {
    this.isDisabled = true;
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: Event) {
    console.log('RadioButtonDemoComponent.onChange');
  }
}
