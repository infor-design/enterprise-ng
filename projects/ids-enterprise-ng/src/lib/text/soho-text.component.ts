import {
  Component,
  HostBinding,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: '[soho-text], soho-text',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './soho-text.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SohoTextComponent {
  @HostBinding('class.soho-text') get isText() {
    return true;
  }
}
