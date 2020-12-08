import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBulletModule } from './soho-bullet.module';
import { SohoBulletComponent } from './soho-bullet.component';

const bulletData1 = [{
  data: [{
    title: 'Revenue',
    subtitle: 'US$, in thousands',
    ranges: [150, 225, 300, 400, 600],
    measures: [220, 270],
    markers: [250], url: 'http://someplace.com',
    tooltip: ['<b>Poor</b> 150', '<b>Ok</b> 225', '<b>Good</b> 300', '<b>Excellent</b> 400', '<b>Revenue</b> 600']
  }
  ],
  barColors: ['#C0EDE3', '#8ED1C6', '#69ADA3', '#448D83', '#206B62'],
  lineColors: ['#000000', '#000000', '#000000'],
  markerColors: ['#000000']
}];

const bulletData2 = [{
  data: [{
    title: 'Profit',
    subtitle: '%',
    ranges: [20, 25, 30],
    measures: [17, 21],
    markers: [26]
  }
  ],
  barColors: ['#ADD8EB', '#69B5DD', '#2578A9'],
  lineColors: ['#000000', '#000000', '#000000'],
  markerColors: ['#000000']
}];

describe('Soho Bullet Unit Tests', () => {
  let comp: SohoBulletComponent;
  let fixture: ComponentFixture<SohoBulletComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBulletComponent]
    });

    fixture = TestBed.createComponent(SohoBulletComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    // todo: I think dataset's type is wrong.
    (comp.dataset as any) = bulletData1;
    comp.animate = false;
    comp.redrawOnResize = false;

    // check options
    expect((comp as any).options.dataset).toEqual(bulletData1);
    expect((comp as any).options.animate).toEqual(false);
    expect((comp as any).options.redrawOnResize).toEqual(false);

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    // todo: I think dataset's type is wrong.
    (comp.dataset as any) = bulletData2;
    comp.animate = true;
    comp.redrawOnResize = true;

    // check bar settings
    expect((comp as any).bullet.settings.dataset).toEqual(bulletData2);
    expect((comp as any).bullet.settings.animate).toEqual(true);
    expect((comp as any).bullet.settings.redrawOnResize).toEqual(true);

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>((comp as any).bullet, 'updated').and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  template: `<div soho-bullet [dataset]="data"></div>`
})
class SohoBulletTestComponent {
  @ViewChild(SohoBulletComponent) bullet?: SohoBulletComponent;
  public data = bulletData1;
}

describe('Soho Bullet Chart Render', () => {
  let fixture: ComponentFixture<SohoBulletTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoBulletTestComponent],
      imports: [FormsModule, SohoBulletModule]
    });

    fixture = TestBed.createComponent(SohoBulletTestComponent);

    de = fixture.debugElement;
    el = de.query(By.css('[soho-bullet]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-bullet')).toBeTruthy('soho-bullet');
  });

});
