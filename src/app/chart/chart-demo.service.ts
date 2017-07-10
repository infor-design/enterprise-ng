/**
 * Created by swolyniec on 5/2/2017.
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ChartDemoService {

  private basicData: SohoDataSet = [{
      data: [
        { name: 'Current Metrics', value: 4, tooltip: 'This is a tooltip',
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 5, tooltip: 'This is a tooltip', url: '#'},
        { name: 'Future Metrics', value: 2, tooltip: 'This is a tooltip', url: '#'}
      ],
      name: 'Schedule Adherence By Quantity',
      color: '#8ED1C6',
      centerLabel: 'This is center label',
      selected: true
    }, {
      data: [
        { name: 'Current Metrics', value: 3, tooltip: 'This is a tooltip',
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 1, tooltip: 'This is a tooltip', url: '#'},
        { name: 'Future Metrics', value: 5, tooltip: 'This is a tooltip', url: '#'}
      ],
      name: 'Schedule Adherence By Date'
    },
    {
      data: [
        { name: 'Current Metrics', value: 6, tooltip: 'This is a tooltip',
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 9, tooltip: 'This is a tooltip', url: '#'},
        { name: 'Future Metrics', value: 3, tooltip: 'This is a tooltip', url: '#'}
      ],
      name: 'Receiving Accuracy',
      color: '#9279A6'
    }, {
    data:
      [
        { name: 'Current Metrics', value: 3, tooltip: 'This is a tooltip',
          url: '/metrics/viewSingleSupplierReportCard?histPk=10026&supPk=11001&buySupPk=10002&viewChart=false&selectedDate=10026'},
        { name: 'Previous Metrics', value: 2, tooltip: 'This is a tooltip', url: '#'},
        { name: 'Future Metrics', value: 9, tooltip: 'This is a tooltip', url: '#'}
      ],
      name: 'Overall Rating'
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

  public getBasicData(): SohoDataSet {
    return this.basicData;
  }

  public getBubbleData(): SohoDataSet {
    return this.bubbleData;
  }
}
