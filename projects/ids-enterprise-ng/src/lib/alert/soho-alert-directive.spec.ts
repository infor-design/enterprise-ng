import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SohoAlertDirective } from './soho-alert.directive';
import { SohoAlertModule } from './soho-alert.module';

@Component({
  template: `
    <div class="field">
      <input soho-alert [message]="errorMsg">
    </div>
    `
})
class SohoAlertDirectiveTestComponent {
  @ViewChild(SohoAlertDirective) alert?: SohoAlertDirective | null;
  errorMsg = '';
}

describe('Soho Alert Directive Render', () => {
  let alert: SohoAlertDirective;
  let comp: SohoAlertDirectiveTestComponent;
  let fixture: ComponentFixture<SohoAlertDirectiveTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoAlertDirectiveTestComponent],
      imports: [SohoAlertModule],
    });

    fixture = TestBed.createComponent(SohoAlertDirectiveTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('input[soho-alert]')).nativeElement;

    fixture.detectChanges();
    alert = (comp.alert as any);
  });

  it('Check splitter element', () => {
    fixture.detectChanges();
    expect((alert as any)._options.message).toEqual('');
    expect(de.query(By.css('.message-text'))).toBeNull();

    comp.errorMsg = 'foo';
    fixture.detectChanges();

    expect((alert as any)._options.message).toEqual('foo');
    expect(de.query(By.css('.message-text')).nativeElement.innerText).toEqual('foo');

    comp.errorMsg = '';
    fixture.detectChanges();

    expect((alert as any)._options.message).toEqual('');
    expect(de.query(By.css('.message-text'))).toBeNull();
  });
});