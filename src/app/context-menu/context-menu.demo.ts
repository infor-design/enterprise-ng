import {
  Component,
  OnInit,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { SohoTextAreaComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-content-menu-demo',
  templateUrl: 'context-menu.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextMenuDemoComponent implements OnInit {

  @ViewChild(SohoTextAreaComponent, { static: true }) textarea: SohoTextAreaComponent;

  public normalText = `Input Example`;
  public modText = `Enabled Text Area Example`;
  public disabledText = `Disabled Text Area Example`;
  public radioButtonLabel = `Radio Button Example`;
  public checkboxButtonLabel = `Check Box Example`;
  public richTextEditorLabel = `Rich Text Editor Example`;

  public contextEntries: Array<ContextMenuEntries>;

  public textModel = {
    disableText: `This text area is disabled, so should show the browser context menu and not the same context menu as the other components`,// tslint:disable-line
    modifiableText: `This text is modifiable`,
  };

  public checkboxModel = {
    checkBox1Value: false,
    checkBox2Value: true
  };

  public editorModel = {
    editorText: `<p>Embrace <a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`// tslint:disable-line
  };

  private buildContextMenu(): Array<ContextMenuEntries> {
    const entries: Array<ContextMenuEntries> = [];

    entries.push({
      displayString       : 'Cutx',
      disabled : false,
      shortcut: '⌘+X'
    });

    entries.push({
      displayString       : 'Copy',
      disabled : false,
      shortcut: '⌘+C'
    });

    entries.push({
      displayString       : 'Paste',
      disabled : false,
      shortcut: '⌘+V'
    });

    entries.push({
      displayString       : 'Name and project range',
      id     : 'range',
      disabled : false
    });

    entries.push({
      displayString       : 'Insert comment',
      disabled : true
    });

    entries.push({
      displayString       : 'Insert note',
      disabled : false
    });

    entries.push({
      displayString       : 'Clear notes',
      disabled : true
    });

    entries.push({
      displayString       : 'Google',
      url     : 'http://www.google.com',
      disabled : false
    });

    return entries;
  }

  onUpdated() {
    console.log('CheckboxDemoComponent.onUpdated');
  }

  constructor() {}
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
}

export interface ContextMenuEntries {
  displayString: string;
  id?: string;
  url?: string;
  disabled?: boolean;
  shortcut?: string;
}
