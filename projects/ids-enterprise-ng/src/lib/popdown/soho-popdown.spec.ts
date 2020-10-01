import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  SohoPopDownContentsComponent,
  SohoPopDownModule
} from './';

@Component({
  template: `
    <button soho-popdown ></button>
    <soho-popdown-contents>
      <h1>Filler Heading</h1>
    </soho-popdown-contents>`
})
class SohoPopDownDirectiveTestComponent {
  @ViewChild(SohoPopDownContentsComponent) contents: SohoPopDownContentsComponent;
}

describe('Soho PopDown Unit Tests', () => {
  let comp: SohoPopDownDirectiveTestComponent;
  let fixture: ComponentFixture<SohoPopDownDirectiveTestComponent>;
  let de: DebugElement;
  let element: HTMLElement;
  let popdownContents: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPopDownDirectiveTestComponent],
      imports: [FormsModule, SohoPopDownModule]
    });

    fixture = TestBed.createComponent(SohoPopDownDirectiveTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    element = de.query(By.css('[soho-popdown]')).nativeElement;
    popdownContents = de.query(By.css('soho-popdown-contents')).nativeElement;
    fixture.detectChanges();
  });

  it('Check popdown attribute added to html element', () => {
    fixture.detectChanges();

    expect(element.nodeName).toEqual('BUTTON');
    expect(element.hasAttribute('popdown')).toBeTruthy();
  });

  it('Check popdown class added to popdown-contents html element', () => {
    fixture.detectChanges();

    expect(popdownContents.nodeName).toEqual('SOHO-POPDOWN-CONTENTS');
    expect(popdownContents.classList).toContain('popdown');
  });
});
