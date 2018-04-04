import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'demo-confirmation-page',
  templateUrl: './wizard-confirmation-page.demo.html',
  styles: [
    `:host {
      display:        flex;
      flex:           1;
      flex-direction: column;
  }`]
})
export class WizardDemoConfirmationPageComponent {
  public columns: SohoDataGridColumn[] = [
    { id: 'selectionCheckbox', sortable: false, resizable: false, width: 50,
      formatter: Soho.Formatters.SelectionCheckbox, align: 'center' },
    { id: 'filename', name: 'File Name', field: 'filename', formatter: Soho.Formatters.Text, width: '200px' },
    { id: 'filetype', name: 'File Type', field: 'filetype', formatter: Soho.Formatters.Text },
    { id: 'filesize', name: 'File Size', field: 'filesize', formatter: Soho.Formatters.Text }
  ];

  public data: any[] = [
    { filename: 'FTAL1.srdl', filetype: 'Report', filesize: '189kb' },
    { filename: 'WeeklyReport.pdf', filetype: 'PDF', filesize: '345kb' },
    { filename: 'FTJL1.srdl', filetype: 'Report', filesize: '145kb' },
    { filename: 'FTJL2.srdl', filetype: 'Report', filesize: '167kb' }
  ];
}
