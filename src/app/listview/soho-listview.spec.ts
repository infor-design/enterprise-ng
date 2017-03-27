import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { ListViewDemoComponent } from './listview.demo';
import { SohoComponentsModule } from '@infor/sohoxi-angular';
import { SohoListViewModule } from '@infor/sohoxi-angular';

describe('ListViewDemoComponent', () => {
  let component: ListViewDemoComponent;
  let fixture: ComponentFixture<ListViewDemoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListViewDemoComponent,
      ],
      imports: [
        SohoComponentsModule
      ],
    });
    TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListViewDemoComponent);
    component    = fixture.componentInstance;
  });

describe('constructor()', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  it('should create the component 2', () => {
      expect(component).toBeTruthy();
    });
  });
});
