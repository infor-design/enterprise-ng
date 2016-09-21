import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'soho-textarea-demo',
  templateUrl: 'textarea.demo.html',
  styles: [`pre{font-size: 15px}`]
})
export class TextareaDemoComponent implements OnInit {

  private model = { // tslint:disable-line
    resizable: 'This text is resizable',
    counter: 'This text cannot exceed 90 chars',
    disable: 'This text is disable',
    readonly: 'This text is readonly',
    modifiable: 'This text is modifiable',
  };
  private showModel = false;

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

}
