import {
  Component,
  AfterViewInit,
} from '@angular/core';

import {
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-form-compact-demo',
  templateUrl: 'form-compact.demo.html',
})
export class FormCompactDemoComponent implements AfterViewInit {

  public model = {
    field1: 'Equipment Company',
    field2: '',
    field3: 'Equipment Company',
    field4: 'Equipment Company',
    field5: 'Equipment Company',
    field6: 'Equipment Company',
    field7: '',
    field8: 'Equipment Company',
    field9: 'Equipment Company',
    field10: 'Text',
    field11: 'Text',
    field12: 'Text',
    field13: 'Text',
    field14: 'Text',
    field15: '',
    field16: '',
    field17: '',
    field18: '',
    field19: '',
    field20: '',
    category: 'kids',
    checkbox1: false,
    checkbox2: true,
    checkbox3: true,
    checkbox4: true
  };
  demoForm?: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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
      field14: [this.model.field14],
      field15: [this.model.field15],
      field16: [this.model.field16],
      field17: [this.model.field17],
      field18: [this.model.field18],
      field19: [this.model.field19],
      field20: [this.model.field20],
      category: [this.model.category],
      checkbox1: [this.model.checkbox1],
      checkbox2: [this.model.checkbox2],
      checkbox3: [this.model.checkbox3],
      checkbox4: [this.model.checkbox4]
    });
  }

  onChange(event: any) {
    console.log('Fired onChange', event);
  }
}
