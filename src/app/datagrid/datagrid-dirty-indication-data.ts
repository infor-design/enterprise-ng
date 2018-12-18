export const DIRTY_INDICATION_COLUMNS: any[] = [
  {
    id: 'selectionCheckbox',
    sortable: false,
    resizable: false,
    formatter: Soho.Formatters.SelectionCheckbox,
    align: 'center'
  },
  {
    id: 'id',
    name: 'Row Id',
    field: 'id',
    formatter: Soho.Formatters.Readonly
  },
  {
    id: 'productName',
    hidden: true,
    name: 'Product Name',
    sortable: false,
    field: 'productName',
    formatter: Soho.Formatters.Hyperlink,
    editor: Soho.Editors.Input
  },
  {
    id: 'activity',
    name: 'Activity',
    field: 'activity',
    required: true,
    editor: Soho.Editors.Input,
    validate: 'required'
  },
  {
    id: 'portable',
    name: 'Portable',
    field: 'portable',
    align: 'center',
    formatter: Soho.Formatters.Checkbox,
    editor: Soho.Editors.Checkbox
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    align: 'right',
    formatter: Soho.Formatters.Decimal,
    validate: 'required',
    numberFormat: {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    },
    editor: Soho.Editors.Input,
    mask: '####.00',
    maskMode: 'number'
  },
  {
    id: 'orderDate',
    name: 'Order Date',
    field: 'orderDate',
    formatter: Soho.Formatters.Date,
    editor: Soho.Editors.Date,
    validate: 'required date'
  },
  {
    id: 'action',
    name: 'Action',
    field: 'action',
    align: 'center',
    formatter: Soho.Formatters.Dropdown,
    editor: Soho.Editors.Dropdown,
    validate: 'required',
    options: [
      { id: '', label: '', value: '' },
      { id: 'oh1', label: 'On Hold', value: 'oh' },
      { id: 'sh1', label: 'Shipped', value: 'sh' },
      { id: 'ac1', label: 'Action', value: 'ac' }
    ]
  }
];

export const DIRTY_INDICATION_DATA: any[] = [
  {
    id: 1,
    productId: 2142201,
    productName: 'Compressor',
    activity: '<svg/onload=alert(1)>',
    quantity: 1,
    price: 210.99,
    status: 'OK',
    orderDate: '',
    portable: false,
    action: 'ac',
    description: 'Compressor comes with various air compressor'
  },
  {
    id: 2,
    productId: 2241202,
    productName: 'Different Compressor',
    activity: 'Inspect and Repair',
    quantity: 2,
    price: 210.991,
    status: '',
    orderDate: new Date(2016, 2, 15, 0, 30, 36),
    portable: false,
    action: 'oh',
    description: 'The kit has an air blow gun that can be used for cleaning'
  },
  {
    id: 3,
    productId: 2342203,
    productName: 'Portable Compressor',
    activity: '',
    portable: true,
    quantity: null,
    price: 120.992,
    status: null,
    orderDate: new Date(2014, 6, 3),
    action: 'ac'
  },
  {
    id: 4,
    productId: 2445204,
    productName: 'Another Compressor',
    activity: 'Assemble Paint',
    portable: true,
    quantity: 3,
    price: null,
    status: 'OK',
    orderDate: new Date(2015, 3, 3),
    action: 'ac',
    description: 'Compressor comes with with air tool kit'
  },
  {
    id: 5,
    productId: 2542205,
    productName: 'De Wallt Compressor',
    activity: 'Inspect and Repair',
    portable: false,
    quantity: 4,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 5, 5),
    action: 'oh'
  },
  {
    id: 6,
    productId: 2642205,
    productName: 'Air Compressors',
    activity:  'Inspect and Repair',
    portable: false,
    quantity: 41,
    price: 120.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'oh'
  },
  {
    id: 7,
    productId: 2642206,
    productName: 'Some Compressor',
    activity: 'inspect and Repair',
    portable: true,
    quantity: 41,
    price: 123.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'oh'
  }
];
