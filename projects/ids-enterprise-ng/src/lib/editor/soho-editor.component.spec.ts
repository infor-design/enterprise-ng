import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SohoEditorComponent } from './soho-editor.component';

describe('SohoEditorComponent', () => {
  let component: SohoEditorComponent;
  let fixture: ComponentFixture<SohoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
