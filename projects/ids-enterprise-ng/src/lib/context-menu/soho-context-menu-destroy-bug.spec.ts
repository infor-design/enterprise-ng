/// <reference path="soho-context-menu.d.ts" />

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';

import { SohoInputModule } from '../input';
import { SohoPopupMenuModule } from '../popupmenu';
import { SohoContextMenuModule } from './soho-context-menu.module';

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
      declarations: [ TestContextMenuDestroyBugComponent ],
      imports: [SohoInputModule, SohoPopupMenuModule, SohoContextMenuModule ]
    });

    fixture = TestBed.createComponent(TestContextMenuDestroyBugComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check opening a shared popupmenu after destroying one of them.', () => {
    // Display the popupmenu ...
    el.querySelector('input').click();
    el.querySelector('input').click();

    // Hide the first control
    comp.showInput = false;
    fixture.detectChanges();

    // Show the control
    comp.showInput = true;
    fixture.detectChanges();

    // Display the popupmenu ...
    el.querySelector('input').click();
    el.querySelector('input').click();
  });
});
