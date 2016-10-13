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

  normalText: string = 'Normal label';
  audibleText: string = 'Audible label';
  requiredText: string = 'Required label';
  checkBoxText: string = 'Checkbox label';

  field1: string = 'id1';
  field2: string = 'id2';
  field3: string = 'id3';
  field4: string = 'id4';

  ngOnInit() {
    this.isRequired = true;
    this.isAudible = true;
  }

}
