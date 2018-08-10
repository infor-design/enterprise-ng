import {
  Component,
  AfterViewInit,
  ViewChild,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { Subject } from 'rxjs';

import { SohoDropDownComponent } from 'ids-enterprise-ng';

import { MOCK_ALL_STATES } from './dropdown-mock-all.data';

@Component({
  selector: 'soho-dropdown-typeahead-demo',
  templateUrl: './dropdown-typeahead.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DropdownTypeaheadDemoComponent implements AfterViewInit {
  /** Reference to the dropdown component so we can interact with it programmatically. */
  @ViewChild(SohoDropDownComponent) dropdown: SohoDropDownComponent;

  /** List of observable options {value: string, label: string} */
  @Input() options = new Subject<Array<any>>();

  /** Selected option.  */
  public model = {
    selectedOption: 'ND',
    options: []
  };

  /** */
  public settings = {
    reload: 'typeahead'
  };

  /** Demo flag */
  public showModel = false;

  constructor() { }

  ngAfterViewInit() {}

  toggleModel() {
    this.showModel = !this.showModel;
  }

  /**
   * Simulates an external AJAX call.
   * When making an AJAX call with a source method, this demo would make an outbound request
   * every time the Dropdown's menu is opened, and every time typeahead filtering is applied.
   */
  source = (response: any, searchTerm: any) => {
    const states = MOCK_ALL_STATES;

    // Filter based on the search term
    const filtered = [];
    for (let i = 0; i < states.length; i++) {
      if (states[i].label.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
        filtered.push(states[i]);
      }
    }

    console.log(`Simulating external source call with searchTerm "${searchTerm}"...`);

    // Store results on the angular component
    this.model.options = filtered;

    // Stagger the firing of the response on the internal jQuery component
    setTimeout(() => {
      response(filtered);
    }, 1);
  }
}
