import {
  Component,
  HostBinding,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[soho-row]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './soho-grid.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SohoRowComponent {
  @HostBinding('class.soho-row') get isRow() {
    return true;
  }
}
