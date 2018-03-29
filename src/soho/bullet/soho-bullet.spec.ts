import {} from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBulletModule } from './soho-bullet.module';
import { SohoBulletComponent } from './soho-bullet.component';

describe('Soho Bullet Unit Tests', () => {
  let comp:     SohoBulletComponent;
  let fixture:  ComponentFixture<SohoBulletComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBulletComponent ]
    });

    fixture = TestBed.createComponent(SohoBulletComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-bullet [dataset]="bulletData1">`
})
class SohoBulletTestComponent {
  @ViewChild(SohoBulletComponent) bullet: SohoBulletComponent;

  public bulletData1 = [{
    data: [{
      'title': 'Revenue',
      'subtitle': 'US$, in thousands',
      'ranges': [150, 225, 300, 400, 600],
      'measures': [220, 270],
      'markers': [250], url: 'http://someplace.com',
        tooltip: ['<b>Poor</b> 150', '<b>Ok</b> 225', '<b>Good</b> 300', '<b>Excellent</b> 400', '<b>Revenue</b> 600']}
    ],
    barColors: ['#C0EDE3', '#8ED1C6', '#69ADA3', '#448D83', '#206B62'],
    lineColors: ['#000000', '#000000', '#000000'],
    markerColors: ['#000000']
  }];

  public bulletData2 = [{
    data: [{
      'title': 'Profit',
      'subtitle': '%',
      'ranges': [20, 25, 30],
      'measures': [17, 21],
      'markers': [26]
      }
    ],
    barColors: ['#ADD8EB', '#69B5DD', '#368AC0'],
    lineColors: ['#000000', '#000000', '#000000'],
    markerColors: ['#000000']
  }];
}

describe('Soho Bullet Chart Render', () => {
  let bullet: SohoBulletComponent;
  let component: SohoBulletTestComponent;
  let fixture:   ComponentFixture<SohoBulletTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBulletTestComponent ],
      imports: [ FormsModule, SohoBulletModule ]
    });

    fixture = TestBed.createComponent(SohoBulletTestComponent);
    component = fixture.componentInstance;
    bullet = component.bullet;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-bullet]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-bullet')).toBeTruthy('soho-bullet');
  });

});
