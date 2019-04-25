import {
  Component,
  AfterViewInit,
  ElementRef
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-form-compact-demo',
  templateUrl: './form-compact.demo.html',
})
export class FormCompactDemoComponent implements AfterViewInit {

  public model = {
    field1: 'Equipment Inc.',
    field2: 'Sub Title',
    field3: 'More Info',
    field4: 'More Info',
    field5: '',
    field6: 'Hello World!',
    field7: 'Equipment Inc.',
    field8: 'Text',
    field9: '',
    field10: 'Text',
    field11: '',
    field12: 'Text',
    field13: '',
    field14: 'Text'
  };
  demoForm: FormGroup;

  constructor(private elementRef: ElementRef, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngAfterViewInit(): void {
  }

  createForm() {
    this.demoForm = this.formBuilder.group({
      field1: [this.model.field1],
      field2: [this.model.field2],
      field3: [this.model.field3],
      field4: { value: [this.model.field4], disabled: true },
      field5: [this.model.field5],
      field6: [this.model.field6],
      field7: [this.model.field7],
      field8: [this.model.field8],
      field9: [this.model.field9],
      field10: [this.model.field10],
      field11: [this.model.field11],
      field12: [this.model.field12],
      field13: [this.model.field13],
      field14: [this.model.field14]
    });
  }

  onChange(event: any) {
    console.log('Fired onChange', event);
  }
}
