/// <reference path="soho-buttonset.d.ts" />

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SohoButtonsetModule } from './soho-buttonset.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SohoButtonsetComponent } from './soho-buttonset.component';

@Component({
  template: `
  <div soho-buttonset>
  </div>`
})
class SohoButtonsetTestComponent {
  @ViewChild(SohoButtonsetComponent, { static: true }) button: SohoButtonsetComponent;

  constructor() {
  }
}

describe('Soho Button Unit Tests', () => {
  let button: SohoButtonsetComponent;
  let component: SohoButtonsetTestComponent;
  let fixture: ComponentFixture<SohoButtonsetTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoButtonsetTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoButtonsetModule]
    });

    fixture = TestBed.createComponent(SohoButtonsetTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    button = component.button;
    de = fixture.debugElement;
    el = de.query(By.css('div[soho-buttonset]')).nativeElement;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  // it('can get and set replaceText', () => {
  //   expect(button.replaceText).toBeUndefined();

  //   button.replaceText = true;
  //   expect((button as any)._buttonOptions.replaceText).toBeTruthy();

  //   button.replaceText = false;
  //   expect((button as any)._buttonOptions.replaceText).toBeFalsy();
  // });

  // it('can get and set toggleOffIcon', () => {
  //   expect(button.toggleOffIcon).toBeUndefined();
  //   button.toggleOffIcon = 'heart';

  //   expect((button as any)._buttonOptions.toggleOffIcon).toEqual('heart');
  // });

  // it('can get and set toggleOnIcon', () => {
  //   expect(button.toggleOnIcon).toBeUndefined();
  //   button.toggleOnIcon = 'heart';

  //   expect((button as any)._buttonOptions.toggleOnIcon).toEqual('heart');
  // });

  // it('check hideMenuArrow', () => {
  //   // const spy = spyOn((component as any).ref, 'markForCheck');

  //   button.hideMenuArrow = false;

  //   expect((button as any)._buttonOptions.hideMenuArrow).toBeFalsy();
  //   expect((button as any).button.settings.hideMenuArrow).toBeFalsy();
  //   // expect(spy).toHaveBeenCalled();
  // });

  // it('check hideMenuArrow sets option to true', () => {
  //   // const spy = spyOn((component as any).ref, 'markForCheck');

  //   button.hideMenuArrow = true;

  //   expect((button as any)._buttonOptions.hideMenuArrow).toBeTruthy();
  //   expect((button as any).button.settings.hideMenuArrow).toBeTruthy();
  //   // expect(spy).toHaveBeenCalled();
  // });

  // it('check hideMenuArrow sets option to true, when no menuButton set', () => {
  //   // const spy = spyOn((component as any).ref, 'markForCheck');

  //   (button as any).button = undefined;
  //   button.hideMenuArrow = true;

  //   expect((button as any)._buttonOptions.hideMenuArrow).toBeTruthy();
  //   // expect(spy).toHaveBeenCalledTimes(0);
  // });

});
