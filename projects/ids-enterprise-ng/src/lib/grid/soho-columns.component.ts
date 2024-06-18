import {
  Component,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[soho-columns]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './soho-grid.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SohoColumnsComponent {
  @HostBinding('class.soho-columns') get isCol() {
    return true;
  }
}
