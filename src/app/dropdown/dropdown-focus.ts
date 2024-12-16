import {
  ChangeDetectionStrategy,
  Component,
  QueryList,
  ViewChildren
} from '@angular/core';
// @ts-ignore
import { SohoDropDownComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-dropdown-focus',
    templateUrl: 'dropdown-focus.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DropdownFocusComponent {
  @ViewChildren(SohoDropDownComponent) dropDowns?: QueryList<SohoDropDownComponent>;

  public options: Array<Object> = [
    { value: 'AL', text: 'Alabama' },
    { value: 'CA', text: 'California' },
    { value: 'DE', text: 'Delaware' },
    { value: 'NY', text: 'New York' },
    { value: 'WY', text: 'Wyoming' },
  ];
  sourceoptions: Array<Object> = [];
  public counter = 0;
  public model = {
    one: '',
    two: 'AL',
    three: 'DE'
  };


  focus(index: number) {
    console.log(`Focus ${index}`);
    this.dropDowns?.get(index - 1)?.setFocus();
  }


}
