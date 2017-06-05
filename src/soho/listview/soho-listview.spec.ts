import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoListViewModule } from './soho-listview.module';
import { SohoListViewComponent } from './soho-listview.component';

describe('Soho Listview Unit Tests', () => {
  let comp:     SohoListViewComponent;
  let fixture:  ComponentFixture<SohoListViewComponent>;
  let de:       DebugElement;
  let el:       HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoListViewComponent ]
    });

    fixture = TestBed.createComponent(SohoListViewComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('listview');
  });

  // Add more method tests.
});

describe('Soho ListView Render', () => {
  let listview:  SohoListViewComponent;
  let component: SohoListViewTestComponent;
  let fixture:   ComponentFixture<SohoListViewTestComponent>;
  let de:        DebugElement;
  let el:        HTMLElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ SohoListViewTestComponent ],
      imports: [ FormsModule, SohoListViewModule ]
    });

    fixture = TestBed.createComponent(SohoListViewTestComponent);
    component = fixture.componentInstance;
    listview = component.dropdown;

    de = fixture.debugElement;
    el = de.query(By.css('select[soho-dropdown]')).nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('div');
    expect(el.classList).toContain('listview');
    expect(el.hasAttribute('is-multiselect')).toBeFalsy('is-multiselect');

    const ul = el.children[0];
    expect(ul.childElementCount).toBe(11);

    let i = 0;
    component.listItems.forEach(li => {
      expect(ul.children[i].nodeName).toBe('li');
      expect(ul.children[i].getAttribute('value')).toBe(li.desc);
      expect(ul.children[i++].innerHTML).toBe(li.task);
    });

    fixture.detectChanges();

    expect(el.hasAttribute('noSearch')).toBeTruthy('noSearch');
  });

});

@Component({
  template: `<soho-listview>
              <li soho-listview-item *ngFor="let data of listItems" [disabled]="data.disabled ? true : false">
                <p soho-listview-header>Task #{{data.task}}</p>
                <p soho-listview-subheader>{{data.desc}}</p>
                <p soho-listview-micro>DUE: {{data.date}}</p>
              </li>
            </soho-listview>`
})
class SohoListViewTestComponent {
  @ViewChild(SohoListViewComponent) dropdown: SohoListViewComponent;
  selectedTasks = [0, 1];

    public listItems = [
     {task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.'},
    {task: '063002', date: '10/11/2015' , desc: 'Part #4212132 has low inventory level', disabled: true},
    {task: '063003', date: '10/07/2015' , desc: 'Check #112412 parts ordering.'},
    {task: '063004', date: '10/07/2015' , desc: 'Special fields test - New item has been created.'},
    {task: '063005', date: '10/11/2015' , desc: 'Call XYZ Inc at 5 PM'},
    {task: '063006', error: true, date: '10/11/2015' , desc: 'Part #4212132 has low inventory level'},
    {task: '063007', date: '07/11/2015' , desc: 'Special fields test - New item has been created.'},
    {task: '063008', date: '10/11/2015' , desc: 'Part #5212132 has low inventory level'},
    {task: '063009', date: '10/07/2015' , desc: 'Check #212412 parts ordering.'},
    {task: '063010', date: '10/11/2015' , desc: 'Special fields test - New item has been created.'},
    {task: '063011', date: '10/11/2015' , desc: 'Call TMZ Inc at 5 PM'},
    {task: '063012', date: '07/08/2015' , desc: 'Part #6212132 has low inventory level'}];
}
