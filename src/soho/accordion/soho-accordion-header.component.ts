import {
  Component,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'soho-accordion-header',
  templateUrl: './soho-accordion-header.component.html',
})
export class SohoAccordionHeaderComponent {
  @HostBinding('style.display') get isBlockDisplay() { return 'block'; };
  @HostBinding('class.accordion-header') get isAccordionHeader() { return true; };
  @HostBinding('class.hide-focus') get isHideFocus() { return true; };
  @HostBinding('class.has-chevron') get hasChevron() { return true; };
}
