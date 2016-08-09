import { Component } from '@angular/core';
import { MASK_COMPONENTS, MaskEvent } from '../';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  moduleId: module.id,
  selector: 'soho-mask-demo',
  templateUrl: './mask.demo.html',
  directives: [ MASK_COMPONENTS ],
  styles :
  [`
    .alignRight {
        text-align: right;
    }
  `]
})
export class MaskDemoComponent {
  onMaskWrite(event: MaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }
}
