import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoTabsComponent } from 'ids-enterprise-ng';

/**
 * This sample:
 * - shows the flash of unassigned content issue when changing the tabs
 * - shows updating the tab title programatically
 * - shows how to get a reference to the SohoTabsComponent to message it's methods
 * - handling an event from the SohoTabComponent
 * - handling change detection to programatically update the soho control
 */
@Component({
  selector: 'app-tabs-dynamic-sample-component',
  templateUrl: 'tabs-dynamic.demo.html',
  standalone: false
})
export class TabsDynamicDemoComponent implements OnInit {

  @ViewChild(SohoTabsComponent, { static: true }) sohoTabsComponent?: SohoTabsComponent;

  public tabs?: Array<any>;
  public currentTabsIndex = 1;
  public currentTabTitleChangeNumber = 1;

  public tabsData: Array<any> =
    [
      [
        { id: 'requests', title: 'Requests', content: 'Exploit niches; enable A-list web-enabled holistic end-to-end. Exploit experiences value-added tagclouds, open-source cross-platform e-tailers, user-contributed, implement! Convergence, solutions front-end, "synergize markets initiatives integrateAJAX-enabled platforms; wireless, supply-chains reinvent, mindshare, synergies implement, drive evolve!" Post incentivize; rich-clientAPIs customized revolutionize 24/365 killer incentivize integrate intuitive utilize!' }, // eslint-disable-line
        { id: 'receipts', title: 'Receipts', content: 'Bricks-and-clicks? Evolve ubiquitous matrix B2B 24/365 vertical 24/365 platforms standards-compliantglobal leverage dynamic 24/365 intuitive ROI seamless rss-capable. Cutting-edge grow morph webservices leverage; ROI, unleash reinvent innovative podcasts citizen-media networking' }, // eslint-disable-line
        { id: 'invoices', title: 'Invoices', content: 'Frictionless webservices, killer open-source innovate, best-of-breed, whiteboard interactive back-end optimize capture dynamic front-end. Initiatives ubiquitous 24/7 enhance channels B2Bdrive frictionless web-readiness generate recontextualize widgets applications. Sexy sticky matrix,  user-centred, rich user-centric: peer-to-peer podcasting networking addelivery optimize streamlineintegrated proactive: granular morph.' } // eslint-disable-line
      ],
      [
        { id: 'information', title: 'Information', content: 'Integrate harness implement social web-readiness. E-business global syndicate integrate, "granular bricks-and-clicks addelivery, communities relationships, networking integrate." Transition, methodologies; 24/7 user-centred Cluetrain efficient; brand synergies; revolutionary synthesize incubate, interactive, enable metrics initiatives applications sexy. Aggregate plug-and-play reinvent, facilitate, reinvent leading-edge syndicate, revolutionize schemas streamline enable interactive, productize viral markets, reinvent; productize wireless; niches vertical applications front-end.' },  // eslint-disable-line
        { id: 'cash', title: 'Cash', content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.' }  // eslint-disable-line
      ],
      [
        { id: 'lorem', title: 'Lorem', content: 'Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.' },  // eslint-disable-line
        { id: 'ipsum', title: 'Ipsum', content: 'Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old' }  // eslint-disable-line
      ],
      [
        { id: 'paper-plates', title: 'Paper Plates', content: 'Disintermediate enterprise ecologies revolutionize 24/365 mesh embedded feeds webservices world-class rss-capable innovative; e-business empower user-centric best-of-breed architect customized create." Bandwidth peer-to-peer user-centric share communities, rss-capable turn-key metrics deliverables productize robust integrate seize harness platforms killer, facilitate A-list 24/7 deliver tag. Reinvent viral scale leading-edge networking solutions web-readiness.' }, // eslint-disable-line
        { id: 'paper-bags', title: 'Paper Bags', content: 'Podcasts e-enable, robust viral rich-clientAPIs widgets cutting-edge strategic embedded integrateAJAX-enabled matrix proactive architect, "experiences, scale streamline." Open-source standards-compliant infomediaries visionary systems user-centred applications.' },  // eslint-disable-line
        { id: 'plastic-plates', title: 'Plastic Plates', content: 'Widgets remix, strategic holistic bandwidth, maximize deliver innovate infrastructures disintermediate channels. Reinvent; long-tail impactful target exploit e-business mashups, clicks-and-mortar front-end efficient scalable B2B tagclouds bricks-and-clicks--proactive web-enabled value, webservices. Generate dot-com networking standards-compliant integrateAJAX-enabled dynamic real-time widgets extensible convergence, "e-tailers iterate mesh; next-generation." Aggregate wireless networks exploit, iterate e-tailers impactful turn-key podcasts long-tail integrate platforms morph' }, // eslint-disable-line
        { id: 'plastic-bags', title: 'Plastic Bags', content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.' }, // eslint-disable-line
        { id: 'creditcards', title: 'Credit Cards', content: 'Virtual supply-chains rich users iterate magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' } // eslint-disable-line
      ]
    ];

  constructor() { }

  ngOnInit() {
    this.tabs = this.tabsData[this.currentTabsIndex];
  }

  onChangeTabs() {
    this.currentTabsIndex++;
    if (this.currentTabsIndex >= this.tabsData.length) {
      this.currentTabsIndex = 0;
    }

    this.tabs = this.tabsData[this.currentTabsIndex];
    this.currentTabTitleChangeNumber = 1;

    this.sohoTabsComponent?.refresh();
  }

  onChangeTitles() {
    if (!this.tabs) {
      return;
    }
    for (let i = 0; i < this.tabs.length; i++) {
      // ----------------------------------------------------------------------
      // Calling setTitle on the soho component/control so that the entire
      // tabset doesn't have to be rebuilt and hence cause a FOUC.
      // ----------------------------------------------------------------------
      this.sohoTabsComponent?.rename(
        this.tabs[i].id,
        this.tabs[i].title + ' Title Change ' + this.currentTabTitleChangeNumber);
    }

    this.currentTabTitleChangeNumber++;
    this.sohoTabsComponent?.refresh();
  }

  onActivated(event: SohoTabsEvent) {
    setTimeout(() => {
      console.log('selected tab is: ' + event.tab);
    }, 1);
  }

  onTabActivated(event: any) {
    console.log(event.tab + " TabsBasicDemoComponent.onTabActivated");  
  }

  cnt = 0;

  onAddTab() {
    this.cnt++;
    this.tabs?.push({ id: `dynamic-${this.cnt}`, dismissible: true, title: 'Newly Added Tab', 
      content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' });
  }

  onAddTabV2() {
    if (this.tabs) {
      this.cnt++;
      this.tabs = [
        ...this.tabs,
        { id: `dynamic-${this.cnt}`, dismissible: true, title: 'Newly Added Tab', 
          content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' 
        }
      ]
    }
  }
}
