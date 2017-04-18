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
  @HostBinding('class.alignRight') @Input() alignRight = false;

  /**
   * I cannot workout the syntax for a RexExp that works correctly in
   * an angular template, so the definitions have to be loaded from align
   * property.
   */
  public definitions = {'U': /[A-Z]/};

  onMaskWrite(event: SohoMaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }

}
