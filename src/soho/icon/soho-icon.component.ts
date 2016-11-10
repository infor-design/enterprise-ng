
import {
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'soho-icon',
  templateUrl: 'soho-icon.component.html',
  styleUrls: [ 'soho-icon.component.css' ]
})
export class SohoIconComponent {
  /*
   * Forcing the encapsulating component to have class='icon'.
   * This seems to solve problems with soho popupmenu.js where
   * this button is handled. Phillip 8/15/16
   */
  //@HostBinding('class.icon') get isIcon() { return true; };

  @Input() alert: boolean;
  @Input() arrow: boolean;
  @Input() confirm: boolean;
  @Input() icon: string = '';

  get svgClasses() {
    let classArray: Array<string> = new Array();
    classArray.push('icon');

    if (this.arrow) {
      classArray.push('arrow');
    }

    if (this.alert) {
      classArray.push("icon-" + this.icon);
    }

    return classArray.join(' ');
  }
}
