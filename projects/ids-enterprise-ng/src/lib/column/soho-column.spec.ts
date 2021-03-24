import { } from 'jasmine';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement, ViewChild, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SohoColumnModule } from './soho-column.module';
import { SohoColumnComponent } from './soho-column.component';

const columnData = [{
  data: [{
    name: 'Automotive',
    shortName: 'Auto',
    abbrName: 'A',
    value: .8,
    tooltip: 'Custom Tooltip - {{value}}'
  }, {
    name: 'Distribution',
    shortName: 'Dist',
    abbrName: 'D',
    value: 10
  }, {
    name: 'Equipment',
    shortName: 'Equip',
    abbrName: 'E',
    value: 14
  }, {
    name: 'Fashion',
    shortName: 'Fash',
    abbrName: 'F',
    value: 10
  }, {
    name: 'Food',
    shortName: 'Food',
    abbrName: 'F',
    value: 14
  }, {
    name: 'Healthcare',
    shortName: 'Health',
    abbrName: 'H',
    value: 8.2
  }, {
    name: 'Other',
    shortName: 'Other',
    abbrName: 'O',
    value: 7.9
  }]
}];

describe('Soho Column Unit Tests', () => {
  let fixture: ComponentFixture<SohoColumnComponent>;
  let comp: SohoColumnComponent;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoColumnComponent]
    });

    fixture = TestBed.createComponent(SohoColumnComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement;
    el = de.nativeElement;
  });

  it('Check Content', () => {
    expect(el.nodeName).toEqual('DIV');
  });

  it('check inputs', () => {
    const type = 'column';
    const ticks = { number: 5, format: ',.1s' };
    const xAxis = { ticks: { number: 5, format: 'd' } };
    const yAxis = { ticks: 'auto' };
    const emptyMessage: SohoEmptyMessageOptions = {
      title: 'this chart has no data',
      icon: 'icon-empty-no-data',
    };

    comp.dataset = columnData;
    comp.type = type;
    comp.isStacked = false;
    comp.showLegend = false;
    comp.animate = false;
    comp.redrawOnResize = false;
    comp.format = '.0f';
    comp.formatterString = 'd';
    comp.ticks = ticks;
    comp.xAxis = xAxis;
    comp.yAxis = yAxis;
    comp.emptyMessage = emptyMessage;
    comp.tooltip = 'My Tooltip';

    // check options
    expect((comp as any).options.dataset).toEqual(columnData);
    expect((comp as any).options.type).toEqual(type);
    expect((comp as any).options.isStacked).toEqual(false);
    expect((comp as any).options.showLegend).toEqual(false);
    expect((comp as any).options.animate).toEqual(false);
    expect((comp as any).options.redrawOnResize).toEqual(false);
    expect((comp as any).options.format).toEqual('.0f');
    expect((comp as any).options.formatterString).toEqual('d');
    expect((comp as any).options.ticks).toEqual(ticks);
    expect((comp as any).options.xAxis).toEqual(xAxis);
    expect((comp as any).options.yAxis).toEqual(yAxis);
    expect((comp as any).options.emptyMessage).toEqual(emptyMessage);
    expect((comp as any).options.tooltip).toEqual('My Tooltip');

    // detect changes to cause bar chart to be built.
    fixture.detectChanges();

    // once bar chart is built setting input should cause bar.settings to update
    const updatedColumnData = [...columnData];
    updatedColumnData[0].data = [...updatedColumnData[0].data, {
      name: 'Other',
      shortName: 'Other',
      abbrName: 'O',
      value: 7.9
    }];
    const updatedTicks = { number: 5, format: ',.1s' };
    const updatedEmptyMessage: SohoEmptyMessageOptions = {
      title: 'nothing to display',
      icon: 'icon-empty-no-data',
    };
    const updatedType = 'column-stacked';
    const updatedXAxis = {};
    const updatedYAxis = {};

    const customTooltip: SohoColumnTooltipFunction = (res: Function, args: any) => {
      const data = args.data || {};
      const content = 'Name: ' + data.name + '<br>Value: ' + data.value;
      res(content);
    };

    comp.dataset = updatedColumnData;
    comp.type = updatedType;
    comp.isStacked = true;
    comp.showLegend = true;
    comp.animate = true;
    comp.redrawOnResize = true;
    comp.format = '.2f';
    comp.formatterString = '%';
    comp.ticks = updatedTicks;
    comp.xAxis = updatedXAxis;
    comp.yAxis = updatedYAxis;
    comp.emptyMessage = updatedEmptyMessage;
    comp.tooltip = customTooltip;

    // check bar settings
    expect((comp as any).column.settings.dataset).toEqual(updatedColumnData);
    expect((comp as any).column.settings.type).toEqual(updatedType);
    expect((comp as any).column.settings.isStacked).toEqual(true);
    expect((comp as any).column.settings.showLegend).toEqual(true);
    expect((comp as any).column.settings.animate).toEqual(true);
    expect((comp as any).column.settings.redrawOnResize).toEqual(true);
    expect((comp as any).column.settings.format).toEqual('.2f');
    expect((comp as any).column.settings.formatterString).toEqual('%');
    expect((comp as any).column.settings.ticks).toEqual(updatedTicks);
    expect((comp as any).column.settings.xAxis).toEqual(updatedXAxis);
    expect((comp as any).column.settings.yAxis).toEqual(updatedYAxis);
    expect((comp as any).column.settings.emptyMessage).toEqual(updatedEmptyMessage);
    expect((comp as any).column.settings.tooltip).toEqual(customTooltip);

    // update required should be true after updating inputs after bar is built.
    expect((comp as any).updateRequired).toEqual(true);

    const updatedSpy = spyOn<any>((comp as any).column, 'updated').and.callThrough();
    fixture.detectChanges();
    expect((comp as any).updateRequired).toEqual(false);
    expect(updatedSpy).toHaveBeenCalledTimes(1);
  });

  it('check public functions', (done) => {
    comp.dataset = columnData;
    comp.type = 'column';
    fixture.detectChanges();

    comp.toggleSelected({ index: 1 });

    setTimeout(() => {
      const firstElem = (comp.getSelected() as any)[0];
      expect(firstElem.data.name).toEqual(columnData[0].data[1].name);
      comp.setSelected({ index: 2 });

      setTimeout(() => {
        expect((comp as any).getSelected()[0].data.name).toEqual(columnData[0].data[2].name);
        done();
      }, 201);
    }, 201);
  });
});

@Component({
  template: `
  <div class="row top-padding">
    <div class="two-thirds column">
      <div class="widget">
        <div class="widget-header">
          <h2 class="widget-title">Column Chart Title</h2>
        </div>
        <div class="widget-content">
          <div soho-column [dataset]="data" [type]="chartType">
        </div>
      </div>
    </div>
  </div>`
})
class SohoColumnTestComponent {
  @ViewChild(SohoColumnComponent) column?: SohoColumnComponent;

  public chartType = 'column';

  public data = columnData;

  public _yAxis?: object;

  @Input() set yAxis(yAxis: object) {
    this._yAxis = yAxis;
    if (this.column) {
      this.column.yAxis = this._yAxis;
    }
  }

  public _dataset?: Array<any>;
  @Input() set dataset(dataset: Array<any>) {
    this._dataset = dataset;
    if (this.column) {
      this.column.dataset = this._dataset;
    }
  }
}

describe('Soho Column Chart Render', () => {
  let component: SohoColumnTestComponent;
  let fixture: ComponentFixture<SohoColumnTestComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SohoColumnTestComponent],
      imports: [FormsModule, SohoColumnModule]
    });

    fixture = TestBed.createComponent(SohoColumnTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    de = fixture.debugElement;
    el = de.query(By.css('[soho-column]')).nativeElement;
  });

  it('Check HTML content', () => {
    fixture.detectChanges();
    expect(el.hasAttribute('soho-column')).toBeTruthy('soho-column');
  });

  it('Check it can format yAxis content', (done) => {
    component.dataset = [{
      data: [{
        name: 'Automotive',
        shortName: 'Auto',
        abbrName: 'A',
        value: 0.7,
        tooltip: 'Custom Tooltip - {{value}}'
      }, {
        name: 'Distribution',
        shortName: 'Dist',
        abbrName: 'D',
        value: 0.10
      }, {
        name: 'Equipment',
        shortName: 'Equip',
        abbrName: 'E',
        value: 1.4
      }, {
        name: 'Fashion',
        shortName: 'Fash',
        abbrName: 'F',
        value: 1.0
      }, {
        name: 'Food',
        shortName: 'Food',
        abbrName: 'F',
        value: 0.14
      }, {
        name: 'Healthcare',
        shortName: 'Health',
        abbrName: 'H',
        value: 4.8
      }, {
        name: 'Other',
        shortName: 'Other',
        abbrName: 'O',
        value: 2.7
      }]
    }];

    component.yAxis = {
      ticks: {
        number: 5, // Tip: round max data value
        format: 'd'
      }
    };
    fixture.detectChanges();

    // Wait for animation
    setTimeout(function() {
      expect(document.querySelectorAll('.y.axis .tick').length).toEqual(6);
      expect(document.querySelectorAll('.y.axis .tick text')[0].innerHTML).toEqual('0');
      expect(document.querySelectorAll('.y.axis .tick text')[1].innerHTML).toEqual('1');
      expect(document.querySelectorAll('.y.axis .tick text')[2].innerHTML).toEqual('2');
      expect(document.querySelectorAll('.y.axis .tick text')[3].innerHTML).toEqual('3');
      expect(document.querySelectorAll('.y.axis .tick text')[4].innerHTML).toEqual('4');
      expect(document.querySelectorAll('.y.axis .tick text')[5].innerHTML).toEqual('5');
      done();
    }, 500);
  });

});
