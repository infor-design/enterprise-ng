import { Component, DebugElement, ViewChild } from '@angular/core';
import { SohoSplitterComponent } from './soho-splitter.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SohoSplitterModule } from './soho-splitter.module';

@Component({
  template: `
    <soho-splitter [isSplitterRight]="true" [collapseButton]="true" [save]="false" [maxWidth]="300">
      <div class="panel-header"></div>
    </soho-splitter>
    `
})
class SohoSplitterRightTestComponent {
  @ViewChild(SohoSplitterComponent) splitter?: SohoSplitterComponent | null;
}

describe('Soho Right Splitter Render', () => {
  let splitter: SohoSplitterComponent;
  let comp: SohoSplitterRightTestComponent;
  let fixture: ComponentFixture<SohoSplitterRightTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoSplitterRightTestComponent],
      imports: [SohoSplitterModule]
    });

    fixture = TestBed.createComponent(SohoSplitterRightTestComponent);
    comp = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('soho-splitter')).nativeElement;

    fixture.detectChanges();
    splitter = (comp.splitter as any);
  });

  it('Check splitter element', () => {
    fixture.detectChanges();
    expect(el.nodeName).toEqual('SOHO-SPLITTER');
    expect(Object.values(el.classList)).toEqual(['splitter', 'splitter-right']);
    expect((splitter as any).options.collapseButton).toEqual(true);
    expect((splitter as any).options.save).toEqual(false);
    expect((splitter as any).options.maxWidth).toEqual(300);
    expect((splitter as any).splitter.settings.collapseButton).toEqual(true);
    expect((splitter as any).splitter.settings.save).toEqual(false);
    expect((splitter as any).splitter.settings.maxWidth).toEqual(300);
  });
});
