import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-radiobutton-demo',
  templateUrl: 'radiobutton.demo.html'
})
export class RadioButtonDemoComponent implements OnInit {

  public dataView: any = {
    F1Field: {
      value: '3'
    },
    F2Field: {
      value: 'Y'
    },
    horizontal: {
      value: '2'
    },
    vertical: {
      value: '2'
    }
  };

  public fieldSpec: any = {
    F1Field: {
      bindId: 'F1Field',
      label: 'Dynamic Field',
      stateValues: [
        { value: '1', label: 'One' },
        { value: '2', label: 'Two' },
        { value: '3', label: 'Three' },
        { value: '4', label: 'Four' },
      ],
      displayAsHorizontal: undefined,
      displayAsDisplayOnly: true
    },
    F2Field: {
      bindId: 'F2Field',
      label: 'Yes No State Field',
      stateValues: [
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' }
      ],
      displayAsHorizontal: true,
      displayAsDisplayOnly: undefined
    },
    horizontal: {
      bindId: 'horizontal'
    },
    vertical: {
      bindId: 'vertical'
    }
  };

  public model: any = {};
  public showModel = true;
  public form?: UntypedFormGroup;
  public codeValue = 'test1';

  constructor() {
  }

  ngOnInit() {
    // build model and form group
    const group: {[key: string]: any} = [];

    Object.keys(this.fieldSpec).map( (item: any, _index: any, _ary: any) => {
      this.model[item] = {value: this.dataView[item].value};
      group[item] = new UntypedFormControl();
    });

    this.form = new UntypedFormGroup(group);
  }

  get isDisabled(): boolean {
    return true;
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onChange(event: JQuery.TriggeredEvent) {
    console.log(`'RadioButtonDemoComponent.onChange ${event.data}`);
  }
}
