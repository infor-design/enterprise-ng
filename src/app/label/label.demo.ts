import {
  Component
} from '@angular/core';

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
  private checkBoxText: string = "Checkbox label";

  private field1 : string = "id1";
  private field2 : string = "id2";
  private field3 : string = "id3";
  private field4 : string = "id4";

  ngOnInit() {
    this.isRequired = true;
    this.isAudible = true;
  }

}
