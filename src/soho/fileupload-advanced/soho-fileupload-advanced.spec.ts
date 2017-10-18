import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFileUploadAdvancedModule } from './soho-fileupload-advanced.module';
import { SohoFileUploadAdvancedComponent } from './soho-fileupload-advanced.component';

describe('Soho File upload Unit Tests', () => {
  let comp:     SohoFileUploadAdvancedComponent;
  let fixture:  ComponentFixture<SohoFileUploadAdvancedComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadAdvancedComponent ]
    });
    // .compileComponents(); // compile template and css;

    fixture = TestBed.createComponent(SohoFileUploadAdvancedComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement.query(By.css('input'));
    el = de.nativeElement;
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

describe('Soho File upload Render', () => {
  let fileupload:  SohoFileUploadAdvancedComponent;
  let component:   SohoFileUploadTestComponent;
  let fixture:     ComponentFixture<SohoFileUploadTestComponent>;
  let de:          DebugElement;
  let el:          HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadTestComponent ],
      imports: [ FormsModule, SohoFileUploadAdvancedModule ]
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

});

@Component({
  template: `
  <soho-fileupload-advanced [name]="name"></soho-fileupload-advanced>`
})
class SohoFileUploadAdvancedTestComponent {
  @ViewChild(SohoFileUploadAdvancedComponent) fileupload: SohoFileUploadAdvancedComponent;
  public name = 'File';
  public text = 'File Upload';
}
