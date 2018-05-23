import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SohoTagComponent } from './soho-tag.component';

describe('TagComponent', () => {
  let component: SohoTagComponent;
  let fixture: ComponentFixture<SohoTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SohoTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call updated', () => {
    component.updated();
  });
});
