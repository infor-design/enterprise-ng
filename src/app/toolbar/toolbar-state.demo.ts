import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { LMToolbarButton } from './toolbar-state.service';
// @ts-ignore
import { SohoToolbarComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'toolbar-state-demo', // eslint-disable-line
    templateUrl: 'toolbar-state.demo.html',
    standalone: false
})
export class ToolbarStateDemoComponent implements AfterViewChecked, OnInit {

  public _inHeader?: boolean;
  public _sectionTitle?: string;
  public _pageTitle?: string;
  public _buttons?: Array<LMToolbarButton>;
  public _maxVisibleButtons?: number;
  private updateToolbar = false;

  @ViewChild('SohoToolbarComponent', { static: true }) sohoToolbar?: SohoToolbarComponent;

  @Input() set inHeader(param: boolean) {
    this._inHeader = param;
  }

  @Input() set sectionTitle(sectionTitle: string) {
    this._sectionTitle = sectionTitle;
    this.updateToolbar = true;
  }

  @Input() set pageTitle(pageTitle: string) {
    this._pageTitle = pageTitle;
    this.updateToolbar = true;
  }

  @Input() set buttons(buttons: Array<LMToolbarButton>) {
    this._buttons = buttons;
    this._maxVisibleButtons = this._buttons.length;
    this.updateToolbar = true;
  }

  ngOnInit() {
    this._maxVisibleButtons = this._buttons?.length;
  }

  ngAfterViewChecked() {
    if (this.updateToolbar) {
      this.sohoToolbar?.updated();
      this.updateToolbar = false;
    }
  }
}
