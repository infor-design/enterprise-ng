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

import { SohoMaskDirective } from './soho-mask.directive';
import { SohoMaskModule } from './soho-mask.module';

describe('Soho Custom Mask Render', () => {
  let input:     SohoMaskDirective;
  let component: SohoCustomMaskTestComponent;
  let fixture:   ComponentFixture<SohoCustomMaskTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoCustomMaskTestComponent ],
      imports: [ FormsModule, SohoMaskModule ]
    });

    fixture = TestBed.createComponent(SohoCustomMaskTestComponent);
    component = fixture.componentInstance;
    input = component.input;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-mask]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    input.definitions = {'U': /[A-Z]/};

    // TODO - interact
  });

});

@Component({
  template: `
  <div>
    <input soho-mask [pattern]="'UUU'" [definitions]="definitions" />
  </div>`
})
class SohoCustomMaskTestComponent {
  @ViewChild(SohoMaskDirective) input: SohoMaskDirective;

  public definitions: SohoMaskDefinitions = {'U': /[A-Z]/};
}

describe('Soho Mask Render', () => {
  let input:     SohoMaskDirective;
  let component: SohoMaskTestComponent;
  let fixture:   ComponentFixture<SohoMaskTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoCustomMaskTestComponent ],
      imports: [ FormsModule, SohoMaskModule ]
    });

    fixture = TestBed.createComponent(SohoCustomMaskTestComponent);
    component = fixture.componentInstance;
    input = component.input;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-mask]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
  });
});

@Component({
  template: `
  <div>
    <input soho-mask [pattern]="'###'" [mode]="'number'"/>
  </div>`
})
class SohoMaskTestComponent {
  @ViewChild(SohoMaskDirective) input: SohoMaskDirective;
}
