import { Component } from '@angular/core';

@Component({
    selector: 'accordion-card-demo', // eslint-disable-line
    templateUrl: 'accordion-card.demo.html',
})
export class AccordionCardDemoComponent {
    public model = {
        attributes: { name: 'id', value: 'attr-ids-test' }
    };
}
