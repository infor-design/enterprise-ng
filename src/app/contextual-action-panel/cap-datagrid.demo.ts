import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import {
    SohoContextualActionPanelRef,
    SohoDataGridComponent,
} from 'ids-enterprise-ng';

@Component({
    template: `
          <button
              soho-menu-button
              class="btn"
              menu="cknascja-my-menu-MI"></button>
          <ul soho-popupmenu id="cknascja-my-menu-MI">
              <li>
                  <a class="field-flex"
                      ><svg
                          role="presentation"
                          aria-hidden="true"
                          focusable="false"
                          class="icon">
                          <use href="#icon-construction-worker"></use>
                      </svg>
                      Subcontract</a
                  >
              </li>
              <li>
                  <a class="field-flex" >
                      <svg
                          role="presentation"
                          aria-hidden="true"
                          focusable="false"
                          class="icon">
                          <use href="#icon-transfer"></use>
                      </svg>
                      Reschedule Operation
                  </a>
              </li>
              <li>
                  <a class="field-flex" >
                      <svg
                          role="presentation"
                          aria-hidden="true"
                          focusable="false"
                          class="icon">
                          <use href="#icon-transfer"></use>
                      </svg>
                      Re-allocate machine
                  </a>
              </li>
          </ul>
      `,
})
export class SubModalComponent {
    @Input() company: string = '';
    @Input() site: string = '';
    poId: string = '';

    constructor(@Inject('args') public args: any) { }
}

@Component({
    template: `
    <div >
	<div  class="row ">
		<div class="twelve columns" role="main">
          <div
            soho-datagrid
		    *ngIf= 'gridOptionsTest'
            [gridOptions]= 'gridOptionsTest'></div>
		</div>
    </div>
	`,
})
export class CAPDatagridDemoComponent implements OnInit {
    dialog?: SohoContextualActionPanelRef<CAPDatagridDemoComponent>;
    @ViewChild(SohoDataGridComponent, { static: true })
    sohoGridComponent!: SohoDataGridComponent;
    gridOptionsTest: SohoDataGridOptions = {};
    columns: SohoDataGridColumn[] = [];
    FullList: any[] = [];
    ngOnInit(): void {
        this.columns = [
            {
                id: 'Order',
                name: 'P.O',
                field: 'productionOrder',
                formatter: Soho.Formatters.Readonly,
                cssClass: 'lm-cursor-default',
                align: 'left',
            },
            {
                id: 'Status',
                name: 'Status',
                field: 'orderStatus',
                cssClass: 'lm-cursor-default',
                align: 'left',
            },
            {
                id: 'ItemCode',
                name: 'Code',
                field: 'itemCode',
                formatter: Soho.Formatters.Readonly,
                cssClass: 'lm-cursor-default',
                sortable: false,
                align: 'left',
            },
            {
                id: 'plannedDeliveryDate',
                name: 'Del Date',
                field: 'plannedDeliveryDate',
                formatter: Soho.Formatters.Date,
                dateFormat: 'MM/dd/yyyy',
                cssClass: 'lm-cursor-default',
                sortable: false,
                align: 'left',
                disableTooltip: true,
            },
            {
                id: 'action',
                name: 'Resolve',
                field: 'action',
                sortable: false,
                component: SubModalComponent,
                componentInputs: {
                    company: '467',
                    site: 'NJ',
                },
                align: 'center',
            },
        ];

        setTimeout(() => {
            this.FullList = [
                {
                    productionOrder: 'PO12345',
                    orderStatus: 'Active',
                    itemCode: 'BQR12345',
                    plannedDeliveryDate: new Date(),
                },
                {
                    productionOrder: 'PO12345',
                    orderStatus: 'Active',
                    itemCode: 'BQR12345',
                    plannedDeliveryDate: new Date(),
                },
                {
                    productionOrder: 'PO12345',
                    orderStatus: 'Active',
                    itemCode: 'BQR12345',
                    plannedDeliveryDate: new Date(),
                },
                {
                    productionOrder: 'PO12345',
                    orderStatus: 'Active',
                    itemCode: 'BQR12345',
                    plannedDeliveryDate: new Date(),
                },
            ];
            this.updateGridOptions();
        }, 1000);
    }

    updateGridOptions() {
        const gridboolean = this.FullList.length >= 20 ? true : false;
        this.gridOptionsTest = {
            columns: this.columns,
            dataset: this.FullList,
            editable: true,
            filterable: false,
            redrawOnResize: false,
            rowHeight: 'small',
            selectable: 'mixed',
            showDirty: true,
            cellNavigation: true,
            actionableMode: true,
            enableTooltips: true,
            toolbar: {
                keywordFilter: gridboolean,
                actions: true,
                title: this.FullList.length + ' ' + 'Machine Issues',
                exportToExcel: false,
                collapsibleFilter: gridboolean,
            },
        };
    }
}
