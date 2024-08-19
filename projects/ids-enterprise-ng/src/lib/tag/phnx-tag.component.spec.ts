import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DebugElement, Component, ViewChild } from '@angular/core';

// eslint-disable-next-line import/no-extraneous-dependencies
import { By } from '@angular/platform-browser';

import { PhnxTagComponent } from './phnx-tag.component';
import { PhnxTagModule } from './phnx-tag.module';

describe('TagComponent', () => {
  let component: PhnxTagComponent;
  let fixture: ComponentFixture<PhnxTagComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PhnxTagComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhnxTagComponent);
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
  template: `<span phnx-tag="secondary">tag</span>`
})
class PhnxTagTestComponent {
  @ViewChild(PhnxTagComponent) tag?: PhnxTagComponent;
}

describe('Phnx Tag Render', () => {
  let tag: PhnxTagComponent;
  let component: PhnxTagTestComponent;
  let fixture: ComponentFixture<PhnxTagTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhnxTagTestComponent],
      imports: [PhnxTagModule]
    });

    fixture = TestBed.createComponent(PhnxTagTestComponent);
    component = fixture.componentInstance;

    de = fixture.debugElement;
    el = de.query(By.css('[phnx-tag]')).nativeElement;

    fixture.detectChanges();
    tag = (component.tag as any);
  });

  afterEach(() => {
    de.nativeElement.remove();
  });

  it('Check HTML content', () => {
    expect(el.hasAttribute('phnx-tag')).toBeTruthy('phnx-tag');
  });

  it('Check classes', () => {
    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).toContain('secondary');
    expect(topLevelElement.classList).toContain('tag');
  });

  it('Check error type', () => {
    fixture.detectChanges();

    tag.phnxTag = 'error';

    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).toContain('error');
    expect(topLevelElement.classList).toContain('tag');
  });

  it('Check default type', () => {
    fixture.detectChanges();

    tag.phnxTag = undefined;

    fixture.detectChanges();

    const topLevelElement = (tag as any).tag.element;
    expect(topLevelElement.classList).not.toContain('error');
    expect(topLevelElement.classList).not.toContain('secondary');
    expect(topLevelElement.classList).not.toContain('alert');
    expect(topLevelElement.classList).toContain('tag');
  });

  xit('check `click`', (() => {
    spyOn(tag, 'click');

    const button = el.querySelector('button')!;
    button.click();

    fixture.whenStable().then(() => {
      expect(tag.click).toHaveBeenCalled();
    });
  }));
});
