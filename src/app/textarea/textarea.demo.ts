import { Component, OnInit , ViewChild} from '@angular/core';

import {
  SohoTextareaComponent
} from '../../components/textarea';

@Component({
  selector: 'soho-textarea-demo',
  templateUrl: 'textarea.demo.html',
  styles: [`pre{font-size: 15px}`] //set font size to be larger so pre tag content is more readable
})
export class TextareaDemoComponent implements OnInit {

  @ViewChild(SohoTextareaComponent) textarea: SohoTextareaComponent;

  private model = { // tslint:disable-line
    resizableText: 'This text is resizable',
    counterText: 'This text cannot exceed 90 chars',
    disableText: 'This text is disable',
    readonlyText: 'This text is readonly',
    modifiableText: 'This text is modifiable',
  };
  private showModel = false;
  private disable = false;
  private readonly = false;

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.textarea.setDisable = false;
    this.disable = this.textarea.getDisable;
    this.readonly = this.textarea.getReadonly;
  }

  setDisable() {
    this.textarea.setDisable = true;
    this.disable = this.textarea.getDisable;
  }

  setReadonly() {
    this.textarea.setReadonly = true;
    this.readonly = this.textarea.getReadonly;
  }
}
