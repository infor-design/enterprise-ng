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
// @ts-ignore
import { SohoToolbarComponent } from 'ids-enterprise-ng';
// @ts-ignore
import { SohoTabsComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-header-dynamic-demo',
  templateUrl: 'header-dynamic.demo.html'
})
export class SohoHeaderDynamicDemoComponent {
  @HostBinding('class.header') get isHeader() {
    return true;
  }
  @HostBinding('class.is-personalizable') get isPersonalizable() {
    return true;
  }
  @HostBinding('class.has-toolbar') get hasHeaderToolbar() {
    return !!this.toolbarOptions;
  }
  @HostBinding('class.has-tabs') get hasHeaderTabs() {
    return !!this.tabOptions;
  }

  @ViewChild(SohoToolbarComponent, { static: true }) sohoToolbarComponent?: SohoToolbarComponent;
  @ViewChild(SohoTabsComponent) sohoTabsComponent?: SohoTabsComponent;

  /**
   * The current screen title
   */
  @Input() sectionTitle?: string;

  /**
   * Sets the header toolbar using TabOptions
   */
  @Input() set toolbarOptions(options: HeaderDynamicToolbarOptions | undefined) {
    this.currentToolbarOptions = options;
  }

  /**
   * Get the current toolbar options.
   */
  get toolbarOptions(): HeaderDynamicToolbarOptions | undefined {
    return this.currentToolbarOptions;
  }

  /**
   * Sets the header tabset using TabOptions
   */
  @Input() public set tabOptions(options: HeaderDynamicTabsetOptions | undefined) {
    this.currentTabsOptions = options;
  }

  /**
   * Get the current toolbar options.
   */
  public get tabOptions(): HeaderDynamicTabsetOptions {
    return this.currentTabsOptions;
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
   *
   */
  public currentToolbarOptions?: HeaderDynamicToolbarOptions = undefined;

  /**
   * Used by the component template to decide when to display the toolbar.
   *
   */
  public currentTabsOptions?: HeaderDynamicTabsetOptions = undefined;

  public defaultPersonalizeColor?: string | null;
  public defaultPersonalizeTheme?: string | null;

  constructor(private headerRef: HeaderDynamicDemoRefService) {
    this.headerRef.instance = this;
    this.defaultPersonalizeColor = this.getDefaultColor();
    this.defaultPersonalizeTheme = this.getDefaultTheme();
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

  fireSearchEvent(_event: any) {
    alert('run search value : "' + this.toolbarSearchField.value + '"');
  }

  fireClearSearchEvent(_event: any) {
    alert('search value cleared');
  }
}
