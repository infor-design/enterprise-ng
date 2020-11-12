import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoSliderModule } from './soho-slider.module';
import { SohoSliderComponent } from './soho-slider.component';

@Component({
  template: `
    <input soho-slider id="slider-regular" name="slider-regular"
    min="0" max="100" type="range" value="40"/>
    `
})

class SohoSliderTestComponent {
  @ViewChild(SohoSliderComponent) slider?: SohoSliderComponent | null;
}

describe('Soho Slider Render', () => {
  let slider: SohoSliderComponent;
  let comp: SohoSliderTestComponent;
  let fixture: ComponentFixture<SohoSliderTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSliderTestComponent],
      imports: [FormsModule, SohoSliderModule]
    });

    fixture = TestBed.createComponent(SohoSliderTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-slider]')).nativeElement;

    fixture.detectChanges();
    slider = (comp.slider as any);
  });

  it('Check slider element', () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('INPUT');
    expect(el.classList).toContain('slider');
    expect(el.getAttribute('min')).toEqual((slider as any).min.toString());
    expect(el.getAttribute('max')).toEqual((slider as any).max.toString());
    expect(el.getAttribute('value')).toEqual((slider as any).value[0].toString());
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
