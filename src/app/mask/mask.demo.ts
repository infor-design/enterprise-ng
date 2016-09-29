import {
  Component,
  HostBinding,
  Input
} from '@angular/core';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  selector: 'soho-mask-demo',
  templateUrl: './mask.demo.html',
  styles :
  [`
    .alignRight {
        text-align: right;
    }
  `]
})
export class MaskDemoComponent {
  @HostBinding('class.alignRight') @Input() alignRight: boolean = false;

  onMaskWrite(event: SohoMaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }
}
