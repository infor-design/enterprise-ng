/// <reference path="soho-context-menu.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Output } from '@angular/core';

@Component({
  template: `
     <input soho-context-menu *ngIf="showInput" menu="TestContextMenu" trigger="click"/>
     <input soho-context-menu menu="TestContextMenu" trigger="click"/>
     <ul soho-popupmenu id="TestContextMenu" >
        <li soho-popupmenu-item>Item One</li>
     </ul>`
})
class TestContextMenuDestroyBugComponent {
  public showInput = true;
}

describe('Soho Context Menu Destroy Bug Unit Tests', () => {
  let comp:     TestContextMenuDestroyBugComponent;
  let fixture:  ComponentFixture<TestContextMenuDestroyBugComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ TestContextMenuDestroyBugComponent ]
    });

    fixture = TestBed.createComponent(TestContextMenuDestroyBugComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  fit('Check events', () => {
    el.click();
    comp.showInput = false;
    fixture.detectChanges();
    el.click();
    comp.showInput = true;
    fixture.detectChanges();

    el.click();


  });
});
