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

  onChange(e: any) {
    console.dir(e);
  }
}
