import {
  Component,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';

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
    datevalue: new Date(),
    timevalue: '',
    dropdownvValue: 'ND',
    colorpickValue: '',
    sliderValue: 1,
    checkedValue: true,
    lookupValue: '',
    spinbox: 0
  };

  form?: void;
  demoForm?: UntypedFormGroup;
  public options = MOCK_STATES;

  public lookupColumns = productsColumns;

  public lookupData = productsData;

  // @ts-ignore
  constructor(private formBuilder: UntypedFormBuilder) {
    // tslint:disable-next-line:max-line-length
    this.model.editorValue = `<a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`;
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    // note - both controls have the .required validator.
    this.demoForm = new FormGroup({
      input: new FormControl({ value: this.model.inputValue, disabled: false }),
      datepick: new FormControl({ value: this.model.datevalue, disabled: false }),
      timepick: new FormControl({ value: this.model.timevalue, disabled: false }),
      dropdown: new FormControl({ value: this.model.dropdownvValue, disabled: false }),
      colorpick: new FormControl({ value: this.model.colorpickValue, disabled: false }),
      checkbox: new FormControl({ value: this.model.checkedValue, disabled: true }),
      autocomplete: new FormControl({ value: this.model.autocompleteValue, disabled: false }),
      slider: new FormControl({ value: this.model.sliderValue, disabled: false }),
      lookup: new FormControl({ value: this.model.lookupValue, disabled: false }),
      editor: new FormControl({ value: this.model.editorValue, disabled: false }),
      radiobutton: new FormControl({ value: this.model.radiobuttonValue, disabled: false }),
      textarea: new FormControl({ value: this.model.textAreaValue, disabled: false }),
      spinbox: new FormControl({ value: this.model.spinbox, disabled: false })
    });

    this.demoForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  toggleDisableForm() {
    if (!this.demoForm) {
      return;
    }

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

  onChange(_event: any) {
    console.log('in onChange');
  }
}
