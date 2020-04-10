import {
  Component,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { DomSanitizer } from '@angular/platform-browser';

import {
  SohoEditorComponent
} from 'ids-enterprise-ng';

@Component({
  selector: 'app-editor-demo',
  templateUrl: 'editor.demo.html',
  styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
})
export class EditorDemoComponent implements AfterViewInit {

  @ViewChild(SohoEditorComponent) editor: SohoEditorComponent;

  public model: any;
  public showMultipleEditors = false;
  public showModel = false;
  public editorDisabled = false;
  public editorReadOnly = false;

  constructor(sanitizer: DomSanitizer) {
    // tslint:disable
    // This text is assumed trusted through the editor since we handle security in our back end and database.
    // Or you should be careful here
    this.model = {
      editorText: sanitizer.bypassSecurityTrustHtml(`<p>Embrace <a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p>
        <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>`)
    };

    // tslint:enable
  }

  ngAfterViewInit() {

    // Customize the settings on init

    this.editor.anchor = {
      url: 'http://www.example.com',
      class: 'hyperlink',
      target: 'New Window',
      isClickable: true,
      showIsClickable: true
    };

  }

  onUpdated(event: any) {
    alert(event);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setEnable() {
    this.editor.disabled = false;
    this.editorDisabled = this.editor.disabled;
    this.editorReadOnly = this.editor.readonly;
  }

  setDisable() {
    this.editor.disabled = true;
    this.editorDisabled = this.editor.disabled;
  }

  setReadonly() {
    this.editor.readonly = true;
    this.editorReadOnly = this.editor.readonly;
  }

  onChange(event: any) {
    console.log(`changed: ${event}`);
  }
}
