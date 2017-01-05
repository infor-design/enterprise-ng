import {
  Component
} from '@angular/core';

/**
 * This example:
 * - shows basic error functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-error-demo',
  templateUrl: './error.demo.html'
})
export class ErrorDemoComponent {

  private message = 'Field is required';

}
