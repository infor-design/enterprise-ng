import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';
import { SohoContextMenuDirective } from 'ids-enterprise-ng';

@Component({
    selector: 'app-content-menu-lazy-load-demo',
    templateUrl: 'context-menu-lazy-load.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`.context-menu-button {
    transform: rotate(90deg);
    border-radius: 1px;
    height: 18px;
    display: inline-block;
    min-height: 0;
    min-width: 0;
    border: 0;
    margin-left: -9px;
    margin-top: 8px;
  }`],
    standalone: false
})
export class ContextMenuLazyLoadDemoComponent implements OnInit, AfterViewInit {

  @ViewChild(SohoContextMenuDirective, {static: true}) contextMenu?: SohoContextMenuDirective;

  public normalText = `Input Example`;

  public contextEntries: Array<ContextMenuEntries> = [];

  public textModel = {
    disableText: `This text area is disabled, so should show the browser context menu and not the same context menu as the other components`,// tslint:disable-line
    modifiableText: `This text is modifiable`,
  };

  private buildContextMenu(): Array<ContextMenuEntries> {
    const entries: Array<ContextMenuEntries> = [];

    entries.push({
      displayString: 'Cutx',
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
    console.log('CheckboxDemoComponent.onUpdated');
  }

  constructor() { }
  ngOnInit() {
    this.contextEntries = this.buildContextMenu();
  }

  ngAfterViewInit() {
    console.log('here');
    if (this.contextMenu) {
      console.log('context menu exists');
    }
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

  onContextClick() {
    if (this.contextMenu) {
      this.contextMenu.initializeComponent();
    }
  }
}

export interface ContextMenuEntries {
  displayString: string;
  id?: string;
  url?: string;
  disabled?: boolean;
  shortcut?: string;
}
