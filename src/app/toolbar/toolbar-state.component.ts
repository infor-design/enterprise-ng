/*
  A mock component to demonstrate interaction with the toolbar-landmark demo component
 */
import {
  Component,
  OnInit
} from '@angular/core';

import {
  ToolbarStateService,
  LMToolbarButton
} from './toolbar-state.service';

@Component({
    selector: 'toolbar-state-component', // eslint-disable-line
    templateUrl: 'toolbar-state.component.html',
    providers: [ToolbarStateService],
    standalone: false
})
export class ToolbarStateComponent implements OnInit {
  public toolbarInHeader?: boolean;
  public toolbarSectionTitle?: string;
  public toolbarPageTitle?: string;
  public toolbarButtons?: Array<LMToolbarButton>;

  constructor(public toolbarService: ToolbarStateService) { }

  ngOnInit() {
    this.toolbarInHeader = false;
    this.toolbarSectionTitle = 'Toolbar Set One';
    this.toolbarPageTitle = 'Toolbar State Page Title';
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet1();
  }

  onButtonClick1() {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet1();
    this.toolbarSectionTitle = 'Toolbar Set One';
  }

  onButtonClick2() {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet2();
    this.toolbarSectionTitle = 'Toolbar Set Two';
  }

  onButtonClick3() {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet3();
    this.toolbarSectionTitle = 'Toolbar Set Three';
  }

  onOpenDisable() {
    let i = this.toolbarButtons?.length || 0;

    while (i--) {
      const data = JSON.parse((this.toolbarButtons as any)[i].data).btn;
      if (data === 'open') {
        (this.toolbarButtons as any)[i].state.disabled = true;
      }
    }
  }

  onOpenEnable() {
    let i = this.toolbarButtons?.length || 0;

    while (i--) {
      const data = JSON.parse((this.toolbarButtons as any)[i].data).btn;
      if (data === 'open') {
        (this.toolbarButtons as any)[i].state.disabled = false;
      }
    }
  }

  onOpenShow() {
    let i = this.toolbarButtons?.length || 0;

    while (i--) {
      const data = JSON.parse((this.toolbarButtons as any)[i].data).btn;
      if (data === 'open') {
        (this.toolbarButtons as any)[i].state.visible = true;
      }
    }
  }

  onOpenHide() {
    let i = this.toolbarButtons?.length || 0;

    while (i--) {
      const data = JSON.parse((this.toolbarButtons as any)[i].data).btn;
      if (data === 'open') {
        (this.toolbarButtons as any)[i].state.visible = false;
      }
    }
  }
}
