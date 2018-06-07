import {
  Component,
  ElementRef,
  OnInit,
  AfterViewInit
} from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';

import { DomSanitizer } from '@angular/platform-browser';

import { MOCK_STATES } from '../dropdown/dropdown-mock.data';
import { productsColumns, productsData } from '../lookup/mock.data';

@Component({
  selector: 'soho-reactive-form.demo',
  templateUrl: './form-reactive-form.demo.html'
})
export class FormReactiveFormDemoComponent implements AfterViewInit {

  textAreaValue: 'Hello World';
  radiobuttonValue: any;
  // tslint:disable-next-line:max-line-length
  editorValue = null;
  autocompleteValue: any;

  public autocompleteUrl = 'http://localhost:4200/app/demodata/states.demo.json?term=';

  form: void;
  demoForm: FormGroup;

  public inputValue = 'Hello World!';
  public datevalue;
  public timevalue;
  public dropdownvValue = 'ND';
  public colorpickValue;

  public sliderValue: number;

  public checkedValue: boolean;

  public lookupValue;

  public options = MOCK_STATES;

  public lookupColumns = productsColumns;

  public lookupData = productsData;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder, sanitizer: DomSanitizer) {
    // tslint:disable-next-line:max-line-length
    this.editorValue = sanitizer.bypassSecurityTrustHtml(`<a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`)
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = this.formBuilder.group({
      input: [this.inputValue],
      datepick: [this.datevalue],
      timepick: [this.timevalue],
      dropdown: [this.dropdownvValue],
      colorpick: [this.colorpickValue],
      checkbox: [this.checkedValue],
      autocomplete: [this.autocompleteValue],
      slider: [this.sliderValue],
      lookup: [this.lookupValue],
      editor: [this.editorValue],
      radiobutton: [this.radiobuttonValue],
      textarea: [this.textAreaValue]
    });

    this.demoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.demoForm.disable();
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
