import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { HeaderDynamicToolbarOptions } from '../header/header-dynamic-demo.model';
import { SohoButtonComponent } from '../../components/button';
import { HeaderDynamicDemoRefService } from '../header/header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-toolbar-header-demo',
  templateUrl: 'header-toolbar.demo.html',
  directives: [ SohoButtonComponent ]
})
export class HeaderToolbarDemoComponent implements AfterViewInit, OnDestroy {

  private toolbarOptions: HeaderDynamicToolbarOptions;
  private lastToolbarEvent: any;
  private buttonClickedSubscription: Subscription;

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {}

  ngAfterViewInit() {
    this.showHeaderToolbar();
  }

  ngOnDestroy() {
    this.removeHeaderToolbar();
  }

  onToggleHeaderToolbar(event: any) {
    this.isShowingHeaderToolbar ?
      this.removeHeaderToolbar() :
      this.showHeaderToolbar();
  }

  onToolbarButtonClicked(event: any) {
    this.lastToolbarEvent = event;
  }

  get isShowingHeaderToolbar(): boolean {
    return !!this.sohoHeaderRef.instance.toolbarOptions;
  }

  /**
   * Show the header toolbar.
   * Set Input using toolbarOptions to have the header toolbar display.
   */
  private showHeaderToolbar() {
    if (!this.isShowingHeaderToolbar) {
      this.sohoHeaderRef.instance.sectionTitle = 'Header Toolbar Demo';
      this.sohoHeaderRef.instance.toolbarOptions = this.buildToolbarOptions();
      this.buttonClickedSubscription = this.sohoHeaderRef.instance.sohoToolbarComponent.buttonClicked.subscribe(event =>
        this.onToolbarButtonClicked(event));
    }
  }

  /**
   * put the default header toolbar back.
   */
  private removeHeaderToolbar() {
    if (this.isShowingHeaderToolbar) {
      this.sohoHeaderRef.instance.sectionTitle = null;
      this.sohoHeaderRef.instance.toolbarOptions = undefined;
      this.buttonClickedSubscription.unsubscribe();
    }
  }

  private buildToolbarOptions(): HeaderDynamicToolbarOptions {
    this.toolbarOptions = <HeaderDynamicToolbarOptions> {
      toolbarButtons: [
        { id: 'Create', text: 'Create', icon: 'add', data: '{\'btn\': \'create\'}' },
        { id: 'charts-btn', icon: 'pie-chart', data: '{\'btn\': \'charts\'}', menu:
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

    return this.toolbarOptions;
  }
}
