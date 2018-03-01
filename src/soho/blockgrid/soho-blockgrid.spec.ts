import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoBlockGridModule } from './soho-blockgrid.module';
import { SohoBlockGridComponent } from './soho-blockgrid.component';

describe('Soho blockgrid Unit Tests', () => {
  let comp:     SohoBlockGridComponent;
  let fixture:  ComponentFixture<SohoBlockGridComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBlockGridComponent ]
    });

    fixture = TestBed.createComponent(SohoBlockGridComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });
});

@Component({
  template: `<div soho-blockgrid [dataset]="data">`
})
class SohoBlockGridTestComponent {
  @ViewChild(SohoBlockGridComponent) blockgrid: SohoBlockGridComponent;

  public data = [
    { img: 'https://randomuser.me/api/portraits/med/women/8.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/9.jpg', maintxt: 'Jane Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/10.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, SVP' },
    { img: 'https://randomuser.me/api/portraits/med/women/11.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/12.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Architect' }
  ];
}

describe('Soho blockgrid Render', () => {
  let blockgrid:  SohoBlockGridComponent;
  let component: SohoBlockGridTestComponent;
  let fixture:   ComponentFixture<SohoBlockGridTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoBlockGridTestComponent ],
      imports: [ FormsModule, SohoBlockGridModule ]
    });

    fixture = TestBed.createComponent(SohoBlockGridTestComponent);
    component = fixture.componentInstance;
    blockgrid = component.blockgrid;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-blockgrid]')).nativeElement;

  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-blockgrid')).toBeTruthy('soho-blockgrid');
  });

});
