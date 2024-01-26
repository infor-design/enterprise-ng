import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { SohoDataGridComponent } from 'ids-enterprise-ng';

/**
 * This example:
 * - Shows how to make a tab component with the tabs on the left side.
 */
@Component({
  selector: 'div[vertical-tabs-demo]', // eslint-disable-line
  templateUrl: 'tabs-vertical.demo.html'
})
export class TabsVerticalDemoComponent implements OnInit {
  @ViewChild(SohoDataGridComponent)
  sohoDataGridComponent?: SohoDataGridComponent;

  gridOptions?: SohoDataGridOptions = undefined;

  validate: boolean = false;
  /**
   * Have to make this 100% height or tab component won't display all the way to
   * the bottom of the screen.
   *
   * @returns the height of the style.height style.
   */
  @HostBinding('style.height') get tabsHeightStyle() {
    return '100%';
  }

  constructor() {
    console.log('ub');
  }

  ngOnInit(): void {
    this.initGridOptions();
  }

  onTabActivated(event: SohoTabsEvent) {
    console.log(event.tab + ' TabsBasicDemoComponent.onTabActivated');
  }

  onCellChange(event: any) {
    if (event.column.id === 'EffectiveFrom') {
      if (event.value && !(event.value instanceof Date)) {
        event.rowData.effectiveFrom = new Date(event.value);
      }
    }
    if (event.column.id === 'Expiry') {
      if (event.value && !(event.value instanceof Date)) {
        event.rowData.expiry = new Date(event.value);
      }
    }
    this.sohoDataGridComponent?.validateAll();
  }

  initGridOptions() {
    const fiscalIdOptions = [
      { id: 'Yes', value: 'yes', label: 'Yes' },
      { id: 'No', value: 'no', label: 'No' },
    ];
    const data = [
      {
        country: 'NLD - Netherlands',
        registrationType: '',
        jurisdiction: '',
        effectiveFrom: '11/15/2023',
        expiry: '11/15/2023',
        fiscalId: 'Yes',
        taxRegistrationOrFiscalId: '1234567',
        isExtended: false,
      },
      {
        country: 'NLD - Netherlands',
        registrationType: '',
        jurisdiction: '',
        effectiveFrom: '11/15/2023',
        expiry: '11/15/2023',
        fiscalId: 'No',
        taxRegistrationOrFiscalId: '12345678',
        isExtended: false,
      },
    ];
    const columns = [
      {
        id: 'Country',
        name: 'Country',
        field: 'country',
        sortable: true,
        formatter: Soho.Formatters.Lookup,
        editor: Soho.Editors.Lookup,
      },
      {
        id: 'EffectiveFrom',
        name: 'Effective From',
        field: 'effectiveFrom',
        sortable: true,
        formatter: Soho.Formatters.Date,
        editor: Soho.Editors.Date,
        validate: 'date effectiveDateValidation',
      },
      {
        id: 'Expiry',
        name: 'Expiry Date',
        field: 'expiry',
        sortable: true,
        formatter: Soho.Formatters.Date,
        editor: Soho.Editors.Date,
        validate: 'date expiryDateValidation',
      },
      {
        id: 'FiscalId',
        name: 'Fiscal Id',
        field: 'fiscalId',
        sortable: true,
        formatter: Soho.Formatters.Dropdown,
        editor: Soho.Editors.Dropdown,
        options: fiscalIdOptions,
      },
      {
        id: 'TaxRegistrationOrFiscalId',
        name: 'Registration Number Or FiscalId',
        field: 'taxRegistrationOrFiscalId',
        sortable: true,
        formatter: Soho.Formatters.Input,
        editor: Soho.Editors.Input,
      },
      {
        id: 'IsExtended',
        name: '',
        field: 'isExtended',
        sortable: false,
        hidden: true,
      },
    ];

    const customExpiryDateRule: any = {
      check: (value: any, field: any, grid: any) => {
        if (value && grid.item.effectiveFrom) {
          const expiryDate = new Date(value);
          const effectiveFrom = new Date(grid.item.effectiveFrom);
          if (
            Soho.Locale.isValidDate(expiryDate) &&
            Soho.Locale.isValidDate(effectiveFrom) &&
            expiryDate < effectiveFrom
          ) {
            return false;
          } else {
          }
        }
        return true;
      },
      id: 'custom',
      type: 'error',
      message: 'Expiry date must be grather than effective date',
    };
    (Soho.Validation.rules as any).expiryDateValidation = customExpiryDateRule;

    const customEffectiveFromRule: any = {
      check: (value: any, field: any, grid: any) => {
        if (value && grid.item.expiry) {
          const effectiveFrom = new Date(value);
          const expiryDate = new Date(grid.item.expiry);
          if (
            Soho.Locale.isValidDate(expiryDate) &&
            Soho.Locale.isValidDate(effectiveFrom) &&
            effectiveFrom > expiryDate
          ) {
            return false;
          } else {
          }
        }
        return true;
      },
      id: 'custom',
      type: 'error',
      message: 'Effective date must be less than expiry date',
    };
    (Soho.Validation.rules as any).effectiveDateValidation =
      customEffectiveFromRule;

    this.gridOptions = {
      columns: columns,
      dataset: data,
      clickToSelect: false,
      selectable: 'single',
      showNewRowIndicator: false,
      enableTooltips: true,
      showDirty: true,
      editable: true,
      frozenColumns: {
        right: ['delete'],
      },
      emptyMessage: {
        title: '',
        height: 'small',
      },
    }
  }
}
