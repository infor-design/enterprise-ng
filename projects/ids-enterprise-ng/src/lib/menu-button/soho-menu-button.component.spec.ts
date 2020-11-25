import {
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  SohoMenuButtonComponent,
  SohoMenuButtonModule,
} from './';

import { SohoIconModule } from '../icon';

describe('Soho Menu Button Unit Tests', () => {
  let comp: SohoMenuButtonComponent;
  let fixture: ComponentFixture<SohoMenuButtonComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoMenuButtonComponent],
      imports: [SohoIconModule]
    });

    fixture = TestBed.createComponent(SohoMenuButtonComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('btn-menu');
  });

  it('check showArrow', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.showArrow = false;

    expect((comp as any).options.showArrow).toBeFalsy();
    expect((comp as any).menuButton.settings.showArrow).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('check showArrow sets option to true', () => {
    comp.showArrow = true;

    expect((comp as any).options.showArrow).toBeTruthy();
    expect((comp as any).menuButton.settings.showArrow).toBeTruthy();
  });

  it('check showArrow sets option to true, when no menuButton set', () => {
    (comp as any).menuButton = undefined;
    comp.showArrow = true;

    expect((comp as any).options.showArrow).toBeTruthy();
  });

  it('check hideMenuArrow', () => {
    // const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.hideMenuArrow = false;

    expect((comp as any).buttonOptions.hideMenuArrow).toBeFalsy();
    expect((comp as any).button.settings.hideMenuArrow).toBeFalsy();
    // expect(spy).toHaveBeenCalled();
  });

  it('check hideMenuArrow sets option to true', () => {
    // const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.hideMenuArrow = true;

    expect((comp as any).buttonOptions.hideMenuArrow).toBeTruthy();
    expect((comp as any).button.settings.hideMenuArrow).toBeTruthy();
    // expect(spy).toHaveBeenCalled();
  });

  it('check hideMenuArrow sets option to true, when no menuButton set', () => {
    // const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.hideMenuArrow = true;

    expect((comp as any).buttonOptions.hideMenuArrow).toBeTruthy();
    // expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check autoFocus sets options to false', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.autoFocus = false;

    fixture.detectChanges();

    expect((comp as any).options.autoFocus).toBeFalsy();
    expect((comp as any).menuButton.settings.autoFocus).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('check autoFocus sets options to false, before menuButton initialised.', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.autoFocus = false;

    fixture.detectChanges();

    expect((comp as any).options.autoFocus).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check autoFocus sets option to true', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.autoFocus = true;

    fixture.detectChanges();

    expect((comp as any).options.autoFocus).toBeTruthy();
    expect((comp as any).menuButton.settings.autoFocus).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('check mouseFocus sets options to false', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.mouseFocus = false;

    fixture.detectChanges();

    expect((comp as any).options.mouseFocus).toBeFalsy();
    expect((comp as any).menuButton.settings.mouseFocus).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('check mouseFocus sets options to false, when menuButton not set', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.mouseFocus = false;

    fixture.detectChanges();

    expect((comp as any).options.mouseFocus).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check mouseFocus sets option to true', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.mouseFocus = true;

    fixture.detectChanges();

    expect((comp as any).options.mouseFocus).toBeTruthy();
    expect((comp as any).menuButton.settings.mouseFocus).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('check returnFocus sets options to false', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.returnFocus = false;

    expect((comp as any).options.returnFocus).toBeFalsy();
    expect((comp as any).menuButton.settings.returnFocus).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('check returnFocus sets options to false, without menuButton.', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.returnFocus = false;

    expect((comp as any).options.returnFocus).toBeFalsy();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check returnFocus sets option to true', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.returnFocus = true;

    expect((comp as any).options.returnFocus).toBeTruthy();
    expect((comp as any).menuButton.settings.returnFocus).toBeTruthy();
    expect(spy).toHaveBeenCalled();
  });

  it('check returnFocus sets option to true, without menuButton', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.returnFocus = true;

    expect((comp as any).options.returnFocus).toBeTruthy();
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check trigger sets option', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.trigger = 'click';

    expect((comp as any).options.trigger).toEqual('click');
    expect((comp as any).menuButton.settings.trigger).toEqual('click');
    expect(spy).toHaveBeenCalled();
  });

  it('check trigger sets option', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.trigger = 'click';

    expect((comp as any).options.trigger).toEqual('click');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check menu sets options', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.menu = 'mymenu';

    expect((comp as any).options.menu).toEqual('mymenu');
    expect((comp as any).menuButton.settings.menu).toEqual('mymenu');
    expect(spy).toHaveBeenCalled();
  });

  it('check menu sets options, without menuButton', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.menu = 'mymenu';

    expect((comp as any).options.menu).toEqual('mymenu');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check attachToBody option', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.attachToBody = true;

    expect((comp as any).options.attachToBody).toEqual(true);
    expect((comp as any).menuButton.settings.attachToBody).toEqual(true);
    expect(spy).toHaveBeenCalled();
  });

  it('check ajaxBeforeOpenFunction sets options', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    comp.ajaxBeforeOpenFunction = () => { };

    expect((comp as any).options.ajaxBeforeOpenFunction).not.toBeNull('mymenu');
    expect((comp as any).menuButton.settings.ajaxBeforeOpenFunction).not.toBeNull('mymenu');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check ajaxBeforeOpenFunction sets options', () => {
    const spy = spyOn((comp as any).ref, 'markForCheck');

    (comp as any).menuButton = undefined;
    comp.ajaxBeforeOpenFunction = () => { };

    expect((comp as any).options.ajaxBeforeOpenFunction).not.toBeNull('mymenu');
    expect(spy).toHaveBeenCalledTimes(0);
  });

  it('check fires `selected`', () => {
    const spy = spyOn((comp as any), 'onSelected').and.callThrough();

    const selectionResult: Array<any> = []; // list of selected anchors.
    // Emulate the event being triggered (args?)
    (comp as any).jQueryElement.trigger('selected', selectionResult);

    // Check it was caled
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check close', () => {
    const spy = spyOn((comp as any).menuButton, 'close').and.callFake(() => { });

    comp.close();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check updated', () => {
    const spy = spyOn((comp as any).menuButton, 'updated').and.callThrough();

    comp.updated();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check teardown', () => {
    const spy = spyOn((comp as any).menuButton, 'teardown').and.callThrough();

    comp.teardown();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check beforeopen is called when the menu is opened.', () => {
    const spy = spyOn((comp as any), 'onBeforeOpen').and.callThrough();

    // Emulate the event being triggered (args?)
    (comp as any).jQueryElement.trigger('beforeopen');

    // Check it was caled
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check close', () => {
    const spy = spyOn((comp as any), 'onClose').and.callThrough();

    // Emulate the event being triggered (args?)
    (comp as any).jQueryElement.trigger('close', el);

    // Check it was caled
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('check open', () => {
    const spy = spyOn((comp as any), 'onOpen').and.callThrough();

    // Emulate the event being triggered (args?)
    (comp as any).jQueryElement.trigger('open');

    // Check it was caled
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<button soho-menu-button icon="user" menu="action-popupmenu" title="Charts">
    <span title="foo">Hello</span>
  </button>
<ul soho-popupmenu id="action-popupmenu">
  <li><a soho-popupmenu-label>Admin</a></li>
  <li soho-popupmenu-separator></li>
  <li soho-popupmenu-item><a id="signout">Sign out</a></li>
</ul>`
})
export class TestSohoMenuButtonComponent {
  @ViewChild(SohoMenuButtonComponent) menuButton?: any;
}

describe('Soho Menu Button Render', () => {
  let menuButton: SohoMenuButtonComponent;
  let component: TestSohoMenuButtonComponent;
  let fixture: ComponentFixture<TestSohoMenuButtonComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSohoMenuButtonComponent],
      imports: [FormsModule, SohoMenuButtonModule, SohoIconModule]
    });

    fixture = TestBed.createComponent(TestSohoMenuButtonComponent);
    component = fixture.componentInstance;
    menuButton = component.menuButton;

    de = fixture.debugElement;
    el = de.query(By.css('a[soho-popupmenu-label]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check Item HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('A');
  });

  // Issue with change detection
  // todo seems to fail intermittently on the last expect statement: expect(icon).toBeNull() - Phillip 6/4/19
  // todo: this needs to be fixed in button.js so that updated() will tear down and reinit the component.
  xit('Check Item HTML content', fakeAsync(() => {
    fixture.detectChanges();

    let icon = de.query(By.css('svg.icon-dropdown.icon'));

    expect(icon.nativeElement).toBeDefined();

    menuButton.hideMenuArrow = true;

    fixture.detectChanges();
    tick();
    tick();
    fixture.detectChanges();

    icon = de.query(By.css('svg.icon-dropdown.icon'));

    expect(icon.nativeElement).toBeNull();
  }));

});
