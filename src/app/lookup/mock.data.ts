export const productsData = [
  {
    id: 1,
    productId: 2142201,
    productName: 'Compressor',
    activity:  'Assemble Paint',
    quantity: 1,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2014, 12, 8),
    action: 'Action',
  }, {
    id: 2,
    productId: 2241202,
    productName: 'Different Compressor',
    activity:  'Inspect and Repair',
    quantity: 2,
    price: 210.99,
    status: '',
    orderDate: new Date(2015, 7, 3),
    action: 'On Hold',
  }, {
    id: 3,
    productId: 2342203,
    productName: 'Compressor',
    activity:  'Inspect and Repair',
    quantity: 1,
    price: 120.99,
    status: null as any,
    orderDate: new Date(2014, 6, 3),
    action: 'Action',
  }, {
    id: 4,
    productId: 2445204,
    productName: 'Another Compressor',
    activity:  'Assemble Paint',
    quantity: 3,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 3, 3),
    action: 'Action',
  }, {
    id: 5,
    productId: 2542205,
    productName: 'I Love Compressors',
    activity:  'Inspect and Repair',
    quantity: 4,
    price: 210.99,
    status: 'OK',
    orderDate: new Date(2015, 5, 5),
    action: 'On Hold',
  }, {
    id: 5,
    productId: 2642205,
    productName: 'Air Compressors',
    activity:  'Inspect and Repair',
    quantity: 41,
    price: 120.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  }, {
    id: 6,
    productId: 2642206,
    productName: 'Some Compressor',
    activity:  'inspect and Repair',
    quantity: 41,
    price: 123.99,
    status: 'OK',
    orderDate: new Date(2014, 6, 9),
    action: 'On Hold',
  },
];

export const productsColumns = [
  {
    id: 'productId',
    name: 'Product Id',
    field: 'productId',
    formatter: Soho.Formatters.Readonly
  },
  {
    id: 'productName',
    name: 'Product Name',
    sortable: false,
    field: 'productName',
    formatter: Soho.Formatters.Hyperlink
  },
  {
    id: 'activity',
    hidden: true,
    name: 'Activity',
    field: 'activity'
  },
  {
    id: 'quantity',
    name: 'Quantity',
    field: 'quantity',
  },
  {
    id: 'price',
    name: 'Price',
    field: 'price',
    formatter: Soho.Formatters.Decimal
  },
  {
    id: 'orderDate',
    name: 'Order Date',
    field: 'orderDate',
    formatter: Soho.Formatters.Date,
    dateFormat: 'M/d/yyyy'
  },
];

export const checkboxColumn = {
  id: 'selectionCheckbox',
  sortable: false,
  resizable: false,
  formatter: Soho.Formatters.SelectionCheckbox,
  align: 'center',
};
