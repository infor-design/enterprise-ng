//tslint:disable
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { Component, DebugElement, ViewChild } from '@angular/core';
// import { FormsModule } from '@angular/forms';

// import { SohoWizardModule } from './soho-wizard.module';
// import { SohoWizardComponent } from './soho-wizard.component';
// import { SohoWizardTickComponent } from './soho-wizard-tick.component';

// describe('Soho Wizard Unit Tests', () => {
//   let comp: SohoWizardComponent;
//   let fixture: ComponentFixture<SohoWizardComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SohoWizardComponent]
//     });

//     fixture = TestBed.createComponent(SohoWizardComponent);
//     comp = fixture.componentInstance;
//     fixture.detectChanges();

//     de = fixture.debugElement;
//     el = de.nativeElement;

//     comp.ticks = [
//       { label: 'One', href: 'one', state: 'current'},
//       { label: 'Two', href: 'two'},
//       { label: 'Three', href: 'three'},
//       { label: 'Four', href: 'four'},
//       { label: 'Five', href: 'five'},
//       { label: 'Six', href: 'six'}
//     ];
//   });

//   it('Check Empty Content', () => {
//     expect(el.nodeName).toEqual('DIV');
//     // expect(el.id).toEqual('root1');
//     expect(el.hasAttribute('soho-wizard')).toBeTruthy();
//     expect(el.classList).toContain('wizard');
//   });

//   it('Check default value of ticks is []', () => {
//     fixture.detectChanges();

//     expect(comp.ticks).toEqual([]);
//   });

//   it('check "next".', () => {
//     fixture.detectChanges();
//     expect(comp.currentTickId).toBe('1');
//     comp.next();
//     expect(comp.currentTickId).toBe('2');
//   });
// });

// describe('Soho Wizard Render', () => {
//   let wizard: SohoWizardComponent;
//   let component: SohoWizardTestComponent;
//   let fixture: ComponentFixture<SohoWizardTestComponent>;
//   let de: DebugElement;
//   let el: HTMLElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [SohoWizardTestComponent],
//       imports: [FormsModule, SohoWizardModule]
//     });

//     fixture = TestBed.createComponent(SohoWizardTestComponent);
//     component = fixture.componentInstance;

//     wizard = component.wizard;

//     de = fixture.debugElement;
//     el = de.query(By.css('div[soho-wizard]')).nativeElement;
//   });

//   it('Check HTML content', () => {
//     fixture.detectChanges();

//     expect(el.nodeName).toEqual('div');
//   });

//   it('setting the ticks updates the wizard', () => {
//     fixture.detectChanges();

//     const testData: SohoWizardTick[] = [
//       { label: 'One', href: 'one', state: 'current' },
//     ];

//     wizard.ticks = testData;

//     const ticks: SohoWizardTickComponent[] = component.wizard.ticks;
//     expect(ticks.length).toBe(1);
//     expect(ticks[0].tickId).toBe('one');
//     expect(ticks[0].jQueryElement.text()).toBe('Data One');
//   });

// });

// @Component({
//   template: `<div soho-wizard">
//   <div soho-wizard-header>
//     <a soho-wizard-tick tickId="one" current="true">One</a>
//     <a soho-wizard-tick tickId="two">Two</a>
//     <a soho-wizard-tick tickId="three">Three</a>
//   </div>
//   <div class="scrollable-area no-scroll full-width">
//     <div soho-wizard-page tickId="one">
//     </div>
//     <div soho-wizard-page tickId="two">
//     </div>
//     <div soho-wizard-page tickId="three">
//     </div>
//   </div>
//   <div soho-wizard-buttonbar></div>
// </div>`
// })
// class SohoWizardTestComponent {
//   @ViewChild(SohoWizardComponent) wizard: SohoWizardComponent;

//   public ticks: SohoWizardTick[] = [
//     { label: 'One', href: 'one', state: 'current'},
//     { label: 'Two', href: 'two'},
//     { label: 'Three', href: 'three'},
//     { label: 'Four', href: 'four'},
//     { label: 'Five', href: 'five'},
//     { label: 'Six', href: 'six'}
//   ];

// }

