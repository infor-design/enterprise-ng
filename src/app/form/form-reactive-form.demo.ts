import {
  Component,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';

import { MOCK_STATES } from '../dropdown/dropdown-mock.data';
import { productsColumns, productsData } from '../lookup/mock.data';

@Component({
  selector: 'app-reactive-form-demo',
  templateUrl: 'form-reactive-form.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormReactiveFormDemoComponent implements AfterViewInit {

  public model = {
    textAreaValue: 'Hello World',
    radiobuttonValue: '4',
    editorValue: '',
    autocompleteValue: '',
    autocompleteUrl: 'http://localhost:4200/app/demodata/states.demo.json?term=',
    inputValue: 'Hello World!',
    datevalue: '',
    timevalue: '',
    dropdownvValue: 'ND',
    colorpickValue: '',
    sliderValue: 1,
    checkedValue: true,
    lookupValue: '',
    spinbox: 0
  };

  form: void;
  demoForm: FormGroup;
  public options = MOCK_STATES;

  public lookupColumns = productsColumns;

  public lookupData = productsData;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, sanitizer: DomSanitizer) {
    // tslint:disable-next-line:max-line-length
    this.model.editorValue = `<a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`;
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      input: [this.model.inputValue],
      datepick: [this.model.datevalue],
      timepick: [this.model.timevalue],
      dropdown: [this.model.dropdownvValue],
      colorpick: [this.model.colorpickValue],
      checkbox: [this.model.checkedValue],
      autocomplete: [this.model.autocompleteValue],
      slider: [this.model.sliderValue],
      lookup: [this.model.lookupValue],
      editor: [this.model.editorValue],
      radiobutton: [this.model.radiobuttonValue],
      textarea: [this.model.textAreaValue],
      spinbox: [this.model.spinbox]
    });

    this.demoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  toggleDisableForm() {
    if (this.demoForm.disabled) {
      this.demoForm.enable();
    } else {
      this.demoForm.disable();
    }
  }

  onValueChanged(data?: any) {
    console.log(`onValueChanged: '${data}`);
  }

  onSubmit() {
    console.log('in onSubmit');
  }

  onChange(event: any) {
    console.log('in onChange');
  }
}
