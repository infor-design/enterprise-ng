import {
  ComponentFixture,
  async,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  OnInit,
  DebugElement,
  Injectable,
  ViewChild
} from '@angular/core';

import { Observable, of } from 'rxjs';

import { FormsModule } from '@angular/forms';

import { SohoSwapListModule } from './soho-swaplist.module';
import { SohoSwapListComponent } from './soho-swaplist.component';

import {
  SohoSwapListService
} from './soho-swaplist.service';

@Injectable()
export class SwapListTestService extends SohoSwapListService {
  private options: SohoSwapListOptions = {};
  private availableDemoItems: SohoSwapListItem[] = [];
  private selectedDemoItems: SohoSwapListItem[] = [];
  private additionalDemoItems: SohoSwapListItem[] = [];

  getData(): Observable<SohoSwapListOptions> {
    // console.log(this.options.available);
    return of(this.options);
  }

  constructor() {
    super();
    this.init();
  }

  init() {
    this.availableDemoItems.push(
      { id: 1, value: 'opt-1', text: 'Option A' },
      { id: 2, value: 'opt-2', text: 'Option B' },
      { id: 3, value: 'opt-3', text: 'Option C' },
      { id: 5, value: 'opt-5', text: 'Option E', disabled: true },
      { id: 6, value: 'opt-6', text: 'Option F' },
      { id: 8, value: 'opt-8', text: 'Option H' },
      { id: 9, value: 'opt-9', text: 'Option I' });

    this.selectedDemoItems.push(
      { id: 4, value: 'opt-4', text: 'Option D' },
      { id: 7, value: 'opt-7', text: 'Option G' },
      { id: 11, value: 'opt-11', text: 'Option K' });

    this.additionalDemoItems.push(
      { id: 10, value: 'opt-10', text: 'Option J' },
      { id: 12, value: 'opt-12', text: 'Option L' },
      { id: 13, value: 'opt-13', text: 'Option M' },
      { id: 14, value: 'opt-14', text: 'Option N' });

    this.options.available = this.availableDemoItems;
    this.options.selected = this.selectedDemoItems;
    this.options.additional = this.additionalDemoItems;
  }
}

@Component({
  template: `
  <soho-swaplist showFullAccessCard="true" id="swaplist1" [availableItems]="options.available"
    [selectedItems]="options.selected" [additionalItems]= "options.additional">
  </soho-swaplist>`
})
class SohoSwapListTestComponent {
  @ViewChild(SohoSwapListComponent) swaplist: SohoSwapListComponent;
  public options = {
    available: [
      { id: 1, value: 'opt-1', text: 'Option A' },
      { id: 2, value: 'opt-2', text: 'Option B' },
      { id: 3, value: 'opt-3', text: 'Option C' },
      { id: 5, value: 'opt-5', text: 'Option E', disabled: true },
      { id: 6, value: 'opt-6', text: 'Option F' },
      { id: 8, value: 'opt-8', text: 'Option H' },
      { id: 9, value: 'opt-9', text: 'Option I' }],
    selected: [
      { id: 4, value: 'opt-4', text: 'Option D' },
      { id: 7, value: 'opt-7', text: 'Option G' },
      { id: 11, value: 'opt-11', text: 'Option K' }],
    additional: [
      { id: 10, value: 'opt-10', text: 'Option J' },
      { id: 12, value: 'opt-12', text: 'Option L' },
      { id: 13, value: 'opt-13', text: 'Option M' },
      { id: 14, value: 'opt-14', text: 'Option N' }]
  };
}

@Component({
  template: `<soho-swaplist showFullAccessCard="true" id="swaplist-service"></soho-swaplist>`,
  providers: [SwapListTestService]
})
class SohoSwapListServiceTestComponent implements OnInit {
  @ViewChild(SohoSwapListComponent) swaplist: SohoSwapListComponent;

  constructor(private service: SwapListTestService) {
  }

  ngOnInit() {
    this.updateData();
  }

  onSelected(event: any) {
    // console.log(this.swaplist.selectedItems);
  }

  onUpdated(event: any) {
    // console.log(this.swaplist.selectedItems);
  }

  updateData() {
    this.service.getData().subscribe((d: SohoSwapListOptions) => {
      this.swaplist.updateDataset(d);
      setTimeout(() => this.updateData(), 2000);
    });
  }

  get selectedItems(): SohoSwapListItem[] {
    return this.swaplist.selectedItems;
  }
}

describe('Soho Swap List Unit Tests', () => {
  let comp: SohoSwapListComponent;
  let fixture: ComponentFixture<SohoSwapListComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SohoSwapListModule]
    });

    fixture = TestBed.createComponent(SohoSwapListComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.id).toEqual(comp.id);
    expect(el.classList).toContain('swaplist');
  });

  it('Check Default \'name\' property', () => {
    expect(comp.name).toContain('soho-swaplist');
  });

  it('Check setting \'name\' property.', () => {
    comp.name = 'swaplist-1';
    expect(comp.name).toEqual('swaplist-1');
    expect(comp.id).toEqual('swaplist-1');

    fixture.detectChanges();
    expect(el.id).toEqual(comp.id);
  });

  it('Check setting \'showFullAccessCard\' property.', () => {
    expect(comp.showFullAccessCard).toBeFalsy();
    expect(el.hasAttribute('showFullAccessCard')).toBeFalsy();
  });

  // Add more method tests.
});

describe('Soho Swap List Render', () => {
  let com: SohoSwapListComponent;
  let component: SohoSwapListTestComponent;
  let fixture: ComponentFixture<SohoSwapListTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSwapListTestComponent],
      imports: [FormsModule, SohoSwapListModule]
    });

    fixture = TestBed.createComponent(SohoSwapListTestComponent);
    component = fixture.componentInstance;
    com = component.swaplist;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    el = de.query(By.css('.swaplist')).nativeElement;
    expect(el.id).toEqual(com.id);
    expect(el.classList).toContain('swaplist');
    expect(el.hasAttribute('showFullAccessCard')).toBeTruthy('true');
  });

  it('Check titles', () => {
    // com.availableCardTitle = 'TestAvailable';
    // com.selectedCardTitle = 'TestSelected';
    // com.fullAccessCardTitle = 'TestFullAccess';

    fixture.detectChanges();
    const cards = de.queryAll(By.css('soho-swaplist-card'));

    // available
    const aTitleEl = cards[0].query(By.css('.card-title')).nativeElement;
    expect(aTitleEl.textContent).toEqual(com.availableCardTitle);

    // selected
    const sTitleEl = cards[1].query(By.css('.card-title')).nativeElement;
    expect(sTitleEl.textContent).toEqual(com.selectedCardTitle);

    // full access
    const fTitleEl = cards[2].query(By.css('.card-title')).nativeElement;
    expect(fTitleEl.textContent).toEqual(com.fullAccessCardTitle);
  });

  it('Check items text', () => {
    const cards = de.queryAll(By.css('soho-swaplist-card'));

    // available
    let i = 0;
    let items = cards[0].queryAll(By.css('.swaplist-item-content'));
    const aItems = com.availableItems;
    items.forEach(item => {
      const itemTextEl = item.query(By.css('p')).nativeElement;
      expect(itemTextEl.textContent).toEqual(aItems[i].text);
      i++;
    });

    // selected
    i = 0;
    items = cards[1].queryAll(By.css('.swaplist-item-content'));
    const sItems = com.selectedItems;
    items.forEach(item => {
      const itemTextEl = item.query(By.css('p')).nativeElement;
      expect(itemTextEl.textContent).toEqual(sItems[i].text);
      i++;
    });

    // full access
    i = 0;
    items = cards[2].queryAll(By.css('.swaplist-item-content'));
    const fItems = com.additionalItems;
    items.forEach(item => {
      const itemTextEl = item.query(By.css('p')).nativeElement;
      expect(itemTextEl.textContent).toEqual(fItems[i].text);
      i++;
    });
  });
});

describe('Soho Swap List Service', () => {
  let com: SohoSwapListComponent;
  let component: SohoSwapListServiceTestComponent;
  let fixture: ComponentFixture<SohoSwapListServiceTestComponent>;
  let spy: jasmine.Spy;
  let service: SwapListTestService;
  let de: DebugElement;

  const options: SohoSwapListOptions = {
    available: [
      { id: 1, value: 'opt-1', text: 'Option A' },
      { id: 2, value: 'opt-2', text: 'Option B' },
      { id: 3, value: 'opt-3', text: 'Option C' },
      { id: 5, value: 'opt-5', text: 'Option E', disabled: true },
      { id: 6, value: 'opt-6', text: 'Option F' },
      { id: 8, value: 'opt-8', text: 'Option H' },
      { id: 9, value: 'opt-9', text: 'Option I' }],
    selected: [
      { id: 4, value: 'opt-4', text: 'Option D' },
      { id: 7, value: 'opt-7', text: 'Option G' },
      { id: 11, value: 'opt-11', text: 'Option K' }],
    additional: [
      { id: 10, value: 'opt-10', text: 'Option J' },
      { id: 12, value: 'opt-12', text: 'Option L' },
      { id: 13, value: 'opt-13', text: 'Option M' },
      { id: 14, value: 'opt-14', text: 'Option N' }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSwapListServiceTestComponent],
      imports: [FormsModule, SohoSwapListModule],
      providers: [SwapListTestService],
    });

    fixture = TestBed.createComponent(SohoSwapListServiceTestComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(SwapListTestService);

    // Setup spy on the `getData` method
    spy = spyOn(service, 'getData')
      .and.returnValue(of(options));

    com = component.swaplist;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  xit('Check items text', async(() => {
    fixture.detectChanges();

    fixture.whenStable().then(() => { // wait for async getQuote
      fixture.detectChanges();        // update view with quote

      const cards = de.queryAll(By.css('soho-swaplist-card'));

      // available
      let i = 0;
      let items = cards[0].queryAll(By.css('.swaplist-item-content'));
      const aItems = com.availableItems;
      items.forEach(item => {
        const itemTextEl = item.query(By.css('p')).nativeElement;
        expect(itemTextEl.textContent).toEqual(aItems[i].text);
        i++;
      });

      // selected
      i = 0;
      items = cards[1].queryAll(By.css('.swaplist-item-content'));
      const sItems = com.selectedItems;
      items.forEach(item => {
        const itemTextEl = item.query(By.css('p')).nativeElement;
        expect(itemTextEl.textContent).toEqual(sItems[i].text);
        i++;
      });

      // full access
      i = 0;
      items = cards[2].queryAll(By.css('.swaplist-item-content'));
      const fItems = com.additionalItems;
      items.forEach(item => {
        const itemTextEl = item.query(By.css('p')).nativeElement;
        expect(itemTextEl.textContent).toEqual(fItems[i].text);
        i++;
      });
    });
  }));
});
