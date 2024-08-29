import { Component, OnInit, ViewChild } from '@angular/core';
import { SohoContextMenuDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-context-menu-position',
  templateUrl: './context-menu-position.component.html',
})
export class ContextMenuPositionComponent implements OnInit {
  @ViewChild(SohoContextMenuDirective) contextMenu?: SohoContextMenuDirective;

  constructor() { }

  ngOnInit() { }

  openContextMenu(e: Event) {
    e.preventDefault();
    this.contextMenu?.initializeComponent(e);
  }
}
