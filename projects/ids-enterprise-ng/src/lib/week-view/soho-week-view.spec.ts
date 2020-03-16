import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SohoWeekViewComponent } from './soho-week-view.component';
import { SohoWeekViewModule } from './soho-week-view.module';
import { TestHelper } from '../utils';

const eventTypes: SohoWeekViewEventType[] = [
  {
    id: 'dto',
    label: 'Discretionary Time Off',
    translationKey: 'DiscretionaryTimeOff',
    color: 'azure',
    checked: true,
    click: null
  }
];
const events: SohoWeekViewEvent[] = [
  {
    id: '1',
    subject: 'Discretionary Time Off',
    shortSubject: 'DTO',
    comments: 'Short getaway',
    location: 'Us Office',
    status: 'Draft',
    starts: '2019-02-12T00:00:00.000',
    ends: '2019-02-12T23:59:59.999',
    type: 'dto',
    isAllDay: true
  }
];

describe('Soho Week view Unit Tests', () => {
  let comp: SohoWeekViewComponent;
  let fixture: ComponentFixture<SohoWeekViewComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SohoWeekViewModule]
    });

    fixture = TestBed.createComponent(SohoWeekViewComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;

    Soho.Locale.set('en-US');
  });

  it('check inputs', () => {
    const onWeekRendered = () => {
    };
    const onSelected = () => {
    };

    comp.locale = 'en-US';
    comp.eventTypes = eventTypes;
    comp.events = events;
    comp.startDate = new Date('2019-02-10');
    comp.endDate = new Date('2019-02-24');
    comp.showViewChanger = false;
    comp.renderWeekCallback = onWeekRendered;

    // check options
    expect(comp.eventTypes).toEqual(eventTypes);
    expect(comp.events).toEqual(events);
    expect(comp.locale).toEqual('en-US');
    expect(comp.showViewChanger).toEqual(false);
    expect(comp.renderWeekCallback).toEqual(onWeekRendered);

    // detect changes to cause calendar to be built.
    fixture.detectChanges();

    const updatedEventTypes = [...eventTypes];
    const updateEvents = [...events];
    const onWeekViewRendered2 = () => {
    };
    const onSelected2 = () => {
    };

    comp.locale = 'en-GB';
    comp.eventTypes = updatedEventTypes;
    comp.events = updateEvents;
    comp.showViewChanger = true;
    comp.renderWeekCallback = onWeekViewRendered2;

    // check week-view settings
    expect((comp as any).weekView.settings.eventTypes).toEqual(
      updatedEventTypes
    );
    expect((comp as any).weekView.settings.events).toEqual(updateEvents);
    expect((comp as any).weekView.settings.locale).toEqual('en-GB');
    expect((comp as any).weekView.settings.showViewChanger).toEqual(true);
    expect((comp as any).weekView.settings.onRenderWeek).toEqual(
      onWeekViewRendered2
    );

    // update required should be true after updating inputs after calendar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>(
      (comp as any).weekView,
      'updated'
    ).and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `
      <div soho-week-view
           [events]="events"
           [eventTypes]="eventTypes"
           [startDate]="startDate"
           [endDate]="endDate"
           [locale]="locale"
      >
      </div>
  `
})
class SohoWeekViewTestComponent {
  @ViewChild(SohoWeekViewComponent)
  weekView: SohoWeekViewComponent;

  public events: SohoWeekViewEvent[];
  public eventTypes: SohoWeekViewEventType[];
  public locale = 'en-US';
  public month: number;
  public year: number;
  public startDate: Date;
  public endDate: Date;
}

describe('Soho Week view Chart Render', () => {
  let weekView: SohoWeekViewComponent;
  let comp: SohoWeekViewTestComponent;
  let fixture: ComponentFixture<SohoWeekViewTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoWeekViewTestComponent],
      imports: [SohoWeekViewModule]
    });

    fixture = TestBed.createComponent(SohoWeekViewTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-week-view]')).nativeElement;

    fixture.detectChanges();
    weekView = comp.weekView;
  });

  xit('Check HTML content', () => {
    comp.locale = 'en-US';
    comp.eventTypes = eventTypes;
    comp.events = events;
    comp.startDate = new Date('2019-02-10');
    comp.endDate = new Date('2019-02-24');

    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
    expect(el.hasAttribute('soho-week-view')).toBeTruthy(
      'soho-week-view not set'
    );
  });

  xit('check outputs', () => {
    comp.locale = 'en-US';
    comp.eventTypes = eventTypes;
    comp.events = events;
    comp.startDate = new Date('2019-02-10');
    comp.endDate = new Date('2019-02-24');

    fixture.detectChanges();

    TestHelper.testFireEvent(
      weekView['element'].nativeElement,
      'selected',
      weekView['selected']
    );
    TestHelper.testFireEvent(
      weekView['element'].nativeElement,
      'weekrendered',
      weekView['weekRendered']
    );
  });
});
