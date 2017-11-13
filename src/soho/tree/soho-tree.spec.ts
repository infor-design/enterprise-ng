import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoTreeModule } from './soho-tree.module';
import { SohoTreeComponent } from './soho-tree.component';

describe('Soho Tree Unit Tests', () => {
  let comp: SohoTreeComponent;
  let fixture: ComponentFixture<SohoTreeComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTreeComponent]
    });

    fixture = TestBed.createComponent(SohoTreeComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Empty Content', () => {
    expect(el.nodeName).toEqual('DIV');
    // expect(el.id).toEqual('root1');
    expect(el.hasAttribute('soho-tree')).toBeTruthy();
    expect(el.classList).toContain('tree');
  });

  it('Check default value of dataset is []', () => {
    fixture.detectChanges();

    expect(comp.dataset).toEqual([]);
  });

  it('check "selectable" options', () => {
    fixture.detectChanges();

    // We don't specify an option - so the default component value is undefined.
    expect(comp.options.selectable).toBeUndefined();

    // The control has the default of 'single', which is used if we don't provide one.
    expect(comp.selectable).toEqual('single');

    comp.selectable = 'multiple';

    expect(comp.selectable).toEqual('multiple');
    expect(comp.options.selectable).toEqual('multiple');
  });
});

@Component({
  template: `<ul soho-tree [dataset]="dataset"></ul>`
})
class SohoTreeTestComponent {
  @ViewChild(SohoTreeComponent) tree: SohoTreeComponent;
  _data: any[];

  public get dataset(): any[] {
    if (!this._data) {
      /* tslint:disable */
      this._data = [{
        'id': 'node1',
        'text': 'Data One',
        'open': false,
        'selected': false,
        'href': '/somelink/'
      }, {
        'id': 'node2',
        'text': 'Node Two',
        'open': true,
        'selected': true,
        'focus': true,
        'children': [
          {
            'id': 'node3',
            'text': 'Node 2.1'
          }, {
            'id': 'node4',
            'text': 'Node 2.2',
            'children': [
              {
                'id': 'node5',
                'text': 'Node 2.2.1',
                'icon': 'icon-tree-chart',
                'children': [
                  {
                    'id': 'node6',
                    'text': 'Node 2.2.1.1',
                    'icon': 'icon-tree-chart'
                  }
                ]
              }
            ]
          }
        ]
      }
      ];
    }
    return this._data;
  }
}

describe('Soho Tree Render', () => {
  let tree: SohoTreeComponent;
  let component: SohoTreeTestComponent;
  let fixture: ComponentFixture<SohoTreeTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoTreeTestComponent],
      imports: [FormsModule, SohoTreeModule]
    });

    fixture = TestBed.createComponent(SohoTreeTestComponent);
    component = fixture.componentInstance;

    tree = component.tree;

    de = fixture.debugElement;
    el = de.query(By.css('ul[soho-tree]')).nativeElement;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();

    expect(el.nodeName).toEqual('UL');
  });

  it('setting the dataset updates the grid', () => {
    fixture.detectChanges();

    const testData = [{
        'id': 'node1',
        'text': 'Data One',
        'open': false,
        'selected': false,
        'href': '/somelink/'
      }];

    tree.dataset = testData;

    const actual = component.tree.dataset;
    expect(actual.length).toBe(1);
    expect(actual[0].id).toBe('node1');
    expect(actual[0].text).toBe('Data One');
    expect(actual[0].open).toBeFalsy();
    expect(actual[0].selected).toBeFalsy();
    expect(actual[0].href).toBe('/somelink/');
    expect(actual[0].node).toBeDefined();
  });

  it('selectedNode', () => {
    fixture.detectChanges();

    tree.selectNode('node2');

    fixture.detectChanges();

    const selectedNodes = tree.getSelectedNodes();
    expect(selectedNodes.length).toBe(1);
    expect(selectedNodes[0].id).toBe('node2');
  });

  it('selectedNode - invalid node', () => {
    fixture.detectChanges();

    // An Error (Exception) is expected when we pass an invalid node name.
    expect( () => { tree.selectNode('invalid'); }).toThrow(new Error(`Node invalid does not exist`));

    // Make sure the nodes have not changed, in this case we have an
    // unfortunate dependency with the previous test!
    const selectedNodes = tree.getSelectedNodes();
    expect(selectedNodes.length).toBe(1);
    expect(selectedNodes[0].id).toBe('node2');
  });
});
