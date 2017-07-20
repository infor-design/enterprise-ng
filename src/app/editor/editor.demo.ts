import {
  Component,
  OnInit ,
  ViewChild
} from '@angular/core';

import {
  SohoEditorComponent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-editor-demo',
  templateUrl: './editor.demo.html',
  styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
})
export class EditorDemoComponent implements OnInit {

  @ViewChild(SohoEditorComponent) editor: SohoEditorComponent;

  // tslint:disable
  public model = {
    editorText: '<p>Embrace <a href="http://en.wikipedia.org/wiki/e-commerce" class="hyperlink">e-commerce action-items</a>, reintermediate, ecologies paradigms wireless share life-hacks create innovative harness. Evolve solutions rich-clientAPIs synergies harness relationships virtual vertical facilitate end-to-end, wireless, evolve synergistic synergies.</p> <p>Cross-platform, evolve, ROI scale cultivate eyeballs addelivery, e-services content cross-platform leverage extensible viral incentivize integrateAJAX-enabled sticky evolve magnetic cultivate leverage; cutting-edge. Innovate, end-to-end podcasting, whiteboard streamline e-business social; compelling, "cross-media exploit infomediaries innovative integrate integrateAJAX-enabled." Killer interactive reinvent, cultivate widgets leverage morph.</p>'
  };
  // tslint:enable

  public showModel = false;
  public editorDisabled = false;
  public editorReadOnly = false;

  constructor() { }
  ngOnInit() {

    // Customize the buttons on init
    this.editor.buttons = {
          editor: [
            'header1', 'header2',
            'separator', 'bold', 'italic', 'underline', 'strikethrough',
            'separator', 'justifyLeft', 'justifyCenter', 'justifyRight',
            'separator', 'quote', 'orderedlist', 'unorderedlist',
            'separator', 'source'
          ],
          source: [
            'visual'
          ]
        };
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

}
