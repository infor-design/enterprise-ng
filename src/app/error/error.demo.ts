import {
  Component,
  ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoErrorDirective } from 'ids-enterprise-ng';

/**
 * This example:
 * - shows basic error functionality on input elements with an angular template
 */
@Component({
  selector: 'app-error-demo',
  templateUrl: 'error.demo.html'
})
export class ErrorDemoComponent {
  @ViewChild(SohoErrorDirective, { static: true }) public error?: SohoErrorDirective; // eslint-disable-line

  public message = 'Field is required';
}
