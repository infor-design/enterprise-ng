import {
  AfterViewInit,
  Component,
  OnDestroy,
  Optional
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  TOOLBAR_DIRECTIVES
} from '../../components/toolbar';

import {
ToolbarOptions,
  SohoToolbarButtonOptions
} from '../header/header-dynamic-demo.model';

import { SohoButtonComponent } from '../../components/button';
import { SohoHeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-toolbar-header-demo',
  templateUrl: 'toolbar-header.demo.html',
  directives: [
    TOOLBAR_DIRECTIVES,
    SohoButtonComponent
  ]
})
export class ToolbarHeaderDemoComponent implements AfterViewInit, OnDestroy {

  private toolbarOptions: ToolbarOptions;
  private lastToolbarEvent: any;
  private buttonClickedSubscription: Subscription;

  constructor(@Optional() private sohoHeaderRef: SohoHeaderDynamicDemoRefService) {}

  ngAfterViewInit() {
    this.showHeaderToolbar();
  }

  ngOnDestroy() {
    this.removeHeaderToolbar();
  }

  onToolbarButtonClicked(event: any) {
    this.lastToolbarEvent = event;
  }

  get isShowingHeaderToolbar(): boolean {
    return !!this.sohoHeaderRef.instance.toolbarOptions;
  }

  protected onUseHeaderToolbar(event: any) {
    this.showHeaderToolbar();
  }

  protected onUseDefaultToolbar(Event: any) {
    this.removeHeaderToolbar();
  }

  /**
   * Show the header toolbar.
   * Set Input using toolbarOptions to have the header toolbar display.
   */
  private showHeaderToolbar() {
    this.sohoHeaderRef.instance.sectionTitle = 'Header Toolbar Demo';
    this.sohoHeaderRef.instance.toolbarOptions = this.buildToolbarOptions();
    this.buttonClickedSubscription = this.sohoHeaderRef.instance.sohoToolbarComponent.buttonClicked.subscribe(event =>
      this.onToolbarButtonClicked(event));
  }

  /**
   * put the default header toolbar back.
   */
  private removeHeaderToolbar() {
    // ----------------------------------------------------------------
    // set Input using toolbarOptions instead of using a template.
    // this.sohoHeaderRef.instance.showHeaderToolbar = false;
    // ----------------------------------------------------------------
    this.sohoHeaderRef.instance.sectionTitle = null;
    this.sohoHeaderRef.instance.toolbarOptions = undefined;

    // todo ppatton how do I unsubscribe from an Observable?
    // this.buttonClickedSubscription.unsubscribe();
  }

  private buildToolbarOptions(): ToolbarOptions {
    this.toolbarOptions = <ToolbarOptions>{};
    this.toolbarOptions.toolbarButtons = this.buildToolbarButtonArray();
    return this.toolbarOptions;
  }

  private buildToolbarButtonArray(): Array<SohoToolbarButtonOptions> {
    let toolbarButtons: Array<SohoToolbarButtonOptions> = [];

    toolbarButtons.push({ id: 'Create', text: 'Create', icon: 'add', data: '{\'btn\': \'create\'}' });
    toolbarButtons.push({ id: 'charts-btn', icon: 'pie-chart', data: '{\'btn\': \'charts\'}', menu: [
        { id: 'pie',    text: 'Pie Chart',    data: '{\'menu\': \'pie\'}' },
        { id: 'line',   text: 'Line Chart',   data: '{\'menu\': \'line\'}' },
        { id: 'bubble', text: 'Bubble Chart', data: '{\'menu\': \'bubble\'}' }
      ]
    });
    toolbarButtons.push({ id: 'update-btn',  text: 'Open',    icon: 'folder',  data: '{\'btn\': \'update\'}' });
    toolbarButtons.push({ id: 'delete-btn',  text: 'Delete',  icon: 'delete',  data: '{\'btn\': \'delete\'}' });
    toolbarButtons.push({ id: 'refresh-btn', text: 'Refresh', icon: 'refresh', data: '{\'btn\': \'refresh\'}' });

    return toolbarButtons;
  }
}
