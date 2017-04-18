import {
  Component,
  OnInit
} from '@angular/core';

/**
 * This sample:
 * - shows how to build a soho-tabs angular template using a data structure.
 * - binding a method to a soho event
 */
@Component({
  selector: 'soho-tabs-datadriven-demo',
  templateUrl: './tabs-datadriven.demo.html',
})
export class TabsDataDrivenDemoComponent implements OnInit {

  public tabs: Array<{id: string, title: string, content: string}>;

  ngOnInit() {
    this.tabs = [
      { id: 'requests', title: 'Requests', content: 'Exploit niches; enable A-list web-enabled holistic end-to-end. Exploit experiences value-added tagclouds, open-source cross-platform e-tailers, user-contributed, implement! Convergence, solutions front-end, "synergize markets initiatives integrateAJAX-enabled platforms; wireless, supply-chains reinvent, mindshare, synergies implement, drive evolve!" Post incentivize; rich-clientAPIs customized revolutionize 24/365 killer incentivize integrate intuitive utilize!' }, // tslint:disable-line
      { id: 'receipts', title: 'Receipts', content: 'Bricks-and-clicks? Evolve ubiquitous matrix B2B 24/365 vertical 24/365 platforms standards-compliant global leverage dynamic 24/365 intuitive ROI seamless rss-capable. Cutting-edge grow morph web services leverage; ROI, unleash reinvent innovative podcasts citizen-media networking' }, // tslint:disable-line
      { id: 'invoices', title: 'Invoices', content: 'Frictionless webservices, killer open-source innovate, best-of-breed, whiteboard interactive back-end optimize capture dynamic front-end. Initiatives ubiquitous 24/7 enhance channels B2B drive frictionless web-readiness generate recontextualize widgets applications. Sexy sticky matrix, user-centred, rich user-centric: peer-to-peer podcasting networking addelivery optimize streamline integrated proactive: granular morph.' } // tslint:disable-line
    ];
  }

  onTabActivated(event) {
    console.log(event.tab + ' TabsDataDrivenDemoComponent.onTabActivated');
  }
}
