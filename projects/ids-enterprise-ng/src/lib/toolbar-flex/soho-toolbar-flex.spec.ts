import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SohoToolbarFlexComponent, SohoToolbarFlexSearchFieldComponent } from './soho-toolbar-flex.component';
import { SohoToolbarFlexModule } from './soho-toolbar-flex.module';
import { SohoMenuButtonModule } from '../menu-button';
import { TestHelper } from '../utils';

@Component({
  template: `<soho-toolbar-flex
    title="Toolbar With Ajax 'More Actions' Menu"
    [moreMenuBeforeOpenFunction]="onBeforeMoreMenuOpen"
    (selected)="onSelected($event)">

    <soho-toolbar-flex-section [isTitle]="true">
      <h2>Toolbar with Ajax "More Actions" Menu</h2>
    </soho-toolbar-flex-section>

    <soho-toolbar-flex-section [isButtonSet]="true">
      <button soho-button="btn" icon="settings" id="settings-button" data-action="{'button':'settings'}">
        <span>Settings</span>
      </button>

      <button soho-button="btn" icon="save" data-action="{'button':'save'}">
        <span>Save</span>
      </button>

      <button soho-button="btn" icon="mail" data-action="{'button':'email'}">
        <span>Send as Email</span>
      </button>

      <button soho-menu-button
              id="menu-button"
              [ajaxBeforeOpenFunction]="onBeforeMenuButtonOpen"
              [menu]="'menuButtonPopupmenu'">
        <span>Menu Button</span>
      </button>
      <ul class="popupmenu" id="menuButtonPopupmenu">
        <li><a href="#">Print Item One</a></li>
        <li><a href="#">Print Item Two</a></li>
        <li><a href="#">Print Item Three</a> </li>
        <li><a href="#">Printer Item Four</a></li>
      </ul>
    </soho-toolbar-flex-section>

    <soho-toolbar-flex-section [isSearch]="true">
      <input soho-toolbar-flex-searchfield
             id="search-field"
             placeholder="Search..."
             [clearable]="true"
             [collapsible]="false"
             filterMode="contains"
             [(ngModel)]="model.searchValue"
             (change)="onChange($event)"/>
    </soho-toolbar-flex-section>

    <soho-toolbar-flex-more-button>
      <ul class="popupmenu">
        <li>Placeholder</li>
      </ul>
    </soho-toolbar-flex-more-button>
  </soho-toolbar-flex>`
})
class SohoToolbarFlexTestComponent {
  @ViewChild(SohoToolbarFlexComponent) toolbarFlex: SohoToolbarFlexComponent;
  @ViewChild(SohoToolbarFlexSearchFieldComponent) searchField: SohoToolbarFlexSearchFieldComponent;

  @Output() selected = new EventEmitter<SohoToolbarFlexSelectedEvent>();

  /** @todo fix the use of this native attribute */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<SohoSearchFieldEvent>();

  private MENU_RESPONSE_HTML = `
    <li><a href="#" id="AJAXOptionOne" data-action="{'button':'AJAX Option 1'}">AJAX Option 1</a></li>
    <li><a href="#" id="AJAXOptionTwo" data-action="{'button':'AJAX Option 2'}">AJAX Option 2</a></li>
    <li class="submenu" id="ajaxsubmenu">
      <a href="#" id="AJAXOptionThree" data-action="{'button':'AJAX Option 3'}">AJAX Option 3</a>
      <ul class="popupmenu"></ul>
    </li>
    <li><a href="#" id="AJAXOptionFour" data-action="{'button':'AJAX Option 4'}">AJAX Option 4</a></li>
  `;

  private SUBMENU_RESPONSE_HTML = `
    <li><a href="#" id="SubOptionOne" data-action="{'button':'AJAX sub-option 1'}">AJAX sub-option 1</a></li>
    <li><a href="#" id="SubOptionTwo" data-action="{'button':'AJAX sub-option 2'}">AJAX sub-option 2</a></li>
    <li><a href="#" id="SubOptionThree" data-action="{'button':'AJAX sub-option 3'}">AJAX sub-option 3</a></li>
  `;

  private MENU_BUTTON_RESPONSE_HTML = `
    <li><a href="#" id="MenuButtonOptionOne" data-action="{'button':'Menu Button AJAX Option 1'}">Menu Button AJAX Option 1</a></li>
    <li><a href="#" id="MenuButtonOptionTwo" data-action="{'button':'Menu Button AJAX Option 2'}">Menu Button AJAX Option 2</a></li>
  `;

  model = {
    searchValue: ''
  };

  onBeforeMoreMenuOpen = (response: AjaxBeforeOpenResponseFunction, options: any) => {
    if (options.hasOwnProperty('contextElement')) {
      if (options.contextElement[0].parentElement.parentElement.id === 'menu-button') {
        response(this.MENU_BUTTON_RESPONSE_HTML);
        return;
      }
      response(this.SUBMENU_RESPONSE_HTML);
      return;
    } else {
      response(this.MENU_RESPONSE_HTML);
      return;
    }
  };

  onBeforeMenuButtonOpen = (response: AjaxBeforeOpenResponseFunction, options: any) => {
    response(this.MENU_BUTTON_RESPONSE_HTML);
    return;
  };

  onSelected(event: SohoToolbarFlexSelectedEvent) {
    this.selected.emit(event);
  }

  onChange(event: SohoSearchFieldEvent) {
    this.change.emit(event);
  }
}

describe('Soho Toolbar Flex Tests', () => {
  // let toolbarflex: SohoToolbarFlexComponent;
  let component: SohoToolbarFlexTestComponent;
  let fixture: ComponentFixture<SohoToolbarFlexTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoToolbarFlexTestComponent],
      imports: [FormsModule, SohoToolbarFlexModule, SohoMenuButtonModule]
    });

    fixture = TestBed.createComponent(SohoToolbarFlexTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('soho-toolbar-flex')).nativeElement;

    fixture.detectChanges();
    // toolbarflex = component.toolbarFlex;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('SOHO-TOOLBAR-FLEX');
    expect(el.children.length).toEqual(4);

    const firstSection = el.children[0];
    expect(firstSection.nodeName).toEqual('SOHO-TOOLBAR-FLEX-SECTION');
    expect(firstSection.classList).toContain('toolbar-section');
    expect(firstSection.classList).toContain('title');

    const secondSection = el.children[1];
    expect(secondSection.nodeName).toEqual('SOHO-TOOLBAR-FLEX-SECTION');
    expect(secondSection.classList).toContain('toolbar-section');
    expect(secondSection.classList).toContain('buttonset');

    const thirdSection = el.children[2];
    expect(thirdSection.nodeName).toEqual('SOHO-TOOLBAR-FLEX-SECTION');
    expect(thirdSection.classList).toContain('toolbar-section');
    expect(thirdSection.classList).toContain('search');

    const fourthSection = el.children[3];
    expect(fourthSection.nodeName).toEqual('SOHO-TOOLBAR-FLEX-MORE-BUTTON');
    expect(fourthSection.classList).toContain('toolbar-section');
    expect(fourthSection.classList).toContain('more');
  });

  describe('Check events', () => {
    it('regular button', () => {
      fixture.detectChanges();

      const button = de.query(By.css('#settings-button')).nativeElement;
      const spy = spyOn<any>(component, 'onSelected').and.callThrough();

      button.click();
      expect(spy.calls.count()).toEqual(1);
    });

    it('menu button', () => {
      fixture.detectChanges();
      const button = de.query(By.css('#menu-button')).nativeElement;
      const spy = spyOn<any>(component, 'onSelected').and.callThrough();

      button.click();

      // Need to use jquery to get the sub item, since it's an ajax response
      const subItem = $('#MenuButtonOptionOne')[0];
      subItem.click();
      expect(spy.calls.count()).toEqual(1);
    });

    it('more menu button', () => {
      component.toolbarFlex.moreMenuBeforeOpenFunction = component.onBeforeMoreMenuOpen;
      fixture.detectChanges();

      const button = de.query(By.css('SOHO-TOOLBAR-FLEX-MORE-BUTTON button')).nativeElement;
      const spy = spyOn<any>(component, 'onSelected').and.callThrough();

      button.click();

      // Need to use jquery to get the sub item, since it's an ajax response
      const subItem = $('#AJAXOptionTwo')[0];
      subItem.click();
      expect(spy.calls.count()).toEqual(1);
    });

    it('search field', () => {
      fixture.detectChanges();

      const searchField = de.query(By.css('#search-field')).nativeElement;

      TestHelper.testFireEvent(searchField, 'selected', component.searchField['selected']);
      TestHelper.testFireEvent(searchField, 'cleared', component.searchField['cleared']);
    });
  });

  describe('Check Inputs', () => {
    it('flex toolbar ', () => {
      fixture.detectChanges();

      expect(component.toolbarFlex.options.beforeMoreMenuOpen).toBeDefined('more menu callback not defined');

      const spy = spyOn<any>(component.toolbarFlex, 'updated').and.callThrough();
      component.toolbarFlex.moreMenuBeforeOpenFunction = undefined;
      fixture.detectChanges();

      expect(component.toolbarFlex.options.beforeMoreMenuOpen).toBeUndefined('more menu callback is still defined');
      expect(spy.calls.count()).toEqual(1);
    });

    it('flex toolbar searchfield', () => {
      fixture.detectChanges();

      expect(component.searchField).toBeDefined('search field is undefined');
      expect(component.searchField.options.clearable).toBeTruthy('search field not clearable');
      expect(component.searchField.options.collapsible).toBeFalsy('search field collapsible');
      expect(component.searchField.options.filterMode).toBe('contains');
      expect(component.searchField.options.collapsibleOnMobile).toBeUndefined();
      expect(component.searchField.options.source).toBeUndefined();
      expect(component.searchField.options.template).toBeUndefined();

      const spy = spyOn<any>(component.searchField.searchField, 'updated').and.callThrough();

      component.searchField.options.filterMode = 'wordStartsWith';
      component.searchField.source = (query, done) => {
        // this.objectBasedData().subscribe((items) => {
        done(query, []);
        // });
      };
      component.searchField.clearable = false;
      component.searchField.collapsible = true;
      component.searchField.collapsibleOnMobile = true;
      fixture.detectChanges();
      expect(spy.calls.count()).toEqual(1);

      expect(component.searchField.options.clearable).toBeFalsy('search field clearable');
      expect(component.searchField.options.collapsible).toBeTruthy('search field not collapsible');
      expect(component.searchField.options.collapsibleOnMobile).toBeTruthy('search field not collapsible on mobile');
      expect(component.searchField.options.filterMode).toBe('wordStartsWith');
      expect(component.searchField.options.source).toBeDefined();

    });

  });
});
