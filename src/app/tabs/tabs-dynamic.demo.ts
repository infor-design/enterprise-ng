import {
  ChangeDetectorRef,
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
  public currentTabsIndex = 0;
  public currentTabTitleChangeNumber = 1;

  public tabsData: Array<any> =
    [
      [
        { id: 'information',
          title: 'Information',
          isDismissible: true,
          content: 'Integrate harness implement social web-readiness. E-business global syndicate integrate, "granular bricks-and-clicks addelivery, communities relationships, networking integrate." Transition, methodologies; 24/7 user-centred Cluetrain efficient; brand synergies; revolutionary synthesize incubate, interactive, enable metrics initiatives applications sexy. Aggregate plug-and-play reinvent, facilitate, reinvent leading-edge syndicate, revolutionize schemas streamline enable interactive, productize viral markets, reinvent; productize wireless; niches vertical applications front-end.'
        },  // eslint-disable-line
        { 
          id: 'cash',
          title: 'Cash',
          isDismissible: true,
          content: 'Back-end e-services end-to-end streamline portals methodologies post relationships enable e-markets users B2B, paradigms monetize eyeballs. Rich front-end, "dynamic webservices users revolutionary enterprise wireless capture orchestrate blogging; synergize; mindshare models engage!" Portals networkeffects mission-critical embrace, orchestrate, incentivize; relationships, platforms incentivize. Scalable applications world-class beta-test, target synergies frictionless synergies evolve web-readiness niches incentivize orchestrate.'
        }  // eslint-disable-line
      ]
    ];

  sequenceId = 0;

  onGenerateSequenceId() {
    if (this.tabs) {
      this.sequenceId = this.tabs.length + 1;
    }
  }

  onGetNextSequenceId() {
    this.sequenceId++;
    return this.sequenceId;
  }

  constructor(private ref: ChangeDetectorRef) { 
  }

  ngOnInit() {
    this.tabs = this.tabsData[this.currentTabsIndex];
    this.onGenerateSequenceId();
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

  onAddTab() {
    const id = this.onGetNextSequenceId() - 1;
    const tabId = `tab-${id}`;
    const tabTitle = `Tab-${id}`;
    const tabContent = 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.';
    const option = {
      name: tabTitle,
      content: tabContent,
      isDismissible: true,
    }
    this.sohoTabsComponent?.add(tabId, option, id);
  }

  onAddTabPush() {
    const id = this.onGetNextSequenceId() - 1;
    this.tabs?.push({ 
      id: `tab-${id}`,
      title: `Tab-${id}`,
      isDismissible: true,
      content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.'
    });
  }

  onAddTabActivatePush() {
    const id = this.onGetNextSequenceId() - 1;
    this.tabs?.push({ 
      id: `tab-${id}`,
      title: `Tab-${id}`,
      doActivate: true,
      isDismissible: true,
      content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.'
    });
  }

  onAddDisabledTabPush() {
    const id = this.onGetNextSequenceId() - 1;
    this.tabs?.push({ 
      id: `tab-${id}`,
      title: `Tab-${id}`,
      isDismissible: true,
      isDisabled: true,
      content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.'
    });
  }

  onAddHiddenTabPush() {
    const id = this.onGetNextSequenceId() - 1;
    this.tabs?.push({ 
      id: `tab-${id}`,
      title: `Tab-${id}`,
      isDismissible: true,
      isHidden: true,
      content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.'
    });
  }

  onAddTabArray() {
    if (this.tabs) {
      const id = this.onGetNextSequenceId() - 1;
      this.tabs = [
        ...this.tabs,
        { 
          id: `tab-${id}`,
          isDismissible: true,
          title: `Tab-${id}`,
          content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' 
        }
      ];
    }
  }

  onAddDisabledTabArray() {
    if (this.tabs) {
      const id = this.onGetNextSequenceId() - 1;
      this.tabs = [
        ...this.tabs,
        { 
          id: `tab-${id}`,
          isDismissible: true,
          isDisabled: true,
          title: `Tab-${id}`,
          content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' 
        }
      ];
    }
  }

  onAddHiddenTabArray() {
    if (this.tabs) {
      const id = this.onGetNextSequenceId() - 1;
      this.tabs = [
        ...this.tabs,
        { 
          id: `tab-${id}`,
          isDismissible: true,
          isHidden: true,
          title: `Tab-${id}`,
          content: 'Magnetic; proactive citizen-media granular strategic compelling blogging interactive bleeding-edge transform. Standards-compliant monetize enhance drive e-services.' 
        }
      ];
    }
  }

  onRemoveTab() {
    if (this.tabs && this.tabs.length > 0) {
      const tabIndex = this.tabs.length - 1;
      const id = this.tabs[tabIndex].id;
      this.tabs.splice(-1);
      this.sohoTabsComponent?.remove(id);
    }
  }

  onEnableTabs() {
    this.sohoTabsComponent?.enable();
  }

  onShowTabs() {
    this.tabs?.filter(obj => obj.isHidden === true).forEach((item) => {
      console.log(item);
      this.sohoTabsComponent?.show(item.id);
    });
  }
}
