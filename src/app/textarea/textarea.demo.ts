import { Component, OnInit , ViewChild} from '@angular/core';

import {
  SohoTextAreaComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'app-textarea-demo',
  templateUrl: 'textarea.demo.html',
  styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
})
export class TextareaDemoComponent implements OnInit {

  @ViewChild(SohoTextAreaComponent, { static: true }) textarea: SohoTextAreaComponent;

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
    growableText2: `This text content cannot exceed 300px`
  };
  public showModel = false;
  public textAreaDisabled = false;
  public textAreaReadOnly = false;

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

  onTextChange() {
    console.log(`onTextChange()`);
  }
}
