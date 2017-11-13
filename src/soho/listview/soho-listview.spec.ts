import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoSearchFieldModule } from '../searchfield/soho-searchfield.module';
import { SohoListViewModule } from './soho-listview.module';
import {
  SohoListViewComponent,
  SohoListViewHeaderComponent,
  SohoListViewItemComponent,
  SohoListViewMicroComponent,
  SohoListViewSearchComponent,
  SohoListViewSubHeaderComponent
} from './soho-listview.component';

@Component({
  template: `<soho-listview [searchable]="false" selectable="single">
                 <li soho-listview-item *ngFor="let item of listItems" [disabled]="item.disabled" [selected]="item.selected">
                  <p soho-listview-header>Task #{{item.task}}</p>
                  <p soho-listview-subheader>{{item.desc}}</p>
                  <p soho-listview-micro>DUE: {{item.date}}</p>
                </li>
              </soho-listview>
            `
})
class SohoListViewTestComponent {
  @ViewChild(SohoListViewComponent) listview: SohoListViewComponent;
  selectedTasks = [0, 1];

  public listItems = [
    { task: '063001', error: true, date: '10/11/2015', desc: 'Special fields test - New item has been created.' },
    { task: '063002', date: '10/11/2015', desc: 'Part #4212132 has low inventory level', disabled: true },
    { task: '063003', date: '10/07/2015', desc: 'Check #112412 parts ordering.', selected: true },
    { task: '063004', date: '10/07/2015', desc: 'Special fields test - New item has been created.' },
    { task: '063005', date: '10/11/2015', desc: 'Call XYZ Inc at 5 PM' },
    { task: '063006', error: true, date: '10/11/2015', desc: 'Part #4212132 has low inventory level' },
    { task: '063007', date: '07/11/2015', desc: 'Special fields test - New item has been created.' },
    { task: '063008', date: '10/11/2015', desc: 'Part #5212132 has low inventory level' },
    { task: '063009', date: '10/07/2015', desc: 'Check #212412 parts ordering.' },
    { task: '063010', date: '10/11/2015', desc: 'Special fields test - New item has been created.' },
    { task: '063011', date: '10/11/2015', desc: 'Call TMZ Inc at 5 PM' },
    { task: '063012', date: '07/08/2015', desc: 'Part #6212132 has low inventory level' }];
}

describe('Soho Listview Unit Tests', () => {
  let comp: SohoListViewComponent;
  let fixture: ComponentFixture<SohoListViewComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        SohoListViewComponent,
        SohoListViewHeaderComponent,
        SohoListViewItemComponent,
        SohoListViewMicroComponent,
        SohoListViewSearchComponent,
       SohoListViewSubHeaderComponent,
      ],
      imports: [ SohoSearchFieldModule ]
    });

    fixture = TestBed.createComponent(SohoListViewComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.query(By.css('.listview')).nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('listview');
  });

  // Add more method tests.
});

describe('Soho ListView Render', () => {
  let listview: SohoListViewComponent;
  let component: SohoListViewTestComponent;
  let fixture: ComponentFixture<SohoListViewTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoListViewTestComponent],
      imports: [FormsModule, SohoListViewModule]
    });

    fixture = TestBed.createComponent(SohoListViewTestComponent);
    component = fixture.componentInstance;
    listview = component.listview;

    TestBed.compileComponents();

    fixture.detectChanges();

    const rootDe = fixture.debugElement;
    de = rootDe.query(By.css('.listview'));
    el = de.nativeElement;

    fixture.detectChanges();
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('DIV');
    expect(el.classList).toContain('listview');
    expect(el.hasAttribute('is-multiselect')).toBeFalsy('is-multiselect');

    const ul = el.children[0];
    expect(ul.childElementCount).toBe(component.listItems.length);

    let i = 0;
    component.listItems.forEach(listItem => {
      const li = ul.children[i++];
      expect(li.nodeName).toBe('LI');

      // Header
      const headerDe = de.query(By.css('.listview-heading'));
      expect(headerDe).not.toBe(null);

      // Subheader
      const subHeadingDe = de.query(By.css('.listview-subheading'));
      expect(subHeadingDe).not.toBe(null);

      // Micro
      const microDe = de.query(By.css('.listview-micro'));
      expect(microDe).not.toBe(null);
    });

    fixture.detectChanges();
  });

});
