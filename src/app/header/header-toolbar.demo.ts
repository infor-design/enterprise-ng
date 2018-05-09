import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderDynamicToolbarOptions } from '../header/header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-toolbar-header-demo',
  templateUrl: './header-toolbar.demo.html'
})
export class HeaderToolbarDemoComponent implements AfterViewInit, OnDestroy {

  public lastToolbarEvent: any;
  public buttonClickedSubscription: Subscription;
  public isShowingHeaderToolbar = true;
  public isShowingHeaderTabs = false;

  private toolbarOptions: HeaderDynamicToolbarOptions = {
    toolbarButtons: [
      { id: 'Create', text: 'Create', icon: 'add', data: '{\'btn\': \'create\'}' },
      {
        id: 'charts-btn', icon: 'pie-chart', data: '{\'btn\': \'charts\'}', menu:
          [
            { id: 'pie', text: 'Pie Chart', data: '{\'menu\': \'pie\'}' },
            { id: 'line', text: 'Line Chart', data: '{\'menu\': \'line\'}' },
            { id: 'bubble', text: 'Bubble Chart', data: '{\'menu\': \'bubble\'}' }
          ]
      },
      { id: 'update-btn', text: 'Open', icon: 'folder', data: '{\'btn\': \'update\'}' },
      { id: 'delete-btn', text: 'Delete', icon: 'delete', data: '{\'btn\': \'delete\'}' },
      { id: 'refresh-btn', text: 'Refresh', icon: 'refresh', data: '{\'btn\': \'refresh\'}' }
    ]
  };

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) { }

  ngAfterViewInit() {
    this.showHeaderToolbar();
  }

  ngOnDestroy() {
    this.removeHeaderToolbar();
  }

  onToggleHeaderToolbar(event: any) {
    this.sohoHeaderRef.instance.hasHeaderToolbar ?
      this.removeHeaderToolbar() :
      this.showHeaderToolbar();
  }

  onToolbarButtonClicked(event: any) {
    this.lastToolbarEvent = event;
  }

  /**
   * Show the header toolbar.
   * Set Input using toolbarOptions to have the header toolbar display.
   */
  private showHeaderToolbar() {
    if (!this.sohoHeaderRef.instance.hasHeaderToolbar) {
      this.sohoHeaderRef.instance.sectionTitle = 'Header Toolbar Demo';
      this.sohoHeaderRef.instance.toolbarOptions = this.toolbarOptions;
      this.buttonClickedSubscription = this.sohoHeaderRef.instance.sohoToolbarComponent.selected.subscribe(event =>
        this.onToolbarButtonClicked(event));
    }
  }

  /**
   * put the default header toolbar back.
   */
  private removeHeaderToolbar() {
    if (this.sohoHeaderRef.instance.hasHeaderToolbar) {
      this.sohoHeaderRef.instance.sectionTitle = null;
      this.sohoHeaderRef.instance.toolbarOptions = undefined;
      this.buttonClickedSubscription.unsubscribe();
    }
  }
}
