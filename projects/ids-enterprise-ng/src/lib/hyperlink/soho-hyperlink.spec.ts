import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoHyperlinkModule } from './soho-hyperlink.module';
import { SohoHyperlinkComponent } from './soho-hyperlink.component';

@Component ({
  template: `
    <a soho-hyperlink href="#">More Information Hyperlink</a><br><br><br><br>
    <a soho-hyperlink="show-visited" href="#">More Information Hyperlink</a><br><br><br><br>
    <a soho-hyperlink="forward-caret" isCaretRight="true" href="#"  ><span>Hyperlink with Directional Caret </span></a>
    <a soho-hyperlink="back-caret" href="#"  isCaretLeft="true"><span>Back to Search Results</span></a>
    `
})

class SohoHyperlinkTestComponent {
  @ViewChild(SohoHyperlinkComponent) hyperlink: SohoHyperlinkComponent;
}

describe ('Soho Hyperlink Unit tests', () => {
  let hyperlink:   SohoHyperlinkComponent;
  let comp:     SohoHyperlinkTestComponent;
  let fixture:  ComponentFixture<SohoHyperlinkTestComponent>;
  let de:       DebugElement;
  let el0:       HTMLElement;
  let el1:       HTMLElement;
  let el2:       HTMLElement;
  let el3:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoHyperlinkTestComponent ],
      imports: [ FormsModule, SohoHyperlinkModule ]
    });
    TestBed.compileComponents();

    fixture = TestBed.createComponent(SohoHyperlinkTestComponent);
    comp = fixture.componentInstance;
    hyperlink = comp.hyperlink;

    de = fixture.debugElement;
    const el = de.queryAll(By.css('a[soho-hyperlink]'));
    el0 = el[0].nativeElement;
    el1 = el[1].nativeElement;
    el2 = el[2].nativeElement;
    el3 = el[3].nativeElement;
    fixture.detectChanges();
  });

  it('Verify Hyperlink elements', () => {
    fixture.detectChanges();
    expect(el0.nodeName).toEqual('A');
    expect(el0.classList[0]).toContain('hyperlink');
    expect(el0.getAttribute('href')).toEqual(hyperlink.href);

  });

  it('Hyperlink disabled', () => {
    fixture.detectChanges();
    expect(el0.hasAttribute('disabled')).toBeFalsy();
    hyperlink.disabled = true;
    fixture.detectChanges();
    expect(el0.hasAttribute('disabled')).toBeTruthy();
    hyperlink.disabled = false;
    fixture.detectChanges();
  });

  it('Hyperlink show-visited', () => {
    expect(el1.classList[1]).toEqual('show-visited');
  });

  it('Hyperlink directional - caret right', () => {
    fixture.detectChanges();
    expect(el2.classList[1]).toEqual('directional');
    expect(el2.hasAttribute('isCaretRight')).toBeTruthy();
    fixture.detectChanges();
    expect(el2.children[1].classList[0]).toEqual('icon');
    fixture.detectChanges();
  });

  it('Hyperlink back - caret left', () => {
    fixture.detectChanges();
    expect(el3.classList[1]).toEqual('back');
    expect(el3.hasAttribute('isCaretLeft')).toBeTruthy();
    fixture.detectChanges();
    expect(el3.children[0].classList[0]).toEqual('icon');
    fixture.detectChanges();
  });
});
