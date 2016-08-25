import {
  Component,
  HostBinding,
  Input,
  ViewChild
} from '@angular/core';
import { HeaderDynamicToolbarOptions, HeaderDynamicTabsetOptions } from './header-dynamic-demo.model';
import { HeaderDynamicToolbarOptions, HeaderDynamicTabsetOptions } from './header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';
import { SohoToolbarComponent } from '../../components/toolbar/toolbar.component';
import { SohoTabsComponent } from '../../components/tabs/tabs.component';

@Component({
  selector: 'soho-header-dynamic-demo',
  templateUrl: 'header-dynamic.demo.html'
})
export class SohoHeaderDynamicDemoComponent {
  @HostBinding('class.header') get isHeader() { return true; };
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; };
  @HostBinding('class.has-toolbar') get hasHeaderToolbar() { return true; };
  @HostBinding('class.has-tabs') get hasHeaderTabs() { return !!this.currentTabsOptions; };

  /**
   * Had to use a template variable to get the selector to work.
   *
   * TODO ppatton These other ViewChild query selectors are failing for me
   *   By Type: @ViewChild(SohoToolbarComponent)   -
   *   By element: @ViewChild('soho-toolbar')
   * Neither of these are working. investigate.
   */
  @ViewChild(SohoToolbarComponent) sohoToolbarComponent: SohoToolbarComponent;

  /**
   * Had to use a template variable to get the selector to work.
   * TODO ppatton Neither of these are working. investigate.
   *   By Type: @ViewChild(SohoToolbarComponent)   -
   *   By element: @ViewChild('soho-toolbar')
   */
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
