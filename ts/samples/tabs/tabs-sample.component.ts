
import {Component} from '@angular/core';

import {SohoTabsComponent} from '../../components/index';

@Component({
    selector : 'tabs-sample-component',
    directives : [SohoTabsComponent],
    template : `
        <p>TabsSampleComponent</p>
        <soho-tabs-component></soho-tabs-component>
    `
})

export class TabsSampleComponent{}