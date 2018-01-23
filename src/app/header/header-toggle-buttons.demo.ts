import {
  Component,
  HostBinding,
  OnDestroy
} from '@angular/core';
import { HeaderDynamicToolbarOptions } from '../header/header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-header-demo',
  templateUrl: './header-toggle-buttons.demo.html',
})
export class HeaderToggleButtonsDemoComponent implements OnDestroy {
  @HostBinding('class.header') get isHeader() { return false; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }

  private toolbarOptions: HeaderDynamicToolbarOptions = {
    toolbarButtons: [
      { id: 'filter', type: 'icon', istoggle: true, icon: 'filter', data: '{\'btn\': \'filter\'}' },
      { id: 'heart-filled', type: 'icon', istoggle: true, icon: 'heart-filled',
        toggleOnIcon: 'heart-filled', toggleOffIcon: 'heart-outlined', data: '{\'btn\': \'heart-filled\'}' }
    ]
  };

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {
    this.sohoHeaderRef.instance.toolbarOptions = this.toolbarOptions;
  }

  ngOnDestroy() {
    this.removeHeaderToolbar();
  }

  private removeHeaderToolbar() {
    if (this.sohoHeaderRef.instance.hasHeaderToolbar) {
      this.sohoHeaderRef.instance.toolbarOptions = undefined;
    }
  }

}
