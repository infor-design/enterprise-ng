import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoWizardModule } from './soho-wizard.module';
import { SohoWizardComponent } from './soho-wizard.component';
import { SohoWizardTickComponent } from './soho-wizard-tick.component';

describe('Soho Wizard Unit Tests', () => {
  let comp: SohoWizardComponent;
  let fixture: ComponentFixture<SohoWizardComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoWizardComponent]
    });

    fixture = TestBed.createComponent(SohoWizardComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;

    comp.ticks = [
      { label: 'One', href: 'one', state: 'current'},
      { label: 'Two', href: 'two'},
      { label: 'Three', href: 'three'},
      { label: 'Four', href: 'four'},
      { label: 'Five', href: 'five'},
      { label: 'Six', href: 'six'}
    ];
  });

  it('Check Empty Content', () => {
    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root1');
    expect(el.hasAttribute('soho-wizard')).toBeTruthy();
    expect(el.classList).toContain('wizard');
  });
});

@Component({
  template: `
  <div soho-wizard>
    <div soho-wizard-header>
      <a soho-wizard-tick tickId="one" current="true">One</a>
      <a soho-wizard-tick tickId="two">Two</a>
      <a soho-wizard-tick tickId="three">Three</a>
    </div>
  <div soho-wizard-pages>
    <div soho-wizard-page tickId="one"></div>
    <div soho-wizard-page tickId="two"></div>
    <div soho-wizard-page tickId="three"></div>
  </div>
  <div soho-wizard-buttonbar></div>
</div>`
})
class SohoWizardTestComponent {
  @ViewChild(SohoWizardComponent) wizard: SohoWizardComponent;

  public ticks: SohoWizardTick[] = [
    { label: 'One', href: 'one', state: 'current'},
    { label: 'Two', href: 'two'},
    { label: 'Three', href: 'three'},
    { label: 'Four', href: 'four'},
    { label: 'Five', href: 'five'},
    { label: 'Six', href: 'six'}
  ];
}

describe('Soho Wizard Render', () => {
  let wizard: SohoWizardComponent;
  let component: SohoWizardTestComponent;
  let fixture: ComponentFixture<SohoWizardTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoWizardTestComponent],
      imports: [FormsModule, SohoWizardModule]
    });

    fixture = TestBed.createComponent(SohoWizardTestComponent);
    component = fixture.componentInstance;

    wizard = component.wizard;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-wizard]')).nativeElement;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
  });

  it('setting the ticks updates the wizard', () => {
    fixture.detectChanges();

    const testData: SohoWizardTick[] = [
      { label: 'One', href: 'one', state: 'current' },
    ];

    wizard.ticks = testData;

    const ticks: SohoWizardTick[] = component.wizard.ticks;
    expect(ticks.length).toBe(1);
    // expect(ticks[0].tickId).toBe('one');
    // expect(ticks[0].jQueryElement.text()).toBe('Data One');
  });

  it('check "first".', () => {
    fixture.detectChanges();
    expect(wizard.currentTickId).toBe('one');
    wizard.next();
    wizard.first();
    expect(wizard.currentTickId).toBe('one');
  });

  it('check "next".', () => {
    fixture.detectChanges();
    expect(wizard.currentTickId).toBe('one');
    wizard.next();
    expect(wizard.currentTickId).toBe('two');
    expect(wizard.hasNext()).toBeTruthy();
    expect(wizard.hasPrevious()).toBeTruthy();
    expect(wizard.hasFinished()).toBeFalsy();
  });

  it('check "previous".', () => {
    fixture.detectChanges();
    expect(wizard.currentTickId).toBe('one');
    wizard.next();
    wizard.previous();
    expect(wizard.currentTickId).toBe('one');
    expect(wizard.hasNext()).toBeTruthy();
    expect(wizard.hasPrevious()).toBeFalsy();
    expect(wizard.hasFinished()).toBeFalsy();
  });

  it('check "finish".', () => {
    fixture.detectChanges();
    expect(wizard.currentTickId).toBe('one');
    wizard.finish();
    expect(wizard.currentTickId).toBe('three');
    expect(wizard.hasNext()).toBeFalsy();
    expect(wizard.hasPrevious()).toBeFalsy();
    expect(wizard.hasFinished()).toBeTruthy();
  });

  it('check "finish" then "previous".', () => {
    fixture.detectChanges();
    expect(wizard.currentTickId).toBe('one');
    wizard.finish();
    wizard.previous();
    expect(wizard.currentTickId).toBe('three');
  });

});
