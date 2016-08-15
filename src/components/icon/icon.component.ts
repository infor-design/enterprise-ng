
import {
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'soho-icon',
  templateUrl: 'icon.component.html',
})
export class SohoIconComponent {
  /*
   * Forcing the encapsulating component to have class='icon'.
   * This seems to solve problems with soho popupmenu.js where
   * this button is handled. Phillip 8/15/16
   */
  @HostBinding('class.icon') get isIcon() { return true; };

  @Input() arrow: boolean;
  @Input() icon: string = '';

  get svgClasses() {
    let classArray: Array<string> = new Array();
    classArray.push('icon');

    if (this.arrow) {
      classArray.push('arrow');
    }

    return classArray.join(' ');
  }
}
