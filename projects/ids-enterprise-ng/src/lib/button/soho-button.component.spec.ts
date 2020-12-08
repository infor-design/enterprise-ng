import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Component,
  ViewChild
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { SohoButtonModule } from './soho-button.module';
import { SohoTooltipModule } from '../tooltip/soho-tooltip.module';
import { ReactiveFormsModule } from '@angular/forms';
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
  @ViewChild(SohoButtonComponent, { static: true }) button?: SohoButtonComponent;

  constructor() {
  }
}

describe('Soho Button Unit Tests', () => {
  let button: SohoButtonComponent | undefined;
  let component: SohoButtonTestComponent;
  let fixture: ComponentFixture<SohoButtonTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoButtonTestComponent],
      imports: [ReactiveFormsModule, FormsModule, SohoButtonModule, SohoTooltipModule]
    });

    fixture = TestBed.createComponent(SohoButtonTestComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    button = component.button;
  });

  it('is created', () => {
    expect(component).toBeTruthy();
  });

  it('can get and set replaceText', () => {
    expect(button?.replaceText).toBeUndefined();

    (button as any).replaceText = true;
    expect((button as any)._buttonOptions.replaceText).toBeTruthy();

    (button as any).replaceText = false;
    expect((button as any)._buttonOptions.replaceText).toBeFalsy();
  });

  it('can get and set toggleOffIcon', () => {
    expect(button?.toggleOffIcon).toBeUndefined();
    (button as any).toggleOffIcon = 'heart';

    expect((button as any)._buttonOptions.toggleOffIcon).toEqual('heart');
  });

  it('can get and set toggleOnIcon', () => {
    expect(button?.toggleOnIcon).toBeUndefined();
    (button as any).toggleOnIcon = 'heart';

    expect((button as any)._buttonOptions.toggleOnIcon).toEqual('heart');
  });

  it('check hideMenuArrow', () => {
    // const spy = spyOn((component as any).ref, 'markForCheck');

    (button as any).hideMenuArrow = false;

    expect((button as any)._buttonOptions.hideMenuArrow).toBeFalsy();
    expect((button as any).button.settings.hideMenuArrow).toBeFalsy();
    // expect(spy).toHaveBeenCalled();
  });

  it('check hideMenuArrow sets option to true', () => {
    // const spy = spyOn((component as any).ref, 'markForCheck');

    (button as any).hideMenuArrow = true;

    expect((button as any)._buttonOptions.hideMenuArrow).toBeTruthy();
    expect((button as any).button.settings.hideMenuArrow).toBeTruthy();
    // expect(spy).toHaveBeenCalled();
  });

  it('check hideMenuArrow sets option to true, when no menuButton set', () => {
    // const spy = spyOn((component as any).ref, 'markForCheck');

    (button as any).button = undefined;
    (button as any).hideMenuArrow = true;

    expect((button as any)._buttonOptions.hideMenuArrow).toBeTruthy();
    // expect(spy).toHaveBeenCalledTimes(0);
  });

});
