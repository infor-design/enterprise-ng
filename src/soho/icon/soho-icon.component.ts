import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'soho-icon',
  templateUrl: 'soho-icon.component.html',
  styleUrls: [ 'soho-icon.component.css' ]
})
export class SohoIconComponent {

  @Input() alert: boolean;
  @Input() icon: string = '';

  get svgClasses() {
    let classStr  = 'icon';
    if (this.alert) {
      classStr += ' icon-' + this.icon;
    }

    return classStr;
  }
}
