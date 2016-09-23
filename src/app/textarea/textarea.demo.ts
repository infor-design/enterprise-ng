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
  private textAreaDisabled = false;
  private textAreaReadOnly = false;

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.textarea.disabled = false;
    this.textAreaDisabled = this.textarea.disabled;
    this.textAreaReadOnly = this.textarea.readonly;
  }

  setDisable() {
    this.textarea.disabled = true;
    this.textAreaDisabled = this.textarea.disabled;
  }

  setReadonly() {
    this.textarea.readonly = true;
    this.textAreaReadOnly = this.textarea.readonly;
  }
}
