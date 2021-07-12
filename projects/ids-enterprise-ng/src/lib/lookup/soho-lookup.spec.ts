import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement, ElementRef,
  EventEmitter,
  Input,
  ViewChild
} from '@angular/core';

import {
  FormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';

import { SohoLookupModule } from './soho-lookup.module';
import { SohoLookupComponent } from './soho-lookup.component';
import { ReactiveFormsModule } from '@angular/forms';

export const productsData = [
  {
    id: 1,
    productId: 2142201,
    productName: 'Compressor',
    activity: 'Assemble Paint',
    quantity: 1,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2014, 12, 8),
    action: 'Action',
  }, {
    id: 2,
    productId: 2241202,
    productName: 'Different Compressor',
    activity: 'Inspect and Repair',
    quantity: 2,
    price: 210.99,
    status: '',
    orderDate: new Date(2015, 7, 3),
    action: 'On Hold',
  }, {
    id: 3,
    productId: 2342203,
    productName: 'Compressor',
    activity: 'Inspect and Repair',
    quantity: 1,
    price: 120.99,
    status: null as any,
    orderDate: new Date(2014, 6, 3),
    action: 'Action',
  }, {
    id: 4,
    productId: 2445204,
    productName: 'Another Compressor',
    activity: 'Assemble Paint',
    quantity: 3,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 3, 3),
    action: 'Action',
  }, {
    id: 5,
    productId: 2542205,
    productName: 'I Love Compressors',
    activity: 'Inspect and Repair',
    quantity: 4,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 5, 5),
    action: 'On Hold',
  }, {
    id: 5,
    productId: 2642205,
    productName: 'Air Compressors',
    activity: 'Inspect and Repair',
    quantity: 41,
    price: 120.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  }, {
    id: 6,
    productId: 2642206,
    productName: 'Some Compressor',
    activity: 'inspect and Repair',
    quantity: 41,
    price: 123.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  },
];

export const updatedProductsData = [...productsData, {
  id: 7,
  productId: 2642207,
  productName: 'Some other Compressor',
  activity: 'Buy it!',
  quantity: 54,
  price: 220.99,
  status: 'OK',
  orderDate: new Date(2016, 6, 9),
  action: 'Ready',
}];

export const productsColumns = [
  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    width: 140,
    formatter: Soho.Formatters.Readonly
  },
  {
    id: 'productName',
    name: 'Product Name',
    sortable: false,
    field: 'productName',
    width: 250,
    formatter: Soho.Formatters.Hyperlink
  },
  {
    id: 'activity',
    hidden: true,
    name: 'Activity',
    field: 'activity',
    width: 125,
  },
  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
    width: 125,
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    width: 125,
    formatter: Soho.Formatters.Decimal
  },
  {
    id: 'orderDate',
    name: 'Order Date',
    field: 'orderDate',
    formatter: Soho.Formatters.Date,
    dateFormat: 'M/d/yyyy'
  },
];

export const checkboxColumn = {
  id: 'selectionCheckbox',
  sortable: false,
  resizable: false,
  width: 50,
  formatter: Soho.Formatters.SelectionCheckbox,
  align: 'center',
};

@Component({
  template: `
  <form [formGroup]="formGroup">
    <input soho-lookup formControlName="lookup" [columns]="lookupColumns" [dataset]="lookupData" field="productId" name="lookup" />
  </form>`
})
class SohoLookupReactiveFormTestComponent {
  @ViewChild(SohoLookupComponent) lookup?: SohoLookupComponent;

  formGroup: FormGroup;

  public lookupColumns = productsColumns;

  @Input() public lookupData = productsData;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.createForm();

    // By default the form group is disabled.
    this.formGroup.disable();
  }

  private createForm() {
    return this.formBuilder.group({
      lookup: '2542205'
    });
  }
}

describe('SohoLookupComponent on ReactiveForm', () => {
  let component: SohoLookupReactiveFormTestComponent;
  let fixture: ComponentFixture<SohoLookupReactiveFormTestComponent>;
  let de: DebugElement;
  let el: HTMLInputElement;

  const testFireEvent = (eventEmitter: EventEmitter<any>, functionName: string, eventName: string) => {
    component.formGroup.enable();
    fixture.detectChanges();

    const eventEmitterSpy = spyOn<any>(eventEmitter, functionName);
    (component.lookup as any).jQueryElement.trigger(eventName);
    expect(eventEmitterSpy).toHaveBeenCalledTimes(1);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoLookupReactiveFormTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoLookupModule]
    });

    fixture = TestBed.createComponent(SohoLookupReactiveFormTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-lookup]')).nativeElement;

    fixture.detectChanges();
  });

  it('is disabled by default.', () => {
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');

    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is enabled after call to enable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');
  });

  it('is disabled after call to disable().', () => {
    component.lookup?.disable();
    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('is enabled after call to enable().', (done) => {
    fixture.detectChanges();
    component.lookup?.enable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeFalsy('disabled');

    done();
  });

  it('is readonly after call to readonly().', async () => {
    await component.lookup?.readonly();
    fixture.detectChanges();
    expect(el.hasAttribute('readonly')).toBeTruthy('readonly');
  });

  it('is disabled after call to disable().', () => {
    component.formGroup.enable();
    fixture.detectChanges();
    component.formGroup.disable();
    fixture.detectChanges();

    expect(el.hasAttribute('disabled')).toBeTruthy('disabled');
  });

  it('initial value is set.', () => {
    component.formGroup.enable();

    fixture.detectChanges();

    expect(el.value).toEqual('2542205');
  });

  it('should fire beforeopen event', () => {
    testFireEvent((component.lookup as any).beforeopen, 'emit', 'beforeopen');
  });

  it('should fire open event', () => {
    testFireEvent((component.lookup as any).open, 'emit', 'open');
  });

  it('should call destroy afteropen event', () => {
    testFireEvent((component.lookup as any).afteropen, 'emit', 'afteropen');
  });

  // todo this.lookup.grid is undefined during this test. See lookup @Input dataset for details.
  it('control data updates when new data is set', async () => {
    await component.formGroup.enable();

    expect(component.lookup).toBeDefined('is not defined');
    expect((component.lookup as any).lookup).toBeDefined('lookup is not defined');
    component.lookupData = updatedProductsData;
    fixture.detectChanges();
  });
});

@Component({
  template: `
    <input #disabledBound soho-lookup [disabled]="disabled">

    <input #attrDisabledBound soho-lookup [attr.disabled]="disabled ? '' : null">

    <input #reactiveFormBound [formControl]="reactiveControl" soho-lookup>
  `,
})
class DisabledTestComponent {
  @ViewChild("disabledBound", { read: ElementRef }) disabledBound!: ElementRef<HTMLInputElement>;
  @ViewChild("attrDisabledBound", { read: ElementRef }) attrDisabledBound!: ElementRef<HTMLInputElement>;
  @ViewChild("reactiveFormBound", { read: ElementRef }) reactiveFormBound!: ElementRef<HTMLInputElement>;

  reactiveControl = this.formBuilder.control("");
  disabled?: boolean;

  constructor(private formBuilder: FormBuilder) { }

  disableAll() {
    this.disabled = true;
    this.reactiveControl.disable();
  }

  enableAll() {
    this.disabled = false;
    this.reactiveControl.enable();
  }
}

describe('SohoLookupComponent disabled state', () => {

  let fixture: ComponentFixture<DisabledTestComponent>;
  let component: DisabledTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisabledTestComponent],
      imports: [
        SohoLookupModule,
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(DisabledTestComponent);
    component = fixture.componentInstance;
  });

  describe("when initially disabled", () => {
    beforeEach(async () => {
      await disableAll();
    });


    it("should be disabled when [disabled] is true", async () => {
      await disableAll();
      expectDisabled(component.disabledBound)
    });

    it("should be enabled when [disabled] is false", async () => {
      await enableAll();
      expectEnabled(component.disabledBound)
    });

    it("should be disabled when [attr.disabled] is ''", async () => {
      await disableAll();
      expectDisabled(component.attrDisabledBound)
    });

    it("should be enabled when [attr.disabled] is null", async () => {
      await enableAll();
      expectEnabled(component.attrDisabledBound)
    });

    it("should be disabled when [formControl] is disabled", async () => {
      await disableAll();
      expectDisabled(component.reactiveFormBound)
    });

    it("should be enabled when [formControl] is enabled", async () => {
      await enableAll();
      expectEnabled(component.reactiveFormBound)
    });
  })

  describe("when initially enabled", () => {
    beforeEach(async () => {
      await enableAll();
    });

    it("should be disabled when [disabled] is true", async () => {
      await disableAll();
      expectDisabled(component.disabledBound)
    });

    it("should be enabled when [disabled] is false", async () => {
      await enableAll();
      expectEnabled(component.disabledBound)
    });

    it("should be disabled when [attr.disabled] is ''", async () => {
      await disableAll();
      expectDisabled(component.attrDisabledBound)
    });

    it("should be enabled when [attr.disabled] is null", async () => {
      await enableAll();
      expectEnabled(component.attrDisabledBound)
    });

    it("should be disabled when [formControl] is disabled", async () => {
      await disableAll();
      expectDisabled(component.reactiveFormBound)
    });

    it("should be enabled when [formControl] is enabled", async () => {
      await enableAll();
      expectEnabled(component.reactiveFormBound)
    });
  });

  async function disableAll() {
    await setAllDisabled(true);
  }

  async function enableAll() {
    await setAllDisabled(false);
  }

  async function setAllDisabled(disabled: boolean) {
    if (disabled) {
      component.disableAll();
    } else {
      component.enableAll();
    }
    fixture.detectChanges();
    await fixture.whenStable();
  }

  function expectDisabled(element: ElementRef<HTMLInputElement>) {
    expect(element.nativeElement.disabled).toBeTrue();
  }

  function expectEnabled(element: ElementRef<HTMLInputElement>) {
    expect(element.nativeElement.disabled).toBeFalse();
  }
});

