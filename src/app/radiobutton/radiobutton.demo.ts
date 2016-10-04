import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'soho-radiobutton-demo',
  templateUrl: 'radiobutton.demo.html'
})
export class RadioButtonDemoComponent implements OnInit {
  private isDisabled: boolean;

  ngOnInit() {
    this.isDisabled = true;
  }
}
