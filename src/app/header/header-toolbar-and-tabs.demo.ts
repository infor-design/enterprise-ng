import {
  AfterViewInit,
  Component,
  OnDestroy,
} from '@angular/core';
import {
  HeaderDynamicTabsetOptions, HeaderDynamicToolbarOptions
} from '../header/header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';

@Component({
  selector: 'soho-toolbar-tabs-header-demo',
  templateUrl: './header-toolbar-and-tabs.demo.html'
})
export class HeaderToolbarAndTabsDemoComponent implements AfterViewInit, OnDestroy {

  public currentTabsOptions: HeaderDynamicTabsetOptions = undefined;

  public get isShowingHeaderToolbar(): boolean {
    return this.sohoHeaderRef.instance.toolbarOptions !== undefined;
  }

  public get isShowingHeaderTabs(): boolean {
    return this.currentTabsOptions !== undefined;
  }

  public tabsOptions: HeaderDynamicTabsetOptions = {
    tabs: [
      { id: 'paper-plates', title: 'Paper Plates', content: 'Disintermediate enterprise ecologies revolutionize 24/365 mesh embedded feeds webservices world-class rss-capable innovative; e-business empower user-centric best-of-breed architect customized create." Bandwidth peer-to-peer user-centric share communities, rss-capable turn-key metrics deliverables productize robust integrate seize harness platforms killer, facilitate A-list 24/7 deliver tag. Reinvent viral scale leading-edge networking solutions web-readiness.' }, // tslint:disable-line
      { id: 'paper-bags', title: 'Paper Bags', content: 'Podcasts e-enable, robust viral rich-clientAPIs widgets cutting-edge strategic embedded integrateAJAX-enabled matrix proactive architect, "experiences, scale streamline." Open-source standards-compliant infomediaries visionary systems user-centred applications.' },  // tslint:disable-line
      { id: 'plastic-plates', title: 'Plastic Plates', content: 'Widgets remix, strategic holistic bandwidth, maximize deliver innovate infrastructures disintermediate channels. Reinvent; long-tail impactful target exploit e-business mashups, clicks-and-mortar front-end efficient scalable B2B tagclouds bricks-and-clicks--proactive web-enabled value, webservices. Generate dot-com networking standards-compliant integrateAJAX-enabled dynamic real-time widgets extensible convergence, "e-tailers iterate mesh; next-generation." Aggregate wireless networks exploit, iterate e-tailers impactful turn-key podcasts long-tail integrate platforms morph' }, // tslint:disable-line
      { id: 'plastic-bags', title: 'Plastic Bags', content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.' }, // tslint:disable-line
      { id: 'creditcards', title: 'Credit Cards', content: 'Virtual supply-chains rich users iterate magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' } // tslint:disable-line
    ],
    containerElementSelector: '#header-demo-tab-panels'
  };

  public toolbarOptions: HeaderDynamicToolbarOptions = {
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
    // ------------------------------------------------------------------------
    // After the view has been initialized then build and set the header tabs.
    // ------------------------------------------------------------------------
    this.showHeaderToolbarAndTabs();
  }

  ngOnDestroy() {
    // ------------------------------------------------------------------------
    // When the view is destroyed remove the header tabs.
    // todo ppatton do this when route is "unloaded" instead of using destroy?
    // ------------------------------------------------------------------------
    this.removeHeaderToolbarAndTabs();
  }

  onToggleHeaderTabs() {
    this.sohoHeaderRef.instance.hasHeaderTabs ?
      this.removeHeaderTabs() :
      this.showHeaderTabs();
  }

  onToggleHeaderToolbar() {
    this.sohoHeaderRef.instance.hasHeaderToolbar ?
      this.removeHeaderToolbar() :
      this.showHeaderToolbar();
  }

  private showHeaderToolbarAndTabs() {
    this.sohoHeaderRef.instance.sectionTitle = 'Header Toolbar And Tabs Demo';

    if (!this.sohoHeaderRef.instance.hasHeaderTabs) {
      this.showHeaderTabs();
    }

    if (!this.sohoHeaderRef.instance.hasHeaderToolbar) {
      this.showHeaderToolbar();
    }
  }

  private removeHeaderToolbarAndTabs() {
    this.sohoHeaderRef.instance.sectionTitle = null;

    if (this.sohoHeaderRef.instance.hasHeaderTabs) {
      this.removeHeaderTabs();
    }

    if (this.sohoHeaderRef.instance.hasHeaderToolbar) {
      this.removeHeaderToolbar();
    }
  }

  /**
   * Show the header toolbar.
   * Set Input using toolbarOptions to have the header toolbar display.
   */
  private showHeaderToolbar() {
    this.sohoHeaderRef.instance.toolbarOptions = this.toolbarOptions;
  }

  /**
   * put the default header toolbar back.
   */
  private removeHeaderToolbar() {
    this.sohoHeaderRef.instance.toolbarOptions = undefined;
  }

  /**
   * Show the header toolbar.
   * Set Input using toolbarOptions to have the header toolbar display.
   */
  private showHeaderTabs() {
    if (!this.sohoHeaderRef.instance.hasHeaderTabs) {
      this.currentTabsOptions = this.tabsOptions;
      this.sohoHeaderRef.instance.tabOptions = this.currentTabsOptions;
    }
  }

  /**
   * put the default header toolbar back.
   */
  private removeHeaderTabs() {
    // ----------------------------------------------------------------
    // set Input using toolbarOptions instead of using a template.
    // this.sohoHeaderRef.instance.showHeaderToolbar = false;
    // ----------------------------------------------------------------
    if (this.sohoHeaderRef.instance.hasHeaderTabs) {
      this.currentTabsOptions = undefined;
      this.sohoHeaderRef.instance.tabOptions = undefined;
    }
  }
}
