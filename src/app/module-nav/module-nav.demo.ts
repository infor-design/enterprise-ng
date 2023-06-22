import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild
} from '@angular/core';

// @ts-ignore
import {
  SohoAccordionComponent,
  SohoSearchFieldComponent,
  SohoModuleNavSwitcherComponent,
  SohoModuleNavSettingsComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'module-nav-demo', // eslint-disable-line
  templateUrl: 'module-nav.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleNavDemoComponent implements AfterViewInit {
  @ViewChild(SohoAccordionComponent) accordion!: SohoAccordionComponent;
  @ViewChild(SohoSearchFieldComponent) searchfield?: SohoSearchFieldComponent;
  @ViewChild(SohoModuleNavSwitcherComponent) moduleNavSwitcher?: SohoModuleNavSwitcherComponent;
  @ViewChild(SohoModuleNavSettingsComponent) moduleNavSettings?: SohoModuleNavSettingsComponent;

  public searchfieldOptions: SohoSearchFieldOptions = {}

  public dropdownRoles: Array<SohoModuleNavSwitcherRoleRecord> = [
    { text: 'Admin', value: 'admin' },
    { text: 'Job Console', value: 'job-console' },
    { text: 'Landing Page Designer', value: 'landing-page-designer' },
    { text: 'Process Server Admin', value: 'process-server-admin' },
    { text: 'Proxy Management', value: 'proxy-management' },
    { text: 'Security System Management', value: 'security-system-management' },
    { text: 'User Management', value: 'user-management' }
  ]

  public model = {
    selectedRole: 'admin',
    roles: this.dropdownRoles
  }

  onRoleChange(e: JQuery.TriggeredEvent) {
    console.info('Module Nav Role change: ', e.target.value);
  }

  onModuleButtonClick(e: any) {
    console.info('Module Nav Role Button clicked', e);
  }

  onSearchChange(e: any) {
    console.dir('Module Nav Searchfield content change', e);
  }

  onSettingsMenuSelected(e: SohoContextMenuEvent) {
    console.dir('Module Nav Settings Menu selection occured', e);
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
    this.moduleNavSwitcher?.setRoles(this.dropdownRoles);
  }
}
