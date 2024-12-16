import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'app-datagrid-export-without-datagrid-demo',
    templateUrl: 'datagrid-export-without-datagrid.demo.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DataGridExportWithoutDataGridDemoComponent {

  // Some Sample Data
  private dataset = [
    { id: 1, productId: 2142201, productName: 'Compressor', activity:  '<svg/onload=alert(1)>',
    quantity: 1, price: 210.99, status: 'OK', orderDate:  '', portable: false, action: 1,
    description: 'Compressor comes with various air compressor accessories, to help you with a variety' },
    { id: 2, productId: 2241202, productName: 'Different Compressor', activity:  'Inspect and Repair',
    quantity: 2, price: 210.991, status: '', orderDate: new Date(2016, 2, 15, 0, 30, 36), portable: false,
    action: 1, description: 'The kit has an air blow gun that can be used for cleaning' },
    { id: 3, productId: 2342203, productName: 'Portable Compressor', activity:  '', portable: true,
    quantity: null, price: 120.992, status: null, orderDate: new Date(2014, 6, 3), action: 2 },
    { id: 4, productId: 2445204, productName: 'Another Compressor', activity:  'Assemble Paint',
    portable: true, quantity: 3, price: null, status: 'OK', orderDate: new Date(2015, 3, 3),
    action: 3, description: 'Compressor comes with with air tool kit' },
    { id: 5, productId: 2542205, productName: 'De Wallt Compressor', activity:  'Inspect and Repair',
    portable: false, quantity: 4, price: 210.99, status: 'OK', orderDate: new Date(2015, 5, 5), action: 1 },
    { id: 6, productId: 2642205, productName: 'Air Compressors', activity:  'Inspect and Repair',
    portable: false, quantity: 41, price: 120.99, status: 'OK', orderDate: new Date(2014, 6, 9), action: 2 },
    { id: 7, productId: 2642206, productName: 'Some Compressor', activity:  'inspect and Repair',
    portable: true, quantity: 41, price: 123.99, status: 'OK', orderDate: new Date(2014, 6, 9), action: 2 }
  ];

  exportToCsv() {
    Soho.excel.exportToCsv('MyExport', this.dataset);
  }
  exportToExcel() {
    Soho.excel.exportToExcel('MyExport', 'Worksheet1', this.dataset);
  }
}
