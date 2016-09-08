import {
  Component,
  ElementRef,
  Input
} from '@angular/core';

import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

@Component({
  selector: 'soho-label',
  template: `
  <div class="field">
    <label class="label"
      [attr.id]="controlId"
      [attr.tooltip]="tooltip"
      [attr.for]="name">
      {{text}}
      </label>
  </div>
  `,
  directives: [REACTIVE_FORM_DIRECTIVES]
})
export class LabelComponent {
  @Input() controlId: string;
  @Input() name: string;
  @Input() text: string;
  @Input() tooltip: string;

  constructor(private element: ElementRef) {

  }
}
