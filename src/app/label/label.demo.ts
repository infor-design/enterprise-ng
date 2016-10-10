import {
  Component
} from '@angular/core';

import { SohoLabelDirective } from '../../soho/label/soho-label.directive';

/**
 * This example:
 * - shows basic functionality on label elements with an angular template
 */
@Component({
  selector: 'soho-label-demo',
  templateUrl: './label.demo.html'
})

export class LabelDemoComponent {

  private isAudible: boolean;
  private isRequired: boolean;

  private normalText: string = "Normal label";
  private audibleText: string = "Audible label";
  private requiredText: string = "Required label";

  ngOnInit() {
    this.isRequired = true;
    this.isAudible = true;
  }

}
