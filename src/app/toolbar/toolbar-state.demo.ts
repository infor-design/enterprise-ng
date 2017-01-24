import {
  Component,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';

import { LMToolbarButton } from './toolbar-state.service';
import { SohoToolbarComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'toolbar-state-demo', // tslint:disable-line
  templateUrl: './toolbar-state.demo.html'
})
export class ToolbarStateDemoComponent implements OnInit {

  public _inHeader: boolean;
  public _sectionTitle: string;
  public _pageTitle: string;
  public _buttons: Array<LMToolbarButton>;
  public _maxVisibleButtons: number;

  @ViewChild('SohoToolbarComponent') sohoToolbar: SohoToolbarComponent;

  @Input() set inHeader(param: boolean) {
    this._inHeader = param;
  }

  @Input() set sectionTitle(sectionTitle: string) {
    this._sectionTitle = sectionTitle;
  }

  @Input() set pageTitle(pageTitle: string) {
    this._pageTitle = pageTitle;
  }

  @Input() set buttons(buttons: Array<LMToolbarButton>) {
    this._buttons = buttons;

    if (this.sohoToolbar) {
      setTimeout(() => {
        this.sohoToolbar.updated();
      }, 1);
    }
  }

  ngOnInit() {
    this._maxVisibleButtons = this._buttons.length;
  }
}
