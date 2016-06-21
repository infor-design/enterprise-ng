
import {Component} from '@angular/core';

import {SohoExpandableAreaComponent} from '../../components/index';

@Component({
    selector : 'expandablearea-sample-component',
    directives : [SohoExpandableAreaComponent],
    template : `
        <div class="row">
          <div class="full column">
            <soho-expandablearea-component title="Procurement">
              <div class="field">
                <label for="first-name">First Name</label>
                <input type="text" placeholder="Normal text Field" name="first-name" id="first-name">
              </div>
            </soho-expandablearea-component>
          </div>
        </div>
    `
})

export class ExpandableAreaSampleComponent{}
