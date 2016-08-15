import { Component, HostBinding, Input } from '@angular/core';
import { SohoMaskComponent, MaskEvent } from '../../components/mask';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-mask-demo',
  templateUrl: './mask.demo.html',
  directives: [ SohoMaskComponent ],
  styles :
  [`
    .alignRight {
        text-align: right;
    }
  `]
})
export class MaskDemoComponent {
  @HostBinding('class.alignRight') @Input() alignRight: boolean = false;

  onMaskWrite(event: MaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }
}
