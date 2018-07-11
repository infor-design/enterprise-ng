import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { map } from 'rxjs/operators';

import { SohoDatePickerModule, SohoDatePickerComponent } from './index';
import { tick } from '@angular/core/testing';

@Component({
  template: `
    <input soho-datepicker
      name="statechange"
      dateFormat="MM/dd/yyyy"
      mode="standard"
      placeholder="MM/dd/yyyy"
      [(ngModel)]="model"
      (change)="onChange($event)"/>
`
})
class TestDatePickerComponent {
  @ViewChild(SohoDatePickerComponent) datepicker: SohoDatePickerComponent;

  @Output() changed = new EventEmitter<SohoDatePickerEvent>();

  public model: string;
  onChange(value) {
    this.changed.emit(value);
  }
}

describe('Soho Datepicker Unit Tests', () => {
  let comp:     TestDatePickerComponent;
  let fixture:  ComponentFixture<TestDatePickerComponent>;
  let de:       DebugElement;
  let el:       HTMLInputElement;

  beforeEach(async((done) => {
    TestBed.configureTestingModule({
      declarations: [ TestDatePickerComponent ],
      imports: [ FormsModule, ReactiveFormsModule, SohoDatePickerModule ]
    });

    fixture = TestBed.createComponent(TestDatePickerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
    Soho.Locale.set('en-US').done(() => {

    });
  }));

  it('Check events', async(() => {

    spyOn(comp, 'onChange');

    const date = new Date('1978-11-18T12:00:00Z');

    // comp.changed.map((x: SohoDatePickerEvent) => x.data).subscribe((x) => {
    //   expect(x).toBe(date, 'Incorrect value passed to event');
    // });

    comp.datepicker.setValue(date);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(comp.onChange).toHaveBeenCalled();
        expect(comp.model).toBe('11/18/1978', 'Model not updated to correct value.');
    });
  }));
});
