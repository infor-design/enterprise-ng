/*
  A mock component to demonstrate interaction with the toolbar-landmark demo component
 */

import { Component, OnInit } from '@angular/core';
import { ToolbarStateService, LMToolbarButton } from './toolbar-state.service';

@Component({
  selector    : 'toolbar-state-component', // tslint:disable-line
  templateUrl : './toolbar-state.component.html',
  providers: [ ToolbarStateService ]
})
export class ToolbarStateComponent implements OnInit {
  private toolbarInHeader: boolean;
  private toolbarSectionTitle: string;
  private toolbarPageTitle: string;
  private toolbarButtons: Array<LMToolbarButton>;

  constructor(public toolbarService: ToolbarStateService) {}

  ngOnInit() {
    this.toolbarInHeader = false;
    this.toolbarSectionTitle = 'Toolbar State Component 1';
    this.toolbarPageTitle = 'Toolbar State Page Title';
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet1();
  }

  onButtonClick1(event) {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet1();
    this.toolbarSectionTitle = 'Toolbar State Component 1';
  }

  onButtonClick2(event) {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet2();
    this.toolbarSectionTitle = 'Toolbar State Component 2';
  }

  onButtonClick3(event) {
    this.toolbarButtons = this.toolbarService.buildToolbarButtonSet3();
    this.toolbarSectionTitle = 'Toolbar State Component 3';
  }

  onOpenDisable() {
    let i = this.toolbarButtons.length;

    while (i--) {
      const data = JSON.parse(this.toolbarButtons[i].data).btn;
      if (data === 'open') {
        this.toolbarButtons[i].state.disabled = true;
      }
    }
  }

  onOpenEnable() {
    let i = this.toolbarButtons.length;

    while (i--) {
      const data = JSON.parse(this.toolbarButtons[i].data).btn;
      if (data === 'open') {
        this.toolbarButtons[i].state.disabled = false;
      }
    }
  }

  onOpenShow() {
    let i = this.toolbarButtons.length;

    while (i--) {
      const data = JSON.parse(this.toolbarButtons[i].data).btn;
      if (data === 'open') {
        this.toolbarButtons[i].state.visible = true;
      }
    }
  }

  onOpenHide() {
    let i = this.toolbarButtons.length;

    while (i--) {
      const data = JSON.parse(this.toolbarButtons[i].data).btn;
      if (data === 'open') {
        this.toolbarButtons[i].state.visible = false;
      }
    }
  }
}
