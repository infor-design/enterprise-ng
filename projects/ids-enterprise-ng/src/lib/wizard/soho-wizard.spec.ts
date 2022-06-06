import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoWizardModule } from './soho-wizard.module';
import { SohoWizardComponent } from './soho-wizard.component';

describe('Soho Wizard Unit Tests', () => {
  let comp: SohoWizardComponent;
  let fixture: ComponentFixture<SohoWizardComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [SohoWizardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoWizardComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

    comp.ticks = [
      { label: 'One', href: 'one', state: 'current' },
      { label: 'Two', href: 'two' },
      { label: 'Three', href: 'three' },
      { label: 'Four', href: 'four' },
      { label: 'Five', href: 'five' },
      { label: 'Six', href: 'six' }
    ];

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeDefined();
  });

  it('Check Empty Content', async () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('DIV');
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
  @ViewChild(SohoWizardComponent) wizard?: SohoWizardComponent;

  public ticks: SohoWizardTick[] = [
    { label: 'One', href: 'one', state: 'current' },
    { label: 'Two', href: 'two' },
    { label: 'Three', href: 'three' },
    { label: 'Four', href: 'four' },
    { label: 'Five', href: 'five' },
    { label: 'Six', href: 'six' }
  ];
}

describe('Soho Wizard Render', () => {
  let component: SohoWizardTestComponent;
  let fixture: ComponentFixture<SohoWizardTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let wizard: SohoWizardComponent | undefined;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoWizardTestComponent],
      imports: [FormsModule, SohoWizardModule]
    });

    fixture = TestBed.createComponent(SohoWizardTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-wizard]')).nativeElement;

    fixture.detectChanges();
    wizard = component.wizard;
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

    if (wizard) {
      wizard.ticks = testData;
    }

    const ticks: SohoWizardTick[] = component.wizard ? component.wizard.ticks : [];
    expect(ticks).toBeDefined();
    expect(ticks.length).toBe(1);
    // expect(ticks[0].tickId).toBe('one');
    // expect(ticks[0].jQueryElement.text()).toBe('Data One');
  });

  it('check "first".', () => {
    fixture.detectChanges();
    expect(component.wizard?.currentTickId).toBe('one');
    (wizard as any).next();
    (wizard as any).first();
    expect(wizard?.currentTickId).toBe('one');
  });

  it('check "next".', () => {
    fixture.detectChanges();
    expect(wizard?.currentTickId).toBe('one');
    (wizard as any).next();
    expect(wizard?.currentTickId).toBe('two');
    expect(wizard?.hasNext()).toBeTruthy();
    expect(wizard?.hasPrevious()).toBeTruthy();
    expect(wizard?.hasFinished()).toBeFalsy();
  });

  it('check "previous".', () => {
    fixture.detectChanges();
    expect(wizard?.currentTickId).toBe('one');
    (wizard as any).next();
    (wizard as any).previous();
    expect(wizard?.currentTickId).toBe('one');
    expect(wizard?.hasNext()).toBeTruthy();
    expect(wizard?.hasPrevious()).toBeFalsy();
    expect(wizard?.hasFinished()).toBeFalsy();
  });

  it('check "finish".', () => {
    fixture.detectChanges();
    expect(wizard?.currentTickId).toBe('one');
    (wizard as any).finish();
    expect(wizard?.currentTickId).toBe('three');
    expect(wizard?.hasNext()).toBeFalsy();
    expect(wizard?.hasPrevious()).toBeFalsy();
    expect(wizard?.hasFinished()).toBeTruthy();
  });

  it('check "finish" then "previous".', () => {
    fixture.detectChanges();
    expect(wizard?.currentTickId).toBe('one');
    (wizard as any).finish();
    (wizard as any).previous();
    expect(wizard?.currentTickId).toBe('three');
  });
});
