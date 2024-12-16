import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';

// import { SohoProgressModule } from './soho-progress.module';
import { SohoProgressComponent } from './soho-progress.component';
// import { SohoComponentsModule } from '../soho-components.module';

@Component({
    template: `
    <soho-progress progressValue="50">
       <div class="progress-bar" data-value="50" id="progress-bar1" aria-labelledby="pr-label1"></div>
    </soho-progress>
`,
    standalone: false
})

class SohoProgressTestComponent {
  @ViewChild(SohoProgressComponent) progress?: SohoProgressComponent;
}

// progress works, el does not
describe('Soho Progress Unit Tests', () => {
  let progress: SohoProgressComponent;
  let fixture: ComponentFixture<SohoProgressComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoProgressComponent]
    });

    fixture = TestBed.createComponent(SohoProgressComponent);
    progress = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement.children[0]; // de.query(By.css('div')).nativeElement;
  });

  it('Verify progress elements', () => {
    expect(el.classList[0]).toContain('progress-bar');
  });

  it('Progress update value', () => {
    progress.progressValue = 90;
    fixture.detectChanges();
    expect(el.getAttribute('data-value')).toEqual('90');
    expect(progress.progressValue).toEqual(90);
  });
});
