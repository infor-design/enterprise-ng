import {
  Component,
  HostBinding,
  Input,
  ViewChild
} from '@angular/core';
import { SohoToolbarOptions } from './header-dynamic-demo.model';
import { SohoHeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-header-dynamic-demo',
  templateUrl: 'header-dynamic.demo.html'
})
export class SohoHeaderDynamicDemoComponent {
  @HostBinding('class.header') get isHeader() { return true; };
  @HostBinding('class.is-personalizable') get isPersonalizable() { return true; };
  @HostBinding('class.has-toolbar') get hasHeaderToolbar() { return true; };

  /**
   * Had to use a template variable to get the selector to work.
   *
   * TODO ppatton These other ViewChild query selectors are failing for me
   *   By Type: @ViewChild(SohoToolbarComponent)   -
   *   By element: @ViewChild('soho-toolbar')
   * Neither of these are working. investigate.
   */
  @ViewChild('appDynamicHeaderToolbar') sohoToolbarComponent: any;

  /**
   * The current screen title
   */
  @Input() sectionTitle: string;

  /**
   * Set the toolbar using TabOptions
   */
  @Input() set toolbarOptions(options: SohoToolbarOptions) {
    this.currentToolbarOptions = options;
    if (this.sohoToolbarComponent) {
      setTimeout(() => this.sohoToolbarComponent.updated());
    }
  }

  /**
   * Used by the component template to decide when to display the toolbar.
   * @type {any}
   */
  private currentToolbarOptions: SohoToolbarOptions = null;

  constructor(private headerRef: SohoHeaderDynamicDemoRefService) {
    this.headerRef.instance = this;
  }

  /**
   * Get the current toolbar options.
   * @returns {SohoToolbarOptions}
   */
  get toolbarOptions(): SohoToolbarOptions {
    return this.currentToolbarOptions;
  }
}
