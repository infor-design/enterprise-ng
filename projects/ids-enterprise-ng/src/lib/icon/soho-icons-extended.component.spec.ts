import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SohoIconsExtendedComponent } from './soho-icons-extended.component';

describe('SohoEditorComponent', () => {
  let component: SohoIconsExtendedComponent;
  let fixture: ComponentFixture<SohoIconsExtendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoIconsExtendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoIconsExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
