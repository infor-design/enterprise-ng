import {
  Component,
  OnInit
} from '@angular/core';

/**
 * This example:
 * - shows basic functionality on label elements with an angular template
 */
@Component({
  selector: 'soho-label-demo',
  templateUrl: './label.demo.html'
})
export class LabelDemoComponent implements OnInit {

  private isAudible: boolean;
  private isRequired: boolean;

  normalText = 'Normal label';
  audibleText = 'Audible label';
  requiredText = 'Required label';
  checkBoxText = 'Checkbox label';

  field1 = 'id1';
  field2 = 'id2';
  field3 = 'id3';
  field4 = 'id4';

  ngOnInit() {
    this.isRequired = true;
    this.isAudible = true;
  }

}
