import { Component, HostBinding, Input } from '@angular/core';

/**
 * This example:
 * - shows basic mask functionality on input elements with an angular template
 */
@Component({
  selector:    'soho-mask-demo',
  templateUrl: './mask.demo.html',
  styles:      [
    `
    .alignRight {
        text-align: right;
    }
  `
  ]
})
export class MaskDemoComponent {
  @HostBinding('class.alignRight') @Input() alignRight = false;

  public model = {
    nomask:         '12',
    number:         '123',
    decimal:        '123.45',
    percent:        '85.23',
    currency:       '99.76',
    signednumber:   '-12',
    signeddecimal:  '-12.45',
    signedpercent:  '-85.23',
    signedcurrency: '-9.76',
    custommask:     'ZZZ'
  };
  public showModel = true;
  /**
   * I cannot workout the syntax for a RexExp that works correctly in
   * an angular template, so the definitions have to be loaded from align
   * property.
   */
  public definitions = { 'U': /[A-Z]/ };

  constructor() {
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  onMaskWrite(event: SohoMaskEvent) {
    console.log('MaskDemoComponent.onMaskWrite');
  }

}
