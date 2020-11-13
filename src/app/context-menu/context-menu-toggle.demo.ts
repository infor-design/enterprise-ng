import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
// @ts-ignore
import { SohoTextAreaComponent, SohoContextMenuDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-context-menu-toggle-demo',
  templateUrl: 'context-menu-toggle.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuToggleDemoComponent implements OnInit {
  @ViewChild(SohoTextAreaComponent, { static: true }) textarea?: SohoTextAreaComponent;
  @ViewChild(SohoContextMenuDirective) contextMenu?: SohoContextMenuDirective;

  public labelText?: string;
  public isShowContextMenu?: boolean;
  public isAutoFocus?: boolean;
  public isAttachToBody?: boolean;

  public contextmenuItems?: Array<TypeContextMenuItems>;

  private buildContextMenu(): Array<TypeContextMenuItems> {
    const items: Array<TypeContextMenuItems> = [];

    items.push({
      displayString: 'Cutx',
      disabled: false,
      shortcut: '⌘+X'
    });

    items.push({
      displayString: 'Copy',
      disabled: false,
      shortcut: '⌘+C'
    });

    items.push({
      displayString: 'Paste',
      disabled: false,
      shortcut: '⌘+V'
    });

    items.push({
      displayString: 'Name and project range',
      id: 'range',
      disabled: false
    });

    items.push({
      displayString: 'Insert comment',
      disabled: true
    });

    items.push({
      displayString: 'Insert note',
      disabled: false
    });

    items.push({
      displayString: 'Clear notes',
      disabled: true
    });

    items.push({
      displayString: 'Google',
      url: 'http://www.google.com',
      disabled: false
    });

    return items;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.isShowContextMenu = true;
    this.isAutoFocus = true;
    this.isAttachToBody = true;
    this.contextmenuItems = this.buildContextMenu();
    this.setLabelText();
  }

  onSelected() {
  }

  onBeforeOpen() {
  }

  onClose() {
  }

  onOpen() {
  }

  toggleShowContextMenu() {
    this.isShowContextMenu = !this.isShowContextMenu;
    this.setLabelText();
    this.setContextMenu();
  }

  toggleAutoFocus() {
    this.isAutoFocus = !this.isAutoFocus;
    this.updateSettings();
  }

  toggleAttachToBody() {
    this.isAttachToBody = !this.isAttachToBody;
    this.updateSettings();
  }

  updateSettings() {
    this.changeDetectorRef.detectChanges();
    this.contextMenu?.updated();
  }

  setContextMenu() {
    this.changeDetectorRef.detectChanges();
    if (this.isShowContextMenu) {
      this.contextMenu?.ngAfterViewInit();
    } else {
      this.contextMenu?.ngOnDestroy();
    }
  }

  setLabelText() {
    this.labelText = `Example (show ${this.isShowContextMenu ? 'custom' : 'browser default'} context menu)`;
  }
}

export interface TypeContextMenuItems {
  displayString: string;
  id?: string;
  url?: string;
  disabled?: boolean;
  shortcut?: string;
}
