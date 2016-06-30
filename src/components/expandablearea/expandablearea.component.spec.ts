/* tslint:disable:no-unused-variable */

import { By }           from '@angular/platform-browser';
import { DebugElement, ElementRef } from '@angular/core';

import {
  beforeEach, beforeEachProviders,
  describe, xdescribe,
  expect, it, xit,
  async, inject
} from '@angular/core/testing';

import { ExpandableAreaComponent } from './expandablearea.component';

describe('Component: Expandablearea', () => {
  let elementRef: ElementRef;

  beforeEach(inject([ElementRef], function (eref: ElementRef) {
    elementRef = eref;
  }));

  it('should create an instance', () => {
    let component = new ExpandableAreaComponent(elementRef);
    expect(component).toBeTruthy();
  });
});
