import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { SohoCalendarComponent } from './soho-calendar.component';
import { SohoCalendarModule } from './soho-calendar.module';
import { TestHelper } from '../utils';

const eventTypes: SohoCalendarEventType[] = [
  {
    id: 'dto',
    label: 'Discretionary Time Off',
    translationKey: 'DiscretionaryTimeOff',
    color: 'azure',
    checked: true,
    click: () => { }
  }
];
const events: SohoCalendarEvent[] = [
  {
    id: '1',
    subject: 'Discretionary Time Off',
    shortSubject: 'DTO',
    comments: 'Short getaway',
    location: 'Us Office',
    status: 'Draft',
    starts: '2018-08-11T00:00:00.000',
    ends: '2018-08-11T23:59:59.999',
    type: 'dto',
    isAllDay: true
  }
];

describe('Soho Calendar Unit Tests', () => {
  let comp: SohoCalendarComponent;
  let fixture: ComponentFixture<SohoCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SohoCalendarModule]
    });

    fixture = TestBed.createComponent(SohoCalendarComponent);
    comp = fixture.componentInstance;
  });

  it('check inputs', () => {
    const onMonthRendered = () => { };
    const onSelected = () => { };

    comp.eventTypes = eventTypes;
    comp.events = events;
    comp.locale = 'en-US';
    comp.month = 7;
    comp.year = 2018;
    comp.showViewChanger = false;
    comp.renderMonthCallback = onMonthRendered;
    comp.selectedCallback = onSelected;
    comp.upcomingEventDays = 5;
    comp.displayRange = {
      start: '07/11/2018',
      end: '09/30/2018',
    }
    // comp.template = '';
    // comp.modalTemplate = 'abc';
    // comp.menuId = 'id1';
    // comp.menuSelected = ;
    // comp.newEventDefaults = ;

    // check options
    expect(comp.eventTypes).toEqual(eventTypes);
    expect(comp.events).toEqual(events);
    expect(comp.locale).toEqual('en-US');
    expect(comp.month).toEqual(7);
    expect(comp.year).toEqual(2018);
    expect(comp.showViewChanger).toEqual(false);
    expect(comp.renderMonthCallback).toEqual(onMonthRendered);
    expect(comp.selectedCallback).toEqual(onSelected);
    expect(comp.upcomingEventDays).toEqual(5);
    expect(comp.displayRange).toEqual({
      start: '07/11/2018',
      end: '09/30/2018',
    });
    // expect((comp as any).options.template).toEqual();
    // expect((comp as any).options.modalTemplate).toEqual();
    // expect((comp as any).options.menuId).toEqual();
    // expect((comp as any).options.menuSelected).toEqual();
    // expect((comp as any).options.newEventDefaults).toEqual();

    // detect changes to cause calendar to be built.
    fixture.detectChanges();

    const updatedEventTypes = [...eventTypes];
    const updateEvents = [...events];
    const onMonthRendered2 = () => { };
    const onSelected2 = () => { };

    comp.eventTypes = updatedEventTypes;
    comp.events = updateEvents;
    comp.locale = 'en-GB';
    comp.month = 1;
    comp.year = 2019;
    comp.showViewChanger = true;
    comp.renderMonthCallback = onMonthRendered2;
    comp.selectedCallback = onSelected2;
    comp.upcomingEventDays = 2;

    // check calendar settings
    expect((comp as any).calendar.settings.eventTypes).toEqual(
      updatedEventTypes
    );
    expect((comp as any).calendar.settings.events).toEqual(updateEvents);
    expect((comp as any).calendar.settings.locale).toEqual('en-GB');
    expect((comp as any).calendar.settings.month).toEqual(1);
    expect((comp as any).calendar.settings.year).toEqual(2019);
    expect((comp as any).calendar.settings.showViewChanger).toEqual(true);
    expect((comp as any).calendar.settings.onRenderMonth).toEqual(
      onMonthRendered2
    );
    expect((comp as any).calendar.settings.onSelected).toEqual(onSelected2);
    expect((comp as any).calendar.settings.upcomingEventDays).toEqual(2);

    // update required should be true after updating inputs after calendar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>(
      (comp as any).calendar,
      'updated'
    ).and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `
    <div
      soho-calendar
      [events]="events"
      [eventTypes]="eventTypes"
      [month]="month"
      [displayRange]="displayRange"
      [year]="year"
      [locale]="locale"
    >
      <div soho-calendar-monthview></div>
    </div>
  `
})
class SohoCalendarTestComponent {
  @ViewChild(SohoCalendarComponent)
  calendar?: SohoCalendarComponent | null;
  public events?: SohoCalendarEvent[];
  public eventTypes?: SohoCalendarEventType[];
  public locale = 'en-US';
  public month?: number;
  public year?: number;
  public displayRange?: Object;
}

describe('Soho Calendar Chart Render', () => {
  let calendar: SohoCalendarComponent;
  let comp: SohoCalendarTestComponent;
  let fixture: ComponentFixture<SohoCalendarTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  const testParams = [
    {
      month: 7,
      year: 2018
    },
    {
      displayRange: {
        start: '07/11/2018',
        end: '09/30/2018',
      }
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoCalendarTestComponent],
      imports: [SohoCalendarModule]
    });

    fixture = TestBed.createComponent(SohoCalendarTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-calendar]')).nativeElement;

    fixture.detectChanges();
    calendar = (comp.calendar as any);
    expect(calendar).toBeDefined();
  });

  // Rerun the same tests using different parameters
  for (const testParam of testParams) {
    (function (testSpec) {
      it('Check HTML content', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? undefined;
        comp.year = testSpec.year ?? undefined;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();

        expect(el.nodeName).toEqual('DIV');
        expect(el.hasAttribute('soho-calendar')).toBeTruthy(
          'soho-calendar not set'
        );
      });

      it('check getDayEvents function', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? 7;
        comp.year = testSpec.year ?? 2018;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();
        const requestDate: Date = new Date(comp.year, comp.month, 11);
        const dayEvents: SohoCalendarDayEvents = calendar.getDayEvents(requestDate);

        expect(dayEvents.events[0].id).toEqual(events[0].id);
        expect(dayEvents.events[0].title).toEqual(events[0].title);
        expect(dayEvents.events[0].type).toEqual(events[0].type);
        expect(dayEvents.events[0].comments).toEqual(events[0].comments);
        expect(dayEvents.events[0].location).toEqual(events[0].location);
        expect(dayEvents.events[0].status).toEqual(events[0].status);
        expect(dayEvents.events[0].starts).toEqual(events[0].starts);
        expect(dayEvents.events[0].ends).toEqual(events[0].ends);
        expect(dayEvents.events[0].type).toEqual(events[0].type);
      });

      it('check addEvent function', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? undefined;
        comp.year = testSpec.year ?? undefined;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();

        const newEvent: SohoCalendarEvent = {
          id: '6',
          subject: 'Discretionary Time Off',
          shortSubject: 'DTO',
          comments: 'Personal time',
          location: 'Canada Office',
          status: 'Approved',
          starts: '2018-08-24T10:00:00.999',
          ends: '2018-08-24T14:00:00.999',
          type: 'dto',
          isAllDay: false
        };

        const calAddEventSpy = spyOn<any>(
          (comp as any).calendar,
          'addEvent'
        ).and.callThrough();
        calendar.addEvent(newEvent);
        expect(calAddEventSpy).toHaveBeenCalledTimes(1);
      });

      it('check updateEvent function', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? undefined;
        comp.year = testSpec.year ?? undefined;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();

        const updateEvent: SohoCalendarEvent = Object.assign(events[0], {
          comments: 'Vacation Time',
          location: 'Africa'
        });

        const calUpdateEventSpy = spyOn<any>(
          (comp as any).calendar,
          'updateEvent'
        ).and.callThrough();
        calendar.updateEvent(updateEvent);
        expect(calUpdateEventSpy).toHaveBeenCalledTimes(1);
      });

      it('check deleteEvent function', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? undefined;
        comp.year = testSpec.year ?? undefined;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();

        const deleteEvent: SohoCalendarEvent = events[0];
        const calDeleteEventSpy = spyOn<any>(
          (comp as any).calendar,
          'deleteEvent'
        ).and.callThrough();
        calendar.deleteEvent(deleteEvent);
        expect(calDeleteEventSpy).toHaveBeenCalledTimes(1);
      });

      it('check clearEvents function', () => {
        comp.eventTypes = eventTypes;
        comp.events = events;
        comp.month = testSpec.month ?? undefined;
        comp.year = testSpec.year ?? undefined;
        comp.displayRange = testSpec.displayRange ?? undefined;

        fixture.detectChanges();

        const clearEventsSpy = spyOn<any>(
          (comp as any).calendar,
          'clearEvents'
        ).and.callThrough();
        calendar.clearEvents();
        expect(clearEventsSpy).toHaveBeenCalledTimes(1);
      });

      xit('check showEventModal function', () => { });

      xit('check modalVisible function', () => { });

    })(testParam);
  }
});
