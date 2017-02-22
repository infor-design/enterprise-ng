import {
  Component,
  HostBinding,
  Input,
  ViewChild
} from '@angular/core';
import { HeaderDynamicToolbarOptions, HeaderDynamicTabsetOptions } from './header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';
import { SohoToolbarComponent } from '@infor/sohoxi-angular';
import { SohoTabsComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-header-dynamic-demo',
  templateUrl: './header-dynamic.demo.html'
})
export class SohoHeaderDynamicDemoComponent {
  @HostBinding('class.header') get isHeader() { return true; };
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; };
  @HostBinding('class.has-toolbar') get hasHeaderToolbar() { return !!this.toolbarOptions; };
  @HostBinding('class.has-tabs') get hasHeaderTabs() { return !!this.tabOptions; };

  @ViewChild(SohoToolbarComponent) sohoToolbarComponent: SohoToolbarComponent;
  @ViewChild(SohoTabsComponent) sohoTabsComponent: SohoTabsComponent;

  /**
   * The current screen title
   */
  @Input() sectionTitle: string;

  /**
   * Sets the header toolbar using TabOptions
   */
  @Input() set toolbarOptions(options: HeaderDynamicToolbarOptions) {
    this.currentToolbarOptions = options;
    setTimeout(() => {
      if (this.sohoToolbarComponent) {
        this.sohoToolbarComponent.updated();
      }
    });
  }

  /**
   * Sets the header tabset using TabOptions
   */
  @Input() public set tabOptions(options: HeaderDynamicTabsetOptions) {
    this.currentTabsOptions = options;
    setTimeout(() => {
      if (this.sohoTabsComponent) {
        this.sohoTabsComponent.updated();
      }
    });
  }

  /**
   * Used by the component template to decide when to display the tabs.
   * @type {any}
   */
  private currentToolbarOptions: HeaderDynamicToolbarOptions = null;

  /**
   * Used by the component template to decide when to display the toolbar.
   * @type {any}
   */
  private currentTabsOptions: HeaderDynamicTabsetOptions = null;

  constructor(private headerRef: HeaderDynamicDemoRefService) {
    this.headerRef.instance = this;
  }

  /**
   * Get the current toolbar options.
   * @returns {HeaderDynamicToolbarOptions}
   */
  get toolbarOptions(): HeaderDynamicToolbarOptions {
    return this.currentToolbarOptions;
  }

  /**
   * Get the current toolbar options.
   * @returns {HeaderDynamicToolbarOptions}
   */
  public get tabOptions(): HeaderDynamicTabsetOptions {
    return this.currentTabsOptions;
  }
}
