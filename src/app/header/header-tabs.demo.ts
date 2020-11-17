import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnDestroy,
} from '@angular/core';
import { HeaderDynamicTabsetOptions } from '../header/header-dynamic-demo.model';
import { HeaderDynamicDemoRefService } from './header-dynamic-demo-ref.service';

@Component({
  selector: 'app-tabs-header-demo',
  templateUrl: 'header-tabs.demo.html'
})
export class HeaderTabsDemoComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  public currentTabsOptions: HeaderDynamicTabsetOptions = undefined;
  private showHeaderTabs;

  constructor(private sohoHeaderRef: HeaderDynamicDemoRefService) {}

  ngAfterViewInit() {
    // ------------------------------------------------------------------------
    // After the view has been initialized then build and set the header tabs.
    // ------------------------------------------------------------------------
    setTimeout(() => this.showHeaderTabs = true);
  }

  get isShowingHeaderTabs(): boolean {
    return !!this.sohoHeaderRef.instance.hasHeaderTabs;
  }

  ngOnDestroy() {
    // ------------------------------------------------------------------------
    // When the view is destroyed remove the header tabs.
    // ------------------------------------------------------------------------
    this.showTabs(false);
  }

  onToggleHeaderTabs($event) {
    this.showHeaderTabs = !this.isShowingHeaderTabs;
  }

  ngAfterViewChecked(): void {
    if (this.showHeaderTabs && !this.isShowingHeaderTabs) {
      setTimeout(() => this.showTabs(true));
    }

    if (!this.showHeaderTabs && this.isShowingHeaderTabs) {
      setTimeout(() => this.showTabs(true));
    }
  }

  showTabs(showTabs: boolean): void {
    this.currentTabsOptions = showTabs ? this.tabOptions : undefined;
    this.sohoHeaderRef.instance.sectionTitle = showTabs ? 'Header Tabs Demo' : null;
    this.sohoHeaderRef.instance.tabOptions = this.currentTabsOptions;
  }

  private tabOptions: HeaderDynamicTabsetOptions = {
    tabs: [
      { id: 'paper-plates',   title: 'Paper Plates',   content: 'Disintermediate enterprise ecologies revolutionize 24/365 mesh embedded feeds webservices world-class rss-capable innovative; e-business empower user-centric best-of-breed architect customized create." Bandwidth peer-to-peer user-centric share communities, rss-capable turn-key metrics deliverables productize robust integrate seize harness platforms killer, facilitate A-list 24/7 deliver tag. Reinvent viral scale leading-edge networking solutions web-readiness.' }, // eslint-disable-line
      { id: 'paper-bags',     title: 'Paper Bags',     content: 'Podcasts e-enable, robust viral rich-clientAPIs widgets cutting-edge strategic embedded integrateAJAX-enabled matrix proactive architect, "experiences, scale streamline." Open-source standards-compliant infomediaries visionary systems user-centred applications.' },  // eslint-disable-line
      { id: 'plastic-plates', title: 'Plastic Plates', content: 'Widgets remix, strategic holistic bandwidth, maximize deliver innovate infrastructures disintermediate channels. Reinvent; long-tail impactful target exploit e-business mashups, clicks-and-mortar front-end efficient scalable B2B tagclouds bricks-and-clicks--proactive web-enabled value, webservices. Generate dot-com networking standards-compliant integrateAJAX-enabled dynamic real-time widgets extensible convergence, "e-tailers iterate mesh; next-generation." Aggregate wireless networks exploit, iterate e-tailers impactful turn-key podcasts long-tail integrate platforms morph' }, // eslint-disable-line
      { id: 'plastic-bags',   title: 'Plastic Bags',   content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.'}, // eslint-disable-line
      { id: 'creditcards',    title: 'Credit Cards',   content: 'Virtual supply-chains rich users iterate magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' } // eslint-disable-line
    ],
    containerElementSelector: '#header-demo-tab-panels'
  };
}
