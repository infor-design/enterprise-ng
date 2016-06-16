
import {Component} from '@angular/core';

import {SohoToolbarComponent} from '../../components/index';

@Component({
    selector : 'toolbar-sample-component',
    directives : [SohoToolbarComponent],
    template : `
        <p>ToolbarSampleComponent</p>
        <soho-toolbar-component></soho-toolbar-component>
    `
})

export class ToolbarSampleComponent{}