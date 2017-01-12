import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import { SohoTextAreaComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-content-menu-demo',
  templateUrl: './context-menu.demo.html'
})
export class ContextMenuDemoComponent implements OnInit {

  @ViewChild(SohoTextAreaComponent) textarea: SohoTextAreaComponent;

  normalText: string = `Input Example`;
  modText: string = `Enabled Text Area Example`;
  disabledText: string = `Disabled Text Area Example`;
  radioButtonLabel: string = `Radio Button Example`;
  checkboxButtonLabel: string = `Check Box Example`;
  richTextEditorLabel: string = `Rich Text Editor Example`;

  contextEntries: Array<ContextMenuEntries>;

  private buildContextMenu(): Array<ContextMenuEntries> {
    let entries: Array<ContextMenuEntries> = [];

    entries.push({
      displayString       : 'Cut',
      disabled : false
    });

    entries.push({
      displayString       : 'Copy',
      disabled : false
    });

    entries.push({
      displayString       : 'Paste',
      disabled : false
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
  };

  private textModel = { // tslint:disable-line
    disableText: `This text area is disabled, so should show the browser context menu and not the same context menu as the other components`,// tslint:disable-line
    modifiableText: `This text is modifiable`,
  };

  private checkboxModel = { // tslint:disable-line
    checkBox1Value: false,
    checkBox2Value: true
  };

  private editorModel = { // tslint:disable-line
    editorText: `<p>Embrace <a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`// tslint:disable-line
  };

  onUpdated(event: SohoCheckBoxEvent) {
    console.log('CheckboxDemoComponent.onUpdated');
  }

  constructor() {}
  ngOnInit() {
    this.contextEntries = this.buildContextMenu();
  }

  onSelected() {
    console.log('onSelected');
  }

  onBeforeopen() {
    console.log('onBeforeopen');
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
};
