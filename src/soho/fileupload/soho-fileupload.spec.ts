import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFileUploadModule } from './soho-fileupload.module';
import { SohoFileUploadComponent } from './soho-fileupload.component';

describe('Soho File upload Unit Tests', () => {
  let comp:     SohoFileUploadComponent;
  let fixture:  ComponentFixture<SohoFileUploadComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadComponent ]
    });
    // .compileComponents(); // compile template and css;

    fixture = TestBed.createComponent(SohoFileUploadComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('INPUT');
    expect(el.attributes[0].name).toEqual('type');
    expect(el.attributes[0].value).toEqual('file');
    expect(el.parentElement.nodeName).toEqual('LABEL');
    expect(el.parentElement.classList).toContain('fileupload');
  });

  // Add more method tests.
});

describe('Soho File upload Render', () => {
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

    de = fixture.debugElement.query(By.css('input'));
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
    expect(el.hasAttribute('readonly')).toBeTruthy();
    fileupload.readonly = false;
    fixture.detectChanges();
  });

  it('@Input() name', () => {
    fixture.detectChanges();
    expect(el.getAttribute('name')).toBe(component.name);
  });

  it('@Input() label', () => {
    fixture.detectChanges();

    expect(el.parentElement.children[0].innerHTML.trim()).toBe(component.text);
  });
});

@Component({
  template: `
  <soho-fileupload [name]="name" [label]="text"></soho-fileupload>`
})
class SohoFileUploadTestComponent {
  @ViewChild(SohoFileUploadComponent) fileupload: SohoFileUploadComponent;
  public name = 'File';
  public text = 'File Upload';
}
