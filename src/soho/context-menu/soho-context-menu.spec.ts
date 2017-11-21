import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, EventEmitter, Output } from '@angular/core';

@Component({
  template: `
     <input soho-context-menu menu="TestContextMenu" trigger="click"
           (selected)="onSelected($event)"
           (beforeopen)="onBeforeOpen($event)"
           (close)="onClose($event)"
           (open)="onOpen($event)"/>
     <ul soho-popupmenu id="TestContextMenu" >
        <li soho-popupmenu-item>Item One</li>
     </ul>`
})
class TestContextMenuDirectiveComponent {
  @Output() selected = new EventEmitter<SohoContextMenuEvent>();
  @Output() beforeopen = new EventEmitter<SohoContextMenuEvent>();
  @Output() open = new EventEmitter<SohoContextMenuEvent>();
  @Output() close = new EventEmitter<SohoContextMenuEvent>();

  onSelected(value) {
    this.selected.emit(value);
  }

  onBeforeOpen(value) {
    this.beforeopen.emit(value);
  }

  onClose(value) {
    this.open.emit(value);
  }

  onOpen(value) {
    this.close.emit(value);
  }
}

describe('Soho Context Menu Unit Tests', () => {
  let comp:     TestContextMenuDirectiveComponent;
  let fixture:  ComponentFixture<TestContextMenuDirectiveComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ TestContextMenuDirectiveComponent ]
    });

    fixture = TestBed.createComponent(TestContextMenuDirectiveComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check events', () => {
    comp.selected.subscribe(x => {
      expect(x).toBe(1);
    });
    comp.beforeopen.subscribe(x => {
      expect(x).toBe(1);
    });
    comp.open.subscribe(x => {
      expect(x).toBe(1);
    });
    comp.close.subscribe(x => {
      expect(x).toBe(1);
    });

    el.click();
    el.parentElement.click();

  });
});
