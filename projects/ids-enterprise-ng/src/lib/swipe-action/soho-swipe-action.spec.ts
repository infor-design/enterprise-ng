import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';

import {
  Component,
  DebugElement,
  ViewChild,
} from '@angular/core';

import { SohoSwipeActionComponent } from './soho-swipe-action.component';

@Component({
  template: `
  <div class="row top-padding">
  <div class="six columns">
    <span class="label">Swipe Action</span>
    <soho-card ngClass="card-variant">
      <div soho-swipe-action data-options="{ swipeType: 'reveal' }">
        <div class="swipe-action-left">
          <button id="action-left-reveal" class="btn-swipe-action-left">
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use href="#icon-reply"></use>
            </svg>
            <span>Left Action</span>
          </button>
        </div>
        <div class="swipe-element">
          <div class="card-content">
            <div class="card-content-header">Tuesday, 21nd September</div>
            <div class="card-content-sub">8:40AM-2:00PM</div>
          </div>
          <div class="card-buttonset">
            <div class="card-content-action">
              <button soho-button="icon" icon="more" soho-context-menu menu="action-popupmenu" trigger="click"
                class="btn-actions"></button>
            </div>
          </div>
        </div>
        <div class="swipe-action-right">
          <button id="action-right-reveal" class="btn-swipe-action-right">
            <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
              <use href="#icon-tack"></use>
            </svg>
            <span>Right Action</span>
          </button>
        </div>
      </div>
    </soho-card>
    <ul soho-popupmenu id="action-popupmenu">
      <li soho-popupmenu-item><a soho-popupmenu-label>Left Action</a></li>
      <li soho-popupmenu-item><a soho-popupmenu-label>Right Action</a></li>
      <li soho-popupmenu-item><a soho-popupmenu-label>Desktop Only Action</a></li>
    </ul>
  </div>
</div>
  `
})
class SohoSwipeActionTestComponent {
  @ViewChild(SohoSwipeActionComponent) swipeaction?: SohoSwipeActionComponent;
}

describe('Soho Swipe Action (Reveal)', () => {
  let component: SohoSwipeActionComponent | undefined;
  let fixture: ComponentFixture<SohoSwipeActionTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSwipeActionTestComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoSwipeActionTestComponent);
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.query(By.css('[soho-swipe-action]')).nativeElement;
    component = fixture.componentInstance.swipeaction;
  });

  it('check HTML content', () => {
    expect(el.hasAttribute('soho-swipe-action')).toBeTruthy('soho-swipe-action');
  });

  it('check swipe action left element', () => {
    expect(el.querySelector('.swipe-action-left')).toBeTruthy();
    expect(el.querySelector('.btn-swipe-action-left')).toBeTruthy();
  });

  it('check swipe action element', () => {
    expect(el.querySelector('.swipe-element')).toBeTruthy();
  });

  it('check swipe action right element', () => {
    expect(el.querySelector('.swipe-action-right')).toBeTruthy();
    expect(el.querySelector('.btn-swipe-action-right')).toBeTruthy();
  });

  it('check swipe type', () => {
    expect(el.getAttribute('data-options')).toEqual("{ swipeType: 'reveal' }");
  });
});
