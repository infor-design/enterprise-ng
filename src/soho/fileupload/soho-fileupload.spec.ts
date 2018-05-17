import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFileUploadModule } from './soho-fileupload.module';
import { SohoFileUploadComponent } from './soho-fileupload.component';

@Component({
  template: `
  <label soho-label for="{{name}}">{{text}}</label>
  <input soho-fileupload name="{{name}}" />
  `
})
class SohoFileUploadTestComponent {
  @ViewChild(SohoFileUploadComponent) fileupload: SohoFileUploadComponent;
  public name = 'File';
  public text = 'File Upload';
}

describe('Soho File Upload Unit Tests', () => {
  let comp:     SohoFileUploadTestComponent;
  let fixture:  ComponentFixture<SohoFileUploadTestComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadTestComponent ]
    });

    fixture = TestBed.createComponent(SohoFileUploadTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement.query(By.css('input[soho-fileupload]'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('INPUT');
    // expect(el.attributes[0].name).toEqual('type');
    // expect(el.attributes[0].value).toEqual('file');
    // expect(el.parentElement.nodeName).toEqual('LABEL');
    // expect(el.parentElement.classList).toContain('fileupload');
  });

  // Add more method tests.
});

describe('Soho File Upload Render', () => {
  let fileupload:  SohoFileUploadComponent;
  let component:   SohoFileUploadTestComponent;
  let fixture:     ComponentFixture<SohoFileUploadTestComponent>;
  let de:          DebugElement;
  let el:          HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadTestComponent ],
      imports: [ FormsModule, SohoFileUploadModule ]
    });

    fixture = TestBed.createComponent(SohoFileUploadTestComponent);
    component = fixture.componentInstance;
    fileupload = component.fileupload;

    de = fixture.debugElement.query(By.css('input[soho-fileupload]'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('@Input() disabled', () => {
    fixture.detectChanges();
    fileupload.disabled = true;
    fixture.detectChanges();
    expect(el.hasAttribute('disabled')).toBeTruthy();
    fileupload.disabled = false;
    fixture.detectChanges();
  });

  it('@Input() readonly', () => {
    fixture.detectChanges();
    fileupload.readonly = true;
    fixture.detectChanges();
    // sohoxi control sets 'readonly' on textInput and 'disabled' on fileInput
    expect(el.hasAttribute('disabled')).toBeTruthy();
    fileupload.readonly = false;
    fixture.detectChanges();
  });
});
