import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'soho-radiobutton-demo',
  templateUrl:'./radiobutton.demo.html'
})
export class RadioButtonDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    horizontal: '3',
    vertical: '1'
  };
  private showModel = false;
  private isDisabled: boolean;

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
