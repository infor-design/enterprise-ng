/// <reference path="soho-personalize.d.ts" />

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { SohoPersonalizeDirective } from './soho-personalize.directive';
import { SohoPersonalizeModule } from './soho-personalize.module';

@Component({
  template: `
  <html>
    <body>
      <div soho-personalize></div>
    </body>
  </html>`
})
class SohoPersonalizeTestComponent {
  @ViewChild(SohoPersonalizeDirective) personalize: SohoPersonalizeDirective;
}

describe('Soho Personalize Render', () => {
  let component: SohoPersonalizeTestComponent;
  let fixture: ComponentFixture<SohoPersonalizeTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoPersonalizeTestComponent],
      imports: [SohoPersonalizeModule]
    });

    fixture = TestBed.createComponent(SohoPersonalizeTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('div[soho-personalize]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(component.personalize).not.toBeNull();
  });

  it('Check setting theme updates the component', () => {
    fixture.detectChanges();

    component.personalize.theme = 'dark';

    fixture.detectChanges();

    expect(component.personalize.options.theme).toEqual('dark');
  });

  it('Check seetting colors updates the component', () => {
    component.personalize.colors = 'FF0000';

    fixture.detectChanges();

    expect(component.personalize.options.colors).toEqual('FF0000');
  });

  it('Check event handler when theme changed', () => {
    const eventEmitterSpy = spyOn<any>(component.personalize, 'onChangeTheme');
    $('html').trigger('themechanged', 'dark');

    // Interestingly this is called three times!
    expect(eventEmitterSpy).toHaveBeenCalled();
  });

});
