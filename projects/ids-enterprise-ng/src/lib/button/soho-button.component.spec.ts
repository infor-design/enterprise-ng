/// <reference path="soho-button.d.ts" />

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

import {
  FormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { SohoButtonModule } from './soho-button.module';
import { SohoTooltipModule } from '../tooltip/soho-tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SohoButtonComponent } from './soho-button.component';

@Component({
  template: `
  <div>
    <button soho-button="icon" icon="bullet-list" disabled soho-tooltip title="DATAGRID_VIEW">
      <div class="disabled-tooltip" title="DATAGRID_VIEW"></div>
    </button>
  </siv>`
})
class SohoButtonTestComponent {
  @ViewChild(SohoButtonComponent) button: SohoButtonComponent;

  constructor() {
  }
}

describe('Soho Button Unit Tests', () => {
  let button: SohoButtonComponent;
  let component: SohoButtonTestComponent;
  let fixture: ComponentFixture<SohoButtonTestComponent>;
  let de: DebugElement;
  let el: HTMLDivElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoButtonTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoButtonModule, SohoTooltipModule]
    });

    fixture = TestBed.createComponent(SohoButtonTestComponent);
    component = fixture.componentInstance;
    button = component.button;

    de = fixture.debugElement;
    el = de.query(By.css('button[soho-button]')).nativeElement;

    fixture.detectChanges();
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

});
