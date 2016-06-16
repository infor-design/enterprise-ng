
import {Component} from '@angular/core';

import {SohoAccordianComponent} from '../../components/index';

@Component({
    selector : 'accordian-sample-component',
    directives : [SohoAccordianComponent],
    template : `
        <p>AccordianSampleComponent</p>
         <soho-accordian-component></soho-accordian-component>
    `
})

export class AccordianSampleComponent{}