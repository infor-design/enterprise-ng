
import {
  Component,
  DoCheck,
  IterableDiffer,
  IterableDiffers,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  TABS_DIRECTIVES,
  SohoTabsComponent,
  TabsEvent,
  SohoButtonComponent
} from '../.';

/**
 * This sample:
 * - shows the flash of unassigned content issue when changing the tabs
 * - shows updating the tab title programatically
 * - shows how to get a reference to the SohoTabsComponent to message it's methods
 * - handling an event from the SohoTabComponent
 * - handling change detection to programatically update the soho control
 */
@Component({
  moduleId: module.id,
  selector: 'tabs-dynamic-sample-component',
  templateUrl: './tabs-dynamic.demo.html',
  directives: [ TABS_DIRECTIVES, SohoButtonComponent ]
})
export class TabsDynamicDemoComponent implements DoCheck, OnInit {

  @ViewChild(SohoTabsComponent) sohoTabsComponent: SohoTabsComponent;

  private tabs: Array<any>;
  private currentTabsIndex: number = 1;
  private currentTabTitleChangeNumber: number = 1;
  private tabsArrayDiffer: IterableDiffer;

  private tabsData: Array<any> =
    [
      [
        { id: 'requests', title: 'Requests', content: 'Exploit niches; enable A-list web-enabled holistic end-to-end. Exploit experiences value-added tagclouds, open-source cross-platform e-tailers, user-contributed, implement! Convergence, solutions front-end, "synergize markets initiatives integrateAJAX-enabled platforms; wireless, supply-chains reinvent, mindshare, synergies implement, drive evolve!" Post incentivize; rich-clientAPIs customized revolutionize 24/365 killer incentivize integrate intuitive utilize!' }, // tslint:disable-line
        { id: 'receipts', title: 'Receipts', content: 'Bricks-and-clicks? Evolve ubiquitous matrix B2B 24/365 vertical 24/365 platforms standards-compliantglobal leverage dynamic 24/365 intuitive ROI seamless rss-capable. Cutting-edge grow morph webservices leverage; ROI, unleash reinvent innovative podcasts citizen-media networking' }, // tslint:disable-line
        { id: 'invoices', title: 'Invoices', content: 'Frictionless webservices, killer open-source innovate, best-of-breed, whiteboard interactive back-end optimize capture dynamic front-end. Initiatives ubiquitous 24/7 enhance channels B2Bdrive frictionless web-readiness generate recontextualize widgets applications. Sexy sticky matrix,  user-centred, rich user-centric: peer-to-peer podcasting networking addelivery optimize streamlineintegrated proactive: granular morph.' } // tslint:disable-line
      ],
      [
        { id: 'information', title: 'Information', content: 'Integrate harness implement social web-readiness. E-business global syndicate integrate, "granular bricks-and-clicks addelivery, communities relationships, networking integrate." Transition, methodologies; 24/7 user-centred Cluetrain efficient; brand synergies; revolutionary synthesize incubate, interactive, enable metrics initiatives applications sexy. Aggregate plug-and-play reinvent, facilitate, reinvent leading-edge syndicate, revolutionize schemas streamline enable interactive, productize viral markets, reinvent; productize wireless; niches vertical applications front-end.' },  // tslint:disable-line
        { id: 'cash',        title: 'Cash',        content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.'}  // tslint:disable-line
      ],
      [
        { id: 'paper-plates',   title: 'Paper Plates',   content: 'Disintermediate enterprise ecologies revolutionize 24/365 mesh embedded feeds webservices world-class rss-capable innovative; e-business empower user-centric best-of-breed architect customized create." Bandwidth peer-to-peer user-centric share communities, rss-capable turn-key metrics deliverables productize robust integrate seize harness platforms killer, facilitate A-list 24/7 deliver tag. Reinvent viral scale leading-edge networking solutions web-readiness.' }, // tslint:disable-line
        { id: 'paper-bags',     title: 'Paper Bags',     content: 'Podcasts e-enable, robust viral rich-clientAPIs widgets cutting-edge strategic embedded integrateAJAX-enabled matrix proactive architect, "experiences, scale streamline." Open-source standards-compliant infomediaries visionary systems user-centred applications.' },  // tslint:disable-line}
        { id: 'plastic-plates', title: 'Plastic Plates', content: 'Widgets remix, strategic holistic bandwidth, maximize deliver innovate infrastructures disintermediate channels. Reinvent; long-tail impactful target exploit e-business mashups, clicks-and-mortar front-end efficient scalable B2B tagclouds bricks-and-clicks--proactive web-enabled value, webservices. Generate dot-com networking standards-compliant integrateAJAX-enabled dynamic real-time widgets extensible convergence, "e-tailers iterate mesh; next-generation." Aggregate wireless networks exploit, iterate e-tailers impactful turn-key podcasts long-tail integrate platforms morph' }, // tslint:disable-line
        { id: 'plastic-bags',   title: 'Plastic Bags',   content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.'}, // tslint:disable-line
        { id: 'creditcards',    title: 'Credit Cards',   content: 'Virtual supply-chains rich users iterate magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' } // tslint:disable-line
      ]
    ];

  constructor(private iterableDiffers: IterableDiffers) {
    this.tabsArrayDiffer = this.iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    this.tabs = this.tabsData[this.currentTabsIndex];
  }

  ngDoCheck() {
    if (!this.sohoTabsComponent) {
      return;
    }

    let changes = this.tabsArrayDiffer.diff(this.tabs);
    if (changes) {
      // ----------------------------------------------------------------------
      // place into timeout so the template can have a chance to process
      // and get placed into teh sohoTabsComponent before we call update.
      // ISSUE: this causes a FOUC
      // ----------------------------------------------------------------------
      setTimeout((sohoTabsComponent: SohoTabsComponent) => {
        sohoTabsComponent.updated(); }, 1, this.sohoTabsComponent);
    }
  }

  onChangeTabs(event: TabsEvent) {
    this.currentTabsIndex++;
    if (this.currentTabsIndex >= this.tabsData.length) {
      this.currentTabsIndex = 0;
    }

    this.tabs = this.tabsData[this.currentTabsIndex];
    this.currentTabTitleChangeNumber = 1;

    // ----------------------------------------------------------------------
    // expect change detection to message our ngDoChange and then we
    // can update the soho control based on tabs changes.
    // ----------------------------------------------------------------------
  }

  onChangeTitles(event: TabsEvent) {
    for (let i = 0; i < this.tabs.length; i++) {
      // ----------------------------------------------------------------------
      // Calling setTitle on the soho component/control so that the entire
      // tabset doesn't have to be rebuilt and hence cause a FOUC.
      // ----------------------------------------------------------------------
      this.sohoTabsComponent.rename(
        this.tabs[i].id,
        this.tabs[i].title + ' Title Change ' + this.currentTabTitleChangeNumber);
    }

    this.currentTabTitleChangeNumber++;
  }
}
