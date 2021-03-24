import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
// @ts-ignore
import { SohoTextAreaComponent, SohoContextMenuDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-content-menu-shared-demo',
  templateUrl: 'context-menu-shared.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuSharedDemoComponent implements OnInit {

  @ViewChild(SohoTextAreaComponent, { static: true }) textarea?: SohoTextAreaComponent;
  @ViewChild('menuOne') menuOneContextMenu?: SohoContextMenuDirective;

  public normalText = `Input Example`;
  public modText = `Enabled Text Area Example`;
  public manualCloseLabel = `Close Context Menu Manually`;

  public contextEntries?: Array<ContextMenuEntries>;

  public textModel = {
    modifiableText: `This text is modifiable`,
  };

  private buildContextMenu(): Array<ContextMenuEntries> {
    const entries: Array<ContextMenuEntries> = [];

    entries.push({
      displayString: 'Cut',
      disabled: false,
      shortcut: '⌘+X'
    });

    entries.push({
      displayString: 'Copy',
      disabled: false,
      shortcut: '⌘+C'
    });

    entries.push({
      displayString: 'Paste',
      disabled: false,
      shortcut: '⌘+V'
    });

    entries.push({
      displayString: 'Name and project range',
      id: 'range',
      disabled: false
    });

    entries.push({
      displayString: 'Insert comment',
      disabled: true
    });

    entries.push({
      displayString: 'Insert note',
      disabled: false
    });

    entries.push({
      displayString: 'Clear notes',
      disabled: true
    });

    entries.push({
      displayString: 'Google',
      url: 'http://www.google.com',
      disabled: false
    });

    return entries;
  }

  onUpdated() {
    console.log('ContextMenuComponent.onUpdated');
  }

  constructor() { }
  ngOnInit() {
    this.contextEntries = this.buildContextMenu();
  }

  onSelected() {
    console.log('onSelected');
  }

  onBeforeOpen() {
    console.log('onBeforeOpen');
  }

  onClose() {
    console.log('onClose');
  }

  onOpen() {
    console.log('onOpen');
  }

  onOpenManually(_e: SohoContextMenuEvent): void {
    setTimeout(() => {
      this.menuOneContextMenu?.close();
    }, 2000);
  }

  destroyInputPopup(): void {
    $('#field1').data('popupmenu').destroy();
    $('#field1').remove();
  }

  destroyTextAreaPopup(): void {
    $('#textarea').data('popupmenu').destroy();
    $('#textarea').remove();
  }
}

export interface ContextMenuEntries {
  displayString: string;
  id?: string;
  url?: string;
  disabled?: boolean;
  shortcut?: string;
}
