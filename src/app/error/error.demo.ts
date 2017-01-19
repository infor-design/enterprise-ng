import {
  Component,
  ViewChild
} from '@angular/core';

import {
  SohoErrorDirective
} from '../../soho/error';

/**
 * This example:
 * - shows basic error functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-error-demo',
  templateUrl: './error.demo.html'
})
export class ErrorDemoComponent {
  @ViewChild(SohoErrorDirective) public error: SohoErrorDirective;

  // tslint:disable-next-line:no-unused-variable
  public message = 'Field is required';

}
