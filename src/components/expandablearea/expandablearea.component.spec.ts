/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { Component, DebugElement, ElementRef } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject,
  ComponentFixture,
  TestComponentBuilder,
} from '@angular/core/testing';

import { ExpandableAreaComponent } from './expandablearea.component';
import { EXPANDABLEAREA_DIRECTIVES } from './';

describe('Component: Expandablearea', () => {
  let builder: TestComponentBuilder;
  let elementRef: ElementRef;

  beforeEach(inject([ElementRef, TestComponentBuilder],
    function (eref: ElementRef, tcb: TestComponentBuilder) {
      elementRef = eref;
      builder = tcb;
  }));

  it('should create an instance', () => {
    let component = new ExpandableAreaComponent(elementRef);
    expect(component).toBeTruthy();
  });

  it('should toggle when the \'toggle\' input is toggled', () => {

  });

  it('should be settable to disabled', () => {

  });

  it('should be defaultable to open or closed based on the \'closed\' input', () => {

  });

  it('should be able to fix a pane', () => {

  });

  it('should call beforeexpand emitter', () => {

  });

  it('should call beforecollapse emitter', () => {

  });

  it('should call expand emitter', () => {

  });

  it('should call afterexpand emitter', () => {

  });

  it('should call aftercollapse emitter', () => {

  });
});

@Component({
  selector: 'test',
  template: `
    <soho-expandable-area
      (beforeexpand)="onBeforeExpand($event)"
      (beforecollapse)="onBeforeCollapse($event)"
      (expand)="onExpand($event)"
      (collapse)="onCollapse($event)"
      (afterexpand)="onAfterExpand($event)"
      (aftercollapse)="onAfterCollapse($event)">
      <soho-expandable-header>
        Header
      </soho-expandable-header>
      <soho-expandable-pane [fixed]="true">
        <p>
        Ubiquitous out-of-the-box, scalable;
        </p>
      </soho-expandable-pane>
      <soho-expandable-pane>
        <p>
        Capitalise on low hanging fruit to identify.
        </p>
      </soho-expandable-pane>
    </soho-expandable-area>
  `,
  directives: [ EXPANDABLEAREA_DIRECTIVES ],
})
class ExpandableTestComponent {
  onBeforeExpand() {
    return;
  }
  onBeforeCollapse() {
    return;
  }
  onExpand() {
    return;
  }
  onCollapse() {
    return;
  }
  onAfterExpand() {
    return;
  }
  onAfterCollapse() {
    return;
  }
}
