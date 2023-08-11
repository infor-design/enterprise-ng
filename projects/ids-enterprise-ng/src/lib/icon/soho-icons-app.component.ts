
import {
  Component,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'soho-icons-app',
  templateUrl: 'svg-app.html',
})
export class SohoIconsAppComponent {
  @HostBinding('style.display') none = 'none';
}
