import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalizeMenuComponent } from './personalize-menu.component';
import { SohoComponentsModule } from 'ids-enterprise-ng';

describe('PersonalizeMenuComponent', () => {
  let component: PersonalizeMenuComponent;
  let fixture: ComponentFixture<PersonalizeMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonalizeMenuComponent ],
      providers: [],
      imports: [ SohoComponentsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalizeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
