import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DebugElement, Component, ViewChild } from '@angular/core';

import { By } from '@angular/platform-browser';

import { SohoTagComponent } from './soho-tag.component';
import { SohoTagModule } from './soho-tag.module';

describe('TagComponent', () => {
  let component: SohoTagComponent;
  let fixture: ComponentFixture<SohoTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SohoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call updated', () => {
    component.updated();
  });
});

@Component({
  template: `<span soho-tag="secondary">tag</span>`
})
class SohoTagTestComponent {
  @ViewChild(SohoTagComponent) tag?: SohoTagComponent;
}

describe('Soho Tag Render', () => {
  let tag: SohoTagComponent;
  let component: SohoTagTestComponent;
  let fixture: ComponentFixture<SohoTagTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTagTestComponent],
      imports: [SohoTagModule]
    });

    fixture = TestBed.createComponent(SohoTagTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[soho-tag]')).nativeElement;

    fixture.detectChanges();
    tag = (component.tag as any);
  });

  afterEach(() => {
    de.nativeElement.remove();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('soho-tag')).toBeTruthy('soho-tag');
  });

  it('Check \"class\" ', () => {
    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).toContain('secondary');
    expect(topLevelElement.classList).toContain('tag');
  });

  it('Check \"error\" ', () => {
    fixture.detectChanges();

    tag.sohoTag = 'error';

    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).toContain('error');
    expect(topLevelElement.classList).toContain('tag');
  });

  it('Check \"default\" ', () => {
    fixture.detectChanges();

    tag.sohoTag = undefined;

    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).not.toContain('error');
    expect(topLevelElement.classList).not.toContain('secondary');
    expect(topLevelElement.classList).not.toContain('alert');
    expect(topLevelElement.classList).toContain('tag');
  });

  // it('check `click`', async(() => {
  //     spyOn(tag, 'click');

  //     const button = el.querySelector('button');
  //     button.click();

  //     fixture.whenStable().then(() => {
  //       expect(tag.click).toHaveBeenCalled();
  //     });
  // }));

});
