import { Component } from '@angular/core';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-checkbox-demo',
  templateUrl: './checkbox.demo.html',
})
export class CheckBoxDemoComponent {
  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }
}
