import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  NgZone,
  ViewChild
} from '@angular/core';

// @ts-ignore
import {
  SohoAccordionComponent,
  SohoSearchFieldComponent,
  SohoModuleNavSwitcherComponent,
  SohoModuleNavSettingsComponent
} from 'ids-enterprise-ng';

const defaultRoles: Array<SohoModuleNavSwitcherRoleRecord> = [
  { text: 'Admin', value: 'admin', icon: 'app-ac' },
  { text: 'Job Console', value: 'job-console', icon: 'app-jo' },
  { text: 'Landing Page Designer', value: 'landing-page-designer', icon: 'app-ssm' },
  { text: 'Process Server Admin', value: 'process-server-admin', icon: 'app-um' },
  { text: 'Proxy Management', value: 'proxy-management', icon: 'app-pm' },
  { text: 'Security System Management', value: 'security-system-management', icon: 'app-psa' },
  { text: 'User Management', value: 'user-management', icon: 'app-lmd' }
];

@Component({
  selector: 'module-nav-demo', // eslint-disable-line
  templateUrl: 'module-nav.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleNavDemoComponent implements AfterViewInit {
  @ViewChild(SohoAccordionComponent) accordion!: SohoAccordionComponent;
  @ViewChild(SohoSearchFieldComponent) searchfield?: SohoSearchFieldComponent;
  @ViewChild(SohoModuleNavSwitcherComponent) moduleNavSwitcher?: SohoModuleNavSwitcherComponent;
  @ViewChild(SohoModuleNavSettingsComponent, { static: true }) moduleNavSettings?: SohoModuleNavSettingsComponent;


  /**
   * Constructor.
   * @param ngZone - zone access.
   */
  constructor(private ngZone: NgZone) { }

  public searchfieldOptions: SohoSearchFieldOptions = {}

  public model = {
    selectedRole: 'admin',
    roles: defaultRoles
  }

  onRoleChange(e: JQuery.TriggeredEvent) {
    console.info('Module Nav Role change: ', e.target.value);
  }

  onListContextMenu(e: JQuery.TriggeredEvent) {
    console.info('Module Context Menu', e.target);
    const url = $(e.target).text().replace(/^\s+|\s+$/g, '').replace(' ', '').toLocaleLowerCase();
    $(e.target).attr('href', `https://example.com/${url}`);
  }

  onModuleButtonClick(e: any) {
    console.info('Module Nav Role Button clicked', e);
    this.moduleNavSwitcher?.toggleModuleButtonFocus(true);
    this.accordion?.deselectAll();
  }

  onModuleNavAccordionClick(e: any) {
    console.info('Module Nav Accordion header clicked', e?.target?.textContent.trim());
    this.moduleNavSwitcher?.toggleModuleButtonFocus(false);
  }

  onSearchChange(e: any) {
    console.dir('Module Nav Searchfield content change', e);
  }

  toggleSwitcher() {
    const isDisabled = this.moduleNavSwitcher?.disabled || false;
    this.moduleNavSwitcher?.updated({ disabled: !isDisabled });
  }

  onSettingsMenuSelected(evt: SohoContextMenuEvent) {
    console.dir('Module Nav Settings Menu selection occured', evt);

    const el = evt.args;
    const elId = el.attr('id');
    const parentEl = el.parent();
    const parentElId = parentEl.attr('id');
    if ([elId, parentElId].includes('toggle-custom-roles')) {
      this.customRoles = !this.customRoles;
      this.toggleCustomRoles();
    }
  }

  onSettingsMenuOpen(e: any) {
    console.dir('Module Nav Settings Menu opened', e);
  }

  onSettingsMenuClose(e: any) {
    console.dir('Module Nav Settings Menu closed', e);
  }

  // ------------------------------------------
  // Lifecycle Events
  // ------------------------------------------

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.moduleNavSwitcher?.setRoles(this.model.roles);
    });
  }

  // ------------------------------------------
  // Demo API
  // ------------------------------------------

  customRoles: boolean = false;

  public resetRoles() {
    this.model.roles = defaultRoles;
  }

  public setCustomRoles(val: Array<SohoModuleNavSwitcherRoleRecord>) {
    this.model.roles = val;
  }

  private toggleCustomRoles() {
    if (this.customRoles) {
      console.info('Enable custom roles');
      this.setCustomRoles([
        {
          value: '1',
          text: 'One',
          icon: 'https://randomuser.me/api/portraits/lego/1.jpg'
        },
        {
          value: '2',
          text: 'Two',
          icon: 'https://randomuser.me/api/portraits/lego/2.jpg'
        },
        {
          value: '3',
          text: 'Three',
          icon: 'https://randomuser.me/api/portraits/lego/3.jpg'
        }
      ])
    } else {
      console.info('Disable custom roles');
      this.resetRoles();
    }
    this.moduleNavSwitcher?.setRoles(this.model.roles);
  }
}
