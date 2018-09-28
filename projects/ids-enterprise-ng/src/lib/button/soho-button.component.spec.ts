/// <reference path="soho-button.d.ts" />

import {
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

import { SohoButtonModule } from './soho-button.module';
import { SohoTooltipModule } from '../tooltip/soho-tooltip.module';
import { SohoButtonComponent } from './soho-button.component';

@Component({
  template: `
  <div>
    <button soho-button="icon" icon="bullet-list" disabled soho-tooltip title="DATAGRID_VIEW">
      <div class="disabled-tooltip" title="DATAGRID_VIEW"></div>
    </button>
  </div>`
})
class SohoButtonTestComponent {
  @ViewChild(SohoButtonComponent) button: SohoButtonComponent;

  constructor() {
  }
}

fdescribe('Soho Button Unit Tests', () => {
  let button: SohoButtonComponent;
  let component: SohoButtonTestComponent;
  let fixture: ComponentFixture<SohoButtonTestComponent>;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoButtonTestComponent],
      imports: [SohoButtonModule, SohoTooltipModule]
    });

    fixture = TestBed.createComponent(SohoButtonTestComponent);
    component = fixture.componentInstance;
    button = component.button;

    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the soho-button', async(() => {
    expect(button).toBeTruthy();
  }));

  it(`should be an icon button`, async(() => {
    expect(button.btnIcon).toBeTruthy('button should be `icon`');
  }));

  it('button span should be empty', async(() => {
    const compiled = de.nativeElement;
    expect(compiled.querySelector('span').textContent).toEqual('');
  }));

});
