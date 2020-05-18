/// <reference path="soho-buttonset.d.ts" />

import {
  ComponentFixture,
  TestBed,
  fakeAsync
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
  @ViewChild(SohoButtonsetComponent, { static: true }) buttonset: SohoButtonsetComponent;

  constructor() {
  }
}

describe('Soho Button Unit Tests', () => {
  let buttonset: SohoButtonsetComponent;
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

    buttonset = component.buttonset;
    de = fixture.debugElement;
    el = de.query(By.css('div[soho-buttonset]')).nativeElement;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('expect not buttons by default', () => {
    expect(buttonset.buttonAPIs.length).toBe(0);
  });

  it('add a button', () => {
    buttonset.add({ id: 'btn-0', text: 'Button 0' }, true);

    expect(buttonset.buttonAPIs.length).toBe(1);
  });

  it('get a button at', () => {
    buttonset.add({ id: 'btn-0', text: 'Button 0' }, true);
    const btn = buttonset.at(0);

    expect(btn.settings.id).toBe('btn-0');
  });

  it('get buttonAPIs', (() => {
    buttonset.add({ id: 'btn-0', text: 'Button 0' }, true);
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(buttonset.buttons.length).toBe(0, 'The buttons in settings are not changed.');
      expect(buttonset.buttonAPIs.length).toBe(1, 'buttonAPIs');
    });
  }));

  it('set buttons', (() => {
    buttonset.buttons = [{ id: 'btn-0', text: 'Button 0' }, { id: 'btn-1', text: 'Button 1' }];
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(buttonset.buttons.length).toBe(2, 'The buttons in settings changed.');
      expect(buttonset.buttonAPIs.length).toBe(2, 'buttonsAPIs');
    });
  }));

});
