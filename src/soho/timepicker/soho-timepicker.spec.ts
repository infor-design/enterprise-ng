import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SohoTimePickerModule, SohoTimePickerComponent } from '../timepicker';
import { By } from '@angular/platform-browser';

import { map } from 'rxjs/operators';

@Component({
  template: `
  <input soho-timepicker timeFormat="h:mm a" mode="standard" [(ngModel)]="model" (change)="onChange($event)"/>
`
})
class TestTimepickerComponent {
  @ViewChild(SohoTimePickerComponent) timepicker: SohoTimePickerComponent;

  @Output() changed = new EventEmitter<SohoTimePickerEvent>();

  public model = '13:00';
  onChange(value) {
    this.changed.emit(value);
  }
}

describe('Soho Timepicker Unit Tests', () => {
  let comp:     TestTimepickerComponent;
  let fixture:  ComponentFixture<TestTimepickerComponent>;
  let de:       DebugElement;
  let el:       HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTimepickerComponent ],
      imports: [ FormsModule, ReactiveFormsModule, SohoTimePickerModule ]
    });

    fixture = TestBed.createComponent(TestTimepickerComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  }));

  it('Check events', async(() => {

    spyOn(comp, 'onChange');

    const time = '18:00';

    // comp.changed.map((x: SohoTimePickerEvent) => x.data).subscribe((x) => {
    //   expect(x).toBe(time, 'Incorrect value passed to event');
    // });

    // Emulate setting the time field.
    comp.timepicker.setValue(time);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
        expect(comp.onChange).toHaveBeenCalled();
        expect(comp.model).toBe('18:00', 'Model not updated to correct value.');
    });
  }));
});
