import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoFileUploadAdvancedModule } from './soho-fileupload-advanced.module';
import { SohoFileUploadAdvancedComponent } from './soho-fileupload-advanced.component';

@Component({
  template: `<div soho-fileupload-advanced></div>`
})
class SohoFileUploadAdvancedTestComponent {
  @ViewChild(SohoFileUploadAdvancedComponent) fileuploadadvanced: SohoFileUploadAdvancedComponent;
}

describe('Soho File Upload Advanced Render', () => {
  let fileuploadadvanced:  SohoFileUploadAdvancedComponent;
  let component:           SohoFileUploadAdvancedTestComponent;
  let fixture:             ComponentFixture<SohoFileUploadAdvancedTestComponent>;
  let de:                  DebugElement;
  let el:                  HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoFileUploadAdvancedTestComponent ],
      imports: [ FormsModule, SohoFileUploadAdvancedModule ]
    });

    fixture = TestBed.createComponent(SohoFileUploadAdvancedTestComponent);
    component = fixture.componentInstance;
    fileuploadadvanced = component.fileuploadadvanced;

    de = fixture.debugElement.query(By.css('div[soho-fileupload-advanced]'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('@Input() disabled', () => {
    fixture.detectChanges();
    fileuploadadvanced.disabled = true;
    fixture.detectChanges();
    // expect(el.hasAttribute('is-disabled')).toBeTruthy();
    fileuploadadvanced.disabled = false;
    fixture.detectChanges();
  });
});
