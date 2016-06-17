
import {Component} from '@angular/core';

import {SohoTabsComponent} from '../../components/index';

@Component({
    selector   : 'dropdown-sample-component',
    directives : [SohoTabsComponent],
    template   : `
        <p>DropdownSampleComponent</p>
        <soho-tabs-component></soho-tabs-component>
    `
})

export class DropdownSampleComponent{}