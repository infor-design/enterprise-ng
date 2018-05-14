import {
  Component,
  HostBinding,
  Input,
  ViewChild
} from '@angular/core';
import {
  HeaderDynamicToolbarOptions, HeaderDynamicTabsetOptions,
  ToolbarSearchField
} from './header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';
import { SohoToolbarComponent } from 'ids-enterprise-ng';
import { SohoTabsComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'soho-header-dynamic-demo',
  templateUrl: './header-dynamic.demo.html'
})
export class SohoHeaderDynamicDemoComponent {
  @HostBinding('class.header') get isHeader() { return true; }
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; }
  @HostBinding('class.has-toolbar') get hasHeaderToolbar() { return !!this.toolbarOptions; }
  @HostBinding('class.has-tabs') get hasHeaderTabs() { return !!this.tabOptions; }

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
  }

  /**
   * Sets the header tabset using TabOptions
   */
  @Input() public set tabOptions(options: HeaderDynamicTabsetOptions) {
    this.currentTabsOptions = options;
  }

  @Input() set toolbarSearchField(searchField: ToolbarSearchField) {
    this._toolbarSearchField = searchField;

    setTimeout(() => {
      if (this.sohoToolbarComponent) {
        this.sohoToolbarComponent.updated();
      }
    });
  }

  get toolbarSearchField(): ToolbarSearchField {
    return this._toolbarSearchField;
  }

  public _toolbarSearchField: ToolbarSearchField = {
    id: 'toolbarSearchField',
    label: 'Search',
    value: '',
    collapsible: true
  };

  /**
   * Used by the component template to decide when to display the tabs.
   * @type {any}
   */
  public currentToolbarOptions: HeaderDynamicToolbarOptions = null;

  /**
   * Used by the component template to decide when to display the toolbar.
   * @type {any}
   */
  public currentTabsOptions: HeaderDynamicTabsetOptions = null;

  public defaultPersonalizeColor: string;
  public defaultPersonalizeTheme: string;

  constructor(private headerRef: HeaderDynamicDemoRefService) {
    this.headerRef.instance = this;
    this.defaultPersonalizeColor = this.getDefaultColor();
    this.defaultPersonalizeTheme = this.getDefaultTheme();
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

  // This should be within an Application Service in your local project
  getDefaultColor() {
    return localStorage.getItem('soho_color');
  }

  // This should be within an Application Service in your local project
  getDefaultTheme() {
    let theme = localStorage.getItem('soho_theme');
    if (theme) {
      theme += '-theme';
    }
    return theme;
  }

  fireSearchEvent(event: any) {
    alert('run search value : "' + this.toolbarSearchField.value + '"');
  }

  fireClearSearchEvent(event: any) {
    alert('search value cleared');
  }
}
