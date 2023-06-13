import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  SohoAccordionComponent,
  SohoAccordionHeaderComponent,
  SohoAccordionPaneComponent,
} from 'ids-enterprise-ng';

@Component({
  selector: 'module-nav-demo', // eslint-disable-line
  templateUrl: 'module-nav.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModuleNavDemoComponent {
  public searchfieldOptions: SohoSearchFieldOptions = {

  }

  onRoleChange(value: string) {
    console.dir('Role Change', value);
  }

  onModuleButtonClick() {
    console.info('Module Button Clicked');
  }

  onSearchChange(e: any) {
    console.dir('Searchfield Change', e);
  }
}
