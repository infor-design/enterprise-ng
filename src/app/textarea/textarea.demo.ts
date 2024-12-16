import { Component, OnInit, ViewChild } from '@angular/core';

import { SohoTextAreaComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-textarea-demo',
    templateUrl: 'textarea.demo.html',
    styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
    ,
    standalone: false
})
export class TextareaDemoComponent implements OnInit {

  @ViewChild(SohoTextAreaComponent, { static: true }) textarea!: SohoTextAreaComponent;
  @ViewChild('toggleTextArea', { static: true }) toggleTextArea!: SohoTextAreaComponent;

  public model = { // eslint-disable-line
    resizableText: 'This text is resizable',
    requiredText: '',
    counterText: 'This text cannot exceed 90 chars',
    disableText: 'This text is disable',
    readonlyText: 'This text is readonly',
    modifiableText: 'This text is modifiable',
    /* eslint-disable */
    growableText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec rutrum hendrerit nunc sed mollis. Quisque pharetra venenatis aliquam. Nullam egestas cursus odio eget viverra. Phasellus nec ipsum tincidunt, tincidunt nunc dapibus, mattis neque. Nulla sodales faucibus orci vitae scelerisque. Pellentesque consequat vulputate ligula. Nam nec diam sit amet leo  fringilla viverra in eget augue. Suspendisse porttitor odio bibendum nulla tristique congue a eget justo. Fusce eu tristique congue`,
    /* eslint-enable */
    growableText2: `This text content cannot exceed 300px`,
    editableText: 'Parameters can be updated',
    toggleText: ''
  };
  public showModel = false;
  public toggleTextDisabled = false;
  public textAreaDisabled = false;
  public textAreaReadOnly = false;

  public characterCounter = true;
  public maxLength = 25;
  public charMaxText = this.getMaxText();
  public charRemainingText = this.getRemainingText();

  constructor() { }
  ngOnInit() { }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  toggleAccessibility() {
    this.toggleTextDisabled = !this.toggleTextDisabled;
    this.toggleTextArea.disabled = this.toggleTextDisabled;
  }

  setEnable() {
    this.textarea.disabled = false;
    this.textAreaDisabled = this.textarea.disabled;

    this.textarea.readonly = false;
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

  onTextChange() {
    console.log(`onTextChange()`);
    this.charRemainingText = this.getRemainingText();

  }

  changeText() {
    this.charRemainingText += '?';
    this.charMaxText += '!';
  }

  changeLength() {
    this.maxLength += 5;
    this.charMaxText = this.getMaxText();
    this.charRemainingText = this.getRemainingText();
  }

  toggleCounter() {
    this.characterCounter = !this.characterCounter;
  }

  private getRemainingText() {
    return `Remaining characters: ${this.maxLength - this.model.editableText.length}`;
  }

  private getMaxText() {
    return `Max limit reached! Max length is ${this.maxLength}`;
  }
}
