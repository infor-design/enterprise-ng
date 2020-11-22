import {
  Component,
  ElementRef,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';
import { SohoMessageService } from 'ids-enterprise-ng';

@Component({
  selector: 'app-datagrid-toolbar-demo',
  templateUrl: 'datagrid-toolbar.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataGridToolbarDemoComponent {

  // Breadcrumbs.
  @Input() breadcrumbs: Breadcrumb[];

  constructor(private element: ElementRef, private messages: SohoMessageService) {
    this.breadcrumbs = this.buildBreadcrumbs();
  }

  selectBreadcrumb(breadcrumb: Breadcrumb) {
    console.log('Selected ${breadcrumb.friendlyName}');
  }

  public onDelete() {
    const opts: SohoMessageOptions = {
      buttons: [
        {
          text: 'Close', click: (e, modal) => {
            modal.close(true);
          }, isDefault: true
        }
      ]
    };
    opts.message = 'Test Message. Testing 1.2';
    this.messages
      .confirm(opts)
      .open();
  }

  private buildBreadcrumbs() {
    const breadcrumbs = Array<Breadcrumb>();

    breadcrumbs.push({ current: false, friendlyName: 'Root', path: '/', selectable: true });
    breadcrumbs.push({ current: false, friendlyName: 'Level 1', path: '/1', selectable: true });
    breadcrumbs.push({ current: false, friendlyName: 'Level 2', path: '/1/2', selectable: true });
    breadcrumbs.push({ current: true, friendlyName: 'Level 3', path: '/1/2/3', selectable: true });

    return breadcrumbs;
  }
}

/**
 * Definition of a breadcrumb.
 */
export class Breadcrumb {
  // The display name (or friendly name) of the breadcrumb.
  friendlyName: string;

  // The id (or key) used when selected.
  path: string;

  // Indicator that this is the selectable.
  selectable = false;

  // Is this the active breadcrumb.
  current = false;
}
