import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { HeaderDynamicToolbarOptions } from '../header/header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'app-header-demo',
  templateUrl: 'header-toggle-buttons.demo.html',
})
export class HeaderToggleButtonsDemoComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.header') get isHeader() {
    return false;
  }
  @HostBinding('class.is-personalizable') get isPersonalizable() {
    return true;
  }

  private toolbarOptions: HeaderDynamicToolbarOptions = {
    toolbarButtons: [{
      id: 'heart-filled',
      type: 'icon',
      istoggle: true,
      icon: 'heart-filled',
      toggleOnIcon: 'heart-filled',
      toggleOffIcon: 'heart-outlined',
      data: '{\'btn\': \'heart-filled\'}'
    }, {
      id: 'filter',
      text: 'Filter',
      type: 'tertiary',
      istoggle: true,
      icon: 'filter',
      data: '{\'btn\': \'filter\'}'
    }]
  };

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) { }

  ngAfterViewInit() {
    // ------------------------------------------------------------------------
    // After the view has been initialized then build and set the header tabs.
    // ------------------------------------------------------------------------
    setTimeout(() =>
      this.sohoHeaderRef.instance.toolbarOptions = this.toolbarOptions);
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
