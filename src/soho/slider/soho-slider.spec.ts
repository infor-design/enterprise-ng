import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoSliderModule } from './soho-slider.module';
import { SohoSliderComponent } from './soho-slider.component';

// Not able to create a component instance. Running into an error when creating jQuery instance
// Error: Element with ID "undefined" cannot invoke a slider;  it's not an Input element.

// describe('Soho Slider Unit Tests', () => {
//   let comp:     SohoSliderComponent;
//   let fixture:  ComponentFixture<SohoSliderComponent>;
//   let de:       DebugElement;
//   let el:       HTMLElement;
//
//   beforeEach( () => {
//     TestBed.configureTestingModule({
//       declarations: [ SohoSliderComponent ]
//     })
//
//     fixture = TestBed.createComponent(SohoSliderComponent);
//     comp = fixture.componentInstance;
//     fixture.detectChanges();
//
//     de = fixture.debugElement;
//     el = de.nativeElement;
//   });
//
//   it('Check Content', () => {
//     expect(el.nodeName).toEqual('DIV');
//     expect(el.classList).toContain('slider-wrapper');
//   });
// });

@Component ({
  template: `
    <input soho-slider id="slider-regular" name="slider-regular"
    min="0" max="100" type="range" value="40"/>
    `
})

class SohoSliderTestComponent {
  @ViewChild(SohoSliderComponent) slider: SohoSliderComponent;
}

describe ('Soho Slider Render', () => {
  let slider:   SohoSliderComponent;
  let comp:     SohoSliderTestComponent;
  let fixture:  ComponentFixture<SohoSliderTestComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoSliderTestComponent ],
      imports: [ FormsModule, SohoSliderModule ]
    });

    fixture = TestBed.createComponent(SohoSliderTestComponent);
    comp = fixture.componentInstance;
    slider = comp.slider;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-slider]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check slider element', () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('INPUT');
    expect(el.classList).toContain('slider');
    expect(el.getAttribute('min')).toEqual(slider.min.toString());
    expect(el.getAttribute('max')).toEqual(slider.max.toString());
    expect(el.getAttribute('value')).toEqual(slider.value[0].toString());
  });

  it('Slider disabled', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('disabled')).toBeFalsy();
    slider.disabled = true;
    fixture.detectChanges();
    expect(el.hasAttribute('disabled')).toBeTruthy();
    slider.disabled = false;
    fixture.detectChanges();
  });

  it('Slider vertical', () => {
    fixture.detectChanges();
    expect(el.classList).toContain('slider');
    slider.vertical = true;
    fixture.detectChanges();
    expect(el.classList).toContain('vertical');
    slider.vertical = false;
    fixture.detectChanges();
  });

  it('Slider change value', () => {
    slider.value = [60];
    fixture.detectChanges();
    expect(el.getAttribute('value')).toEqual('60');
  });
});
