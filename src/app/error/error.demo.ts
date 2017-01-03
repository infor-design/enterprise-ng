import {
  Component,
  ViewChild
} from '@angular/core';
import { SohoErrorDirective } from '@infor/sohoxi-angular';

/**
 * This example:
 * - shows basic error functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-error-demo',
  templateUrl: './error.demo.html'
})
export class ErrorDemoComponent {
  @ViewChild(SohoErrorDirective) error: SohoErrorDirective;

  private message = 'Field is required';

  addInlineError() {
    this.error.showTooltip = false;
    this.error.inline = true;
    this.error.message = this.message;
  }

  addTooltipError() {
    this.error.showTooltip = true;
    this.error.inline = false;
    this.error.message = this.message;
  }

  removeError() {
    this.error.message = '';
  }

}
