/**
 * Created by swolyniec on 5/2/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ChartDemoService {

  private basicData: SohoDataSet = [{
      data: [
        { name: 'Current Metrics', value: 4, tooltip: 'This is a tooltip', ref: 1,
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 5, tooltip: 'This is a tooltip', ref: 1, url: '#'},
        { name: 'Future Metrics', value: 2, tooltip: 'This is a tooltip', ref: 1, url: '#'}
      ],
      name: 'Schedule Adherence By Quantity',
      color: '#8ED1C6',
      centerLabel: 'This is center label',
      selected: true,
      ref: 1
    }, {
      data: [
        { name: 'Current Metrics', value: 3, tooltip: 'This is a tooltip', ref: 2,
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 1, tooltip: 'This is a tooltip', ref: 2, url: '#'},
        { name: 'Future Metrics', value: 5, tooltip: 'This is a tooltip', ref: 2, url: '#'}
      ],
      name: 'Schedule Adherence By Date',
      ref: 2
    },
    {
      data: [
        { name: 'Current Metrics', value: 6, tooltip: 'This is a tooltip', ref: 3,
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 9, tooltip: 'This is a tooltip', ref: 3, url: '#'},
        { name: 'Future Metrics', value: 3, tooltip: 'This is a tooltip', ref: 3, url: '#'}
      ],
      name: 'Receiving Accuracy',
      color: '#9279A6',
      ref: 3
    }, {
    data:
      [
        { name: 'Current Metrics', value: 7, tooltip: 'This is a tooltip', ref: 4,
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 2, tooltip: 'This is a tooltip', ref: 4, url: '#'},
        { name: 'Future Metrics', value: 9, tooltip: 'This is a tooltip', ref: 4, url: '#'}
      ],
      name: 'Overall Rating',
      ref: 4
    }
  ];

  private stackedData: SohoDataSet = [{
    data: [
      { name: 'Current Metrics', value: 4, tooltip: 'This is a tooltip', ref: 1,
        url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
      { name: 'Previous Metrics', value: 5, tooltip: 'This is a tooltip', ref: 2, url: '#'},
      { name: 'Future Metrics', value: 2, tooltip: 'This is a tooltip', ref: 3, url: '#'}
    ],
    name: 'Schedule Adherence By Quantity',
    color: '#8ED1C6',
    centerLabel: 'This is center label',
    selected: true,
    ref: 1
  }, {
    data: [
      { name: 'Current Metrics', value: 3, tooltip: 'This is a tooltip', ref: 1,
        url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
      { name: 'Previous Metrics', value: 1, tooltip: 'This is a tooltip', ref: 2, url: '#'},
      { name: 'Future Metrics', value: 5, tooltip: 'This is a tooltip', ref: 3, url: '#'}
    ],
    name: 'Schedule Adherence By Date',
    ref: 2
  },
    {
      data: [
        { name: 'Current Metrics', value: 6, tooltip: 'This is a tooltip', ref: 1,
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 9, tooltip: 'This is a tooltip', ref: 2, url: '#'},
        { name: 'Future Metrics', value: 3, tooltip: 'This is a tooltip', ref: 3, url: '#'}
      ],
      name: 'Receiving Accuracy',
      color: '#9279A6',
      ref: 3
    }, {
      data:
        [
          { name: 'Current Metrics', value: 7, tooltip: 'This is a tooltip', ref: 1,
            url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
          { name: 'Previous Metrics', value: 2, tooltip: 'This is a tooltip', ref: 2, url: '#'},
          { name: 'Future Metrics', value: 9, tooltip: 'This is a tooltip', ref: 3, url: '#'}
        ],
      name: 'Overall Rating',
      ref: 4
    }
  ];

  private bubbleData: SohoDataSet = [{
    data: [{name: 'January', tooltip: 'This is a January', value: {x: 5, y: 3, z: 3}
    }, {name: 'February', tooltip: 'This is a February', value: {x: 37, y: 5, z: 9}
    }, {name: 'March', tooltip: 'This is a March', value: {x: 10, y: 5.3, z: 4}
    }, {name: 'April', tooltip: 'This is a April', value: {x: 80, y: 6, z: 10}
    }, {name: 'May', tooltip: 'This is a May', value: {x: 21, y: 4.8, z: 4}
    }, {name: 'June', tooltip: 'This is a June', value: {x: 72, y: 5.2, z: 4}
    }, {name: 'July', tooltip: 'This is a July', value: {x: 26, y: 8, z: 6}
    }, {name: 'August', tooltip: 'This is a August', value: {x: 71, y: 3.9, z: 8}
    }, {name: 'September', tooltip: 'This is a September', value: {x: 85, y: 8, z: 2}
    }, {name: 'October', tooltip: 'This is a October', value: {x: 52, y: 3, z: 2}
    }, {name: 'November', tooltip: 'This is a November', value: {x: 44, y: 5.9, z: 3}
    }, {name: 'December', tooltip: 'This is a December', value: {x: 110, y: 7, z: 4}
    }],
    name: 'Series 01',
    labels: {name: 'Month', value: {x: 'Revenue', y: 'Sold', z: 'Market Share'}
    },
    // Use d3 Format - only value will be formated
    valueFormatterString: {z: '0.0%'}
  },
    {
      data: [{ name: 'January', value: {x: 9, y: 3.2, z: 3}
      }, {name: 'February', value: {x: 12, y: 6.3, z: 10}
      }, {name: 'March', value: {x: 65, y: 4, z: 10}, selected: true
      }, {name: 'April', value: {x: 27, y: 7, z: 2}
      }, {name: 'May', value: {x: 29, y: 8.5, z: 4}
      }, {name: 'June', value: {x: 81, y: 3.9, z: 8}
      }, {name: 'July', value: {x: 33, y: 4.1, z: 7}
      }, {name: 'August', value: {x: 75, y: 4, z: 3}
      }, {name: 'September', value: {x: 39, y: 7, z: 4}
      }, {name: 'October', value: {x: 80, y: 2, z: 3}
      }, {name: 'November', value: {x: 48, y: 6.2, z: 2}
      }, {name: 'December', value: {x: 99, y: 4, z: 2}
      }],
      name: 'Series 02'
    }];

  private pieData: SohoDataSet = [{
    data: [{
      name: 'Wages',
      shortName: 'Wages',
      value: 10.6,
      ref: 1
    }, {
      name: 'Pre-tax Deductions',
      shortName: 'Pre-tax',
      value: 10.2,
      ref: 2
    }, {
      name: 'Company Taxes',
      shortName: 'C Tax',
      value: 14.35,
      ref: 3
    }, {
      name: 'Taxes',
      shortName: 'Taxes',
      value: 15.6,
      ref: 4
    }, {
      name: 'After-tax Deductions',
      shortName: 'Af-tax',
      value: 21.6,
      ref: 5
    }, {
      name: 'Company Deductions',
      shortName: 'C Dedc',
      value: 41.6,
      ref: 6
    }]
  }];

  private posNegData: SohoDataSet = [{
    data: [{
      name: 'Jan',
      value: 4000,
      target: 13000
    }, {
      name: 'Feb',
      value: 9000,
      target: 11000
    }, {
      name: 'Mar',
      value: 2000,
      target: 7000
    }, {
      name: 'Apr',
      value: 4000,
      target: 8000
    }, {
      name: 'May',
      value: 2000,
      target: 14000
    }, {
      name: 'Jun',
      value: 4000,
      target: 9000
    }, {
      name: 'Jul',
      value: -8000,
      target: 12000
    }, {
      name: 'AUG',
      value: -6000,
      target: 5000
    }, {
      name: 'SEP',
      value: -1000,
      target: 7000
    }, {
      name: 'OCT',
      value: -12000,
      target: 13000
    }, {
      name: 'NOV',
      value: -7000,
      target: 6000
    }, {
      name: 'DEC',
      value: -3000,
      target: 7000
    }],
    legends: {
      target: 'Revenue',
      positive: 'Profit',
      negative: 'Loss'
    },
    colors: {
      target: 'neutral',
      positive: 'good',
      negative: 'error'
    }
  }];

  public getBasicData(): SohoDataSet {
    return this.basicData;
  }

  public getStackedData(): SohoDataSet {
    return this.stackedData;
  }

  public getBubbleData(): SohoDataSet {
    return this.bubbleData;
  }

  public getScatterData(): SohoDataSet {
    const scatterData = JSON.parse(JSON.stringify(this.bubbleData));

    scatterData.filter((dataItem: SohoDataSetItem) => {
      dataItem.data.filter((data: SohoChartData) => {
        const bc: BubbleCordinates = data.value as BubbleCordinates;
        bc.z = 1;
      });
    });

    return scatterData;
  }

  public getPieData(): SohoDataSet {
    return this.pieData;
  }

  public getPosNegData(): SohoDataSet {
    return this.posNegData;
  }
}
