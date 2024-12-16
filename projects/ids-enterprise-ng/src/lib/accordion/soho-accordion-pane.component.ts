import {
  Component,
  HostBinding,
} from '@angular/core';

@Component({
    selector: 'soho-accordion-pane',
    templateUrl: 'soho-accordion-pane.component.html',
    standalone: false
})
export class SohoAccordionPaneComponent {
  @HostBinding('class.accordion-pane') get isAccordionPane() {
 return true;
}
}
