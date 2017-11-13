import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';

import { SohoTabsModule } from './soho-tabs.module';
import { SohoTabsComponent } from './soho-tabs.component';

@Component({
  template: `
    <div soho-tabs>
      <div soho-tab-list-container>
        <ul soho-tab-list>
          <li soho-tab>
            <a soho-tab-title tabId='tabs-normal-contracts'>Contracts</a>
          </li>
          <li soho-tab selected=true>
            <a soho-tab-title tabId='tabs-normal-opportunities'>Opportunites</a>
          </li>
        </ul>
      </div>
    </div>

    <div soho-tab-panel-container>
      <div soho-tab-panel tabId='tabs-normal-contracts'>
        <p>Contracts Tab Content</p>
      </div>
      <div soho-tab-panel tabId='tabs-normal-opportunities'>
        <p>Opportunites Tab Content</p>
      </div>
    </div>
  `
})
class SohoBasicTabsTestComponent {
  @ViewChild(SohoTabsComponent) tabs: SohoTabsComponent;
}

// describe('Soho Tabs- Unit Tests', () => {
//   let component: SohoTabsComponent;
//   let fixture:   ComponentFixture<SohoTabsComponent>;
//   let de:        DebugElement;
//   let el:        HTMLElement;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ SohoTabsComponent ]
//     });
//
//     fixture = TestBed.createComponent(SohoTabsComponent);
//     component = fixture.componentInstance;
//
//     // Unable to do a check on the tabs.component w/o any content. Getting an error from soho.
//     // Error: Error in ./SohoTabsComponent class SohoTabsComponent_Host - inline template:0:0 caused by:
//     // Cannot read property 'scrollHeight' of undefined
//     // TypeError: Cannot read property 'scrollHeight' of undefined
//     // at Tabs.setOverflow (sohoxi.js:33790:28)
//     // at Tabs.build (sohoxi.js:32375:14)
//     // at Tabs.init (sohoxi.js:32124:12)
//     // at Tabs (sohoxi.js:32114:12)
//     // fixture.detectChanges();
//
//     de = fixture.debugElement;
//     el = de.nativeElement;
//   });
//
//   it('Check Content', () => {
//     expect(el.nodeName).toEqual('DIV');
//   });
// });

describe('Soho Basic Tabs Render', () => {
  let tabs:      SohoTabsComponent;
  let component: SohoBasicTabsTestComponent;
  let fixture:   ComponentFixture<SohoBasicTabsTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoBasicTabsTestComponent ],
      imports: [ SohoTabsModule ]
    });

    fixture = TestBed.createComponent(SohoBasicTabsTestComponent);
    component = fixture.componentInstance;
    tabs = component.tabs;

    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check HTML content', () => {
    const tabsElement: Element = el.children[0];
    expect(tabsElement.nodeName).toBe('DIV');

    // check attributes
    expect(tabsElement.getAttribute('soho-tabs')).not.toBeNull();
    expect(tabsElement.classList.contains('alternate')).toBe(false);

    // check classes
    expect(tabsElement.classList).toContain('tab-container');

    // check div.tab-list-container element
    const tabListContainerElementList: NodeListOf<Element> = tabsElement.getElementsByClassName('tab-list-container');
    expect(tabListContainerElementList.length).toBe(1);
    expect(tabListContainerElementList[0].nodeName).toBe('DIV');

    // check ul element
    const tabListElementList: NodeListOf<HTMLUListElement> = tabListContainerElementList[0].getElementsByTagName('ul');

    expect(tabListElementList.length).toBe(1);
    expect(tabListElementList[0].getAttribute('soho-tab-list')).not.toBeNull();
    expect(tabListElementList[0].classList).toContain('tab-list');

    // check lis
    const tabListElementListItems: NodeListOf<HTMLLIElement> = tabListElementList[0].getElementsByTagName('li');
    expect(tabListElementListItems.length).toBe(2);

    // first li
    expect(tabListElementListItems[0].classList).toContain('tab');
    expect(tabListElementListItems[0].getAttribute('soho-tab')).not.toBeNull();

    // first anchor
    let anchorElementList: NodeListOf<HTMLAnchorElement> = tabListElementListItems[0].getElementsByTagName('a');
    expect(anchorElementList.length).toBe(1);
    expect(anchorElementList[0].getAttribute('soho-tab-title')).not.toBeNull();
    let tabId: string = anchorElementList[0].getAttribute('tabId');
    expect(tabId).toBe('tabs-normal-contracts');
    expect(anchorElementList[0].getAttribute('href')).toEqual('#' + tabId);
    // -------------------------------------------------------------------------------
    // TODO figure out why this is happening
    // for some reason innerText isn't working when running the full test. But
    // it does work when I run only this test by puting an f in front of the it()
    // -------------------------------------------------------------------------------
    // expect(anchorElementList[0].innerText).toEqual('Contracts');

    // second li
    expect(tabListElementListItems[1].classList).toContain('tab');
    expect(tabListElementListItems[1].getAttribute('soho-tab')).not.toBeNull();
    expect(tabListElementListItems[1].getAttribute('selected')).toBeTruthy();

    // second anchor
    anchorElementList = tabListElementListItems[1].getElementsByTagName('a');
    expect(anchorElementList.length).toBe(1);
    expect(anchorElementList[0].getAttribute('soho-tab-title')).not.toBeNull();
    tabId = anchorElementList[0].getAttribute('tabId');
    expect(tabId).toBe('tabs-normal-opportunities');
    expect(anchorElementList[0].getAttribute('href')).toEqual('#' + tabId);
    // -------------------------------------------------------------------------------
    // TODO figure out why this is happening
    // for some reason innerText isn't working when running the full test. But
    // it does work when I run only this test by puting an f in front of the it()
    // -------------------------------------------------------------------------------
    // expect(anchorElementList[0].innerText).toEqual('Opportunites');

    // check tab panel container
    const tabPanelContainerElement: Element = el.children[1];
    expect(tabPanelContainerElement.nodeName).toBe('DIV');
    expect(tabPanelContainerElement.classList).toContain('tab-panel-container');

    // check tab panels
    const tabPanelElementList: NodeListOf<Element> = tabPanelContainerElement.querySelectorAll('div[soho-tab-panel]');
    expect(tabPanelElementList[0].classList).toContain('tab-panel');
    expect(tabPanelElementList[0].getAttribute('tabId')).toEqual('tabs-normal-contracts');
    expect(tabPanelElementList[0].getAttribute('id')).toEqual(tabPanelElementList[0].getAttribute('tabId'));

    expect(tabPanelElementList[1].classList).toContain('tab-panel');
    expect(tabPanelElementList[1].getAttribute('tabId')).toEqual('tabs-normal-opportunities');
    expect(tabPanelElementList[1].getAttribute('id')).toEqual(tabPanelElementList[1].getAttribute('tabId'));
  });
});
