/* tslint:disable */
export const PAGING_COLUMNS: SohoDataGridColumn[] = [
  { id: 'selectionCheckbox', sortable: false, resizable: false, width: 50, formatter: Soho.Formatters.SelectionCheckbox, align: 'center', exportable: false },
  { id: 'productId',   name: 'Product Id',   field: 'productId',   sortable: false, filterType: 'integer', width: 140, formatter: Soho.Formatters.Readonly },
  { id: 'productName', name: 'Product Name', field: 'productName', sortable: false, filterType: 'text',    width: 150, formatter: Soho.Formatters.Hyperlink },
  { id: 'activity',    name: 'Activity',     field: 'activity',    sortable: false, filterType: 'text',    width: 125, hidden: true },
  { id: 'quantity',    name: 'Quantity',     field: 'quantity',    sortable: false,                        width: 125 },
  { id: 'price',       name: 'Price',        field: 'price',       sortable: false, filterType: 'decimal', width: 125, formatter: Soho.Formatters.Decimal },
  { id: 'orderDate',   name: 'Order Date',   field: 'orderDate',   sortable: false, filterType: 'date',    formatter: Soho.Formatters.Date, dateFormat: 'M/d/yyyy' }
];
/* tslint:enable */

export const PAGING_DATA: any[] = [
  {
    id:          0,
    productId:   214220,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    1,
    price:       210.99,
    status:      'Active',
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .32
  },
  {
    id:          1,
    productId:   214221,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    1.5,
    price:       209.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .76
  },
  {
    id:          2,
    productId:   214222,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    2,
    price:       208.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .32
  },
  {
    id:          3,
    productId:   214223,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    2.5,
    price:       207.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .53
  },
  {
    id:          4,
    productId:   214224,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    3,
    price:       206.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .42
  },
  {
    id:          5,
    productId:   214225,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    3.5,
    price:       205.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .88
  },
  {
    id:          6,
    productId:   214226,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    4,
    price:       204.99,
    status:      'Active',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .54
  },
  {
    id:          7,
    productId:   214227,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    4.5,
    price:       203.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .41
  },
  {
    id:          8,
    productId:   214228,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    5,
    price:       202.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .21
  },
  {
    id:          9,
    productId:   214229,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    5.5,
    price:       201.99,
    status:      'Late',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          10,
    productId:   214230,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    6,
    price:       200.99,
    status:      'Late',
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .76
  },
  {
    id:          11,
    productId:   214231,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    6.5,
    price:       199.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          12,
    productId:   214232,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    7,
    price:       198.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       1.00
  },
  {
    id:          13,
    productId:   214233,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    7.5,
    price:       197.99,
    status:      'Late',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .36
  },
  {
    id:          14,
    productId:   214234,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    8,
    price:       196.99,
    status:      'On Hold',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       1.00
  },
  {
    id:          15,
    productId:   214235,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    8.5,
    price:       195.99,
    status:      'Active',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .96
  },
  {
    id:          16,
    productId:   214236,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    9,
    price:       194.99,
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .72
  },
  {
    id:          17,
    productId:   214237,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    9.5,
    price:       193.99,
    status:      'Active',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .35
  },
  {
    id:          18,
    productId:   214238,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    10,
    price:       192.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .44
  },
  {
    id:          19,
    productId:   214239,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    10.5,
    price:       191.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .24
  },
  {
    id:          20,
    productId:   214240,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    11,
    price:       190.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .22
  },
  {
    id:          21,
    productId:   214241,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    11.5,
    price:       189.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .67
  },
  {
    id:          22,
    productId:   214242,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    12,
    price:       188.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .66
  },
  {
    id:          23,
    productId:   214243,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    12.5,
    price:       187.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .24
  },
  {
    id:          24,
    productId:   214244,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    13,
    price:       186.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .33
  },
  {
    id:          25,
    productId:   214245,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    13.5,
    price:       185.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .54
  },
  {
    id:          26,
    productId:   214246,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    14,
    price:       184.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .42
  },
  {
    id:          27,
    productId:   214247,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    14.5,
    price:       183.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .46
  },
  {
    id:          28,
    productId:   214248,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    15,
    price:       182.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33
  },
  {
    id:          29,
    productId:   214249,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    15.5,
    price:       181.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          30,
    productId:   214250,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    16,
    price:       180.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .37
  },
  {
    id:          31,
    productId:   214251,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    16.5,
    price:       179.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          32,
    productId:   214252,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    17,
    price:       178.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .47
  },
  {
    id:          33,
    productId:   214253,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    17.5,
    price:       177.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .26
  },
  {
    id:          34,
    productId:   214254,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    18,
    price:       176.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .12
  },
  {
    id:          35,
    productId:   214255,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    18.5,
    price:       175.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .71
  },
  {
    id:          36,
    productId:   214256,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    19,
    price:       174.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11
  },
  {
    id:          37,
    productId:   214257,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    19.5,
    price:       173.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          38,
    productId:   214258,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    20,
    price:       172.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .62
  },
  {
    id:          39,
    productId:   214259,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    20.5,
    price:       171.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .45
  },
  {
    id:          40,
    productId:   214260,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    21,
    price:       170.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .32
  },
  {
    id:          41,
    productId:   214261,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    21.5,
    price:       169.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          42,
    productId:   214262,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    22,
    price:       168.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .67
  },
  {
    id:          43,
    productId:   214263,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    22.5,
    price:       167.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .45
  },
  {
    id:          44,
    productId:   214264,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    23,
    price:       166.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .24
  },
  {
    id:          45,
    productId:   214265,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    23.5,
    price:       165.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .12
  },
  {
    id:          46,
    productId:   214266,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    24,
    price:       164.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .31
  },
  {
    id:          47,
    productId:   214267,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    24.5,
    price:       163.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .71
  },
  {
    id:          48,
    productId:   214268,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    25,
    price:       162.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .53
  },
  {
    id:          49,
    productId:   214269,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    25.5,
    price:       161.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .73
  },
  {
    id:          50,
    productId:   214270,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    26,
    price:       160.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .36
  },
  {
    id:          51,
    productId:   214271,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    26.5,
    price:       159.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          52,
    productId:   214272,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    27,
    price:       158.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .16
  },
  {
    id:          53,
    productId:   214273,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    27.5,
    price:       157.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .41
  },
  {
    id:          54,
    productId:   214274,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    28,
    price:       156.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .44
  },
  {
    id:          55,
    productId:   214275,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    28.5,
    price:       155.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .53
  },
  {
    id:          56,
    productId:   214276,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    29,
    price:       154.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          57,
    productId:   214277,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    29.5,
    price:       153.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .72
  },
  {
    id:          58,
    productId:   214278,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    30,
    price:       152.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33
  },
  {
    id:          59,
    productId:   214279,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    30.5,
    price:       151.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .78
  },
  {
    id:          60,
    productId:   214280,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    31,
    price:       150.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .26
  },
  {
    id:          61,
    productId:   214281,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    31.5,
    price:       149.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .52
  },
  {
    id:          62,
    productId:   214282,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    32,
    price:       148.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .10
  },
  {
    id:          63,
    productId:   214283,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    32.5,
    price:       147.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .40
  },
  {
    id:          64,
    productId:   214284,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    33,
    price:       146.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .45
  },
  {
    id:          65,
    productId:   214285,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    33.5,
    price:       145.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          66,
    productId:   214286,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    34,
    price:       144.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .35
  },
  {
    id:          67,
    productId:   214287,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    34.5,
    price:       143.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .41
  },
  {
    id:          68,
    productId:   214288,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    35,
    price:       142.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          69,
    productId:   214289,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    35.5,
    price:       141.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .26
  },
  {
    id:          70,
    productId:   214290,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    36,
    price:       140.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .66
  },
  {
    id:          71,
    productId:   214291,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    36.5,
    price:       139.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .54
  },
  {
    id:          72,
    productId:   214292,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    37,
    price:       138.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .22
  },
  {
    id:          73,
    productId:   214293,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    37.5,
    price:       137.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .32
  },
  {
    id:          74,
    productId:   214294,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    38,
    price:       136.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .41
  },
  {
    id:          75,
    productId:   214295,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    38.5,
    price:       135.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .34
  },
  {
    id:          76,
    productId:   214296,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    39,
    price:       134.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11
  },
  {
    id:          77,
    productId:   214297,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    39.5,
    price:       133.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .25
  },
  {
    id:          78,
    productId:   214298,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    40,
    price:       132.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33
  },
  {
    id:          79,
    productId:   214299,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    40.5,
    price:       131.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .33
  },
  {
    id:          80,
    productId:   214300,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    41,
    price:       130.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .62
  },
  {
    id:          81,
    productId:   214301,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    41.5,
    price:       129.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .52
  },
  {
    id:          82,
    productId:   214302,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    42,
    price:       128.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .23
  },
  {
    id:          83,
    productId:   214303,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    42.5,
    price:       127.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .74
  },
  {
    id:          84,
    productId:   214304,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    43,
    price:       126.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .54
  },
  {
    id:          85,
    productId:   214305,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    43.5,
    price:       125.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .21
  },
  {
    id:          86,
    productId:   214306,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    44,
    price:       124.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11
  },
  {
    id:          87,
    productId:   214307,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    44.5,
    price:       123.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .31
  },
  {
    id:          88,
    productId:   214308,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    45,
    price:       122.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .76
  },
  {
    id:          89,
    productId:   214309,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    45.5,
    price:       121.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .21
  },
  {
    id:          90,
    productId:   214310,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    46,
    price:       120.99000000000001,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .83
  },
  {
    id:          91,
    productId:   214311,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    46.5,
    price:       119.99000000000001,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .42
  },
  {
    id:          92,
    productId:   214312,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    47,
    price:       118.99000000000001,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .31
  },
  {
    id:          93,
    productId:   214313,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    47.5,
    price:       117.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .64
  },
  {
    id:          94,
    productId:   214314,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    48,
    price:       116.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .26
  },
  {
    id:          95,
    productId:   214315,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    48.5,
    price:       115.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .51
  },
  {
    id:          96,
    productId:   214316,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    49,
    price:       114.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .43
  },
  {
    id:          97,
    productId:   214317,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    49.5,
    price:       113.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .11
  },
  {
    id:          98,
    productId:   214318,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    50,
    price:       112.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .66
  },
  {
    id:          99,
    productId:   214319,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    50.5,
    price:       111.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .34
  }
];

export const CARD_DATA: any[] = [
  {
    id:          0,
    productId:   214220,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    1,
    price:       210.99,
    status:      'Active',
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .32,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          1,
    productId:   214221,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    1.5,
    price:       209.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .76,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          2,
    productId:   214222,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    2,
    price:       208.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .32,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          3,
    productId:   214223,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    2.5,
    price:       207.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .53,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          4,
    productId:   214224,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    3,
    price:       206.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .42,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          5,
    productId:   214225,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    3.5,
    price:       205.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .88,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          6,
    productId:   214226,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    4,
    price:       204.99,
    status:      'Active',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .54,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          7,
    productId:   214227,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    4.5,
    price:       203.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .41,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          8,
    productId:   214228,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    5,
    price:       202.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .21,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          9,
    productId:   214229,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    5.5,
    price:       201.99,
    status:      'Late',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          10,
    productId:   214230,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    6,
    price:       200.99,
    status:      'Late',
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .76,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          11,
    productId:   214231,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    6.5,
    price:       199.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          12,
    productId:   214232,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    7,
    price:       198.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       1.00,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          13,
    productId:   214233,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    7.5,
    price:       197.99,
    status:      'Late',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .36,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          14,
    productId:   214234,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    8,
    price:       196.99,
    status:      'On Hold',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       1.00,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          15,
    productId:   214235,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    8.5,
    price:       195.99,
    status:      'Active',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .96,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          16,
    productId:   214236,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    9,
    price:       194.99,
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .72
  },
  {
    id:          17,
    productId:   214237,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    9.5,
    price:       193.99,
    status:      'Active',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .35,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          18,
    productId:   214238,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    10,
    price:       192.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .44,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          19,
    productId:   214239,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    10.5,
    price:       191.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .24,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          20,
    productId:   214240,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    11,
    price:       190.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .22,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          21,
    productId:   214241,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    11.5,
    price:       189.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .67,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          22,
    productId:   214242,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    12,
    price:       188.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .66,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          23,
    productId:   214243,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    12.5,
    price:       187.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .24,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          24,
    productId:   214244,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    13,
    price:       186.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .33,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          25,
    productId:   214245,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    13.5,
    price:       185.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .54,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          26,
    productId:   214246,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    14,
    price:       184.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .42,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          27,
    productId:   214247,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    14.5,
    price:       183.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .46,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          28,
    productId:   214248,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    15,
    price:       182.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          29,
    productId:   214249,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    15.5,
    price:       181.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          30,
    productId:   214250,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    16,
    price:       180.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .37,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          31,
    productId:   214251,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    16.5,
    price:       179.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          32,
    productId:   214252,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    17,
    price:       178.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .47,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          33,
    productId:   214253,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    17.5,
    price:       177.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .26,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          34,
    productId:   214254,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    18,
    price:       176.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .12,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          35,
    productId:   214255,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    18.5,
    price:       175.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .71,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          36,
    productId:   214256,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    19,
    price:       174.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          37,
    productId:   214257,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    19.5,
    price:       173.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          38,
    productId:   214258,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    20,
    price:       172.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .62,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          39,
    productId:   214259,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    20.5,
    price:       171.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .45,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          40,
    productId:   214260,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    21,
    price:       170.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .32,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          41,
    productId:   214261,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    21.5,
    price:       169.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          42,
    productId:   214262,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    22,
    price:       168.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .67,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          43,
    productId:   214263,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    22.5,
    price:       167.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .45,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          44,
    productId:   214264,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    23,
    price:       166.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .24,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          45,
    productId:   214265,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    23.5,
    price:       165.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .12,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          46,
    productId:   214266,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    24,
    price:       164.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .31,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          47,
    productId:   214267,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    24.5,
    price:       163.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .71,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          48,
    productId:   214268,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    25,
    price:       162.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .53,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          49,
    productId:   214269,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    25.5,
    price:       161.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .73,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          50,
    productId:   214270,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    26,
    price:       160.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .36,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          51,
    productId:   214271,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    26.5,
    price:       159.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          52,
    productId:   214272,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    27,
    price:       158.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .16,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          53,
    productId:   214273,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    27.5,
    price:       157.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .41,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          54,
    productId:   214274,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    28,
    price:       156.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .44,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          55,
    productId:   214275,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    28.5,
    price:       155.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .53,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          56,
    productId:   214276,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    29,
    price:       154.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          57,
    productId:   214277,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    29.5,
    price:       153.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .72,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          58,
    productId:   214278,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    30,
    price:       152.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          59,
    productId:   214279,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    30.5,
    price:       151.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .78,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          60,
    productId:   214280,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    31,
    price:       150.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .26,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          61,
    productId:   214281,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    31.5,
    price:       149.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .52,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          62,
    productId:   214282,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    32,
    price:       148.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .10
  },
  {
    id:          63,
    productId:   214283,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    32.5,
    price:       147.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .40,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          64,
    productId:   214284,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    33,
    price:       146.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .45,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          65,
    productId:   214285,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    33.5,
    price:       145.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          66,
    productId:   214286,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    34,
    price:       144.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .35,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          67,
    productId:   214287,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    34.5,
    price:       143.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .41,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          68,
    productId:   214288,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    35,
    price:       142.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          69,
    productId:   214289,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    35.5,
    price:       141.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .26,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          70,
    productId:   214290,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    36,
    price:       140.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .66,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          71,
    productId:   214291,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    36.5,
    price:       139.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .54,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          72,
    productId:   214292,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    37,
    price:       138.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .22,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          73,
    productId:   214293,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    37.5,
    price:       137.99,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .32,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          74,
    productId:   214294,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    38,
    price:       136.99,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .41,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          75,
    productId:   214295,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    38.5,
    price:       135.99,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .34,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          76,
    productId:   214296,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    39,
    price:       134.99,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          77,
    productId:   214297,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    39.5,
    price:       133.99,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .25,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          78,
    productId:   214298,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    40,
    price:       132.99,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .33,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          79,
    productId:   214299,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    40.5,
    price:       131.99,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .33,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          80,
    productId:   214300,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    41,
    price:       130.99,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .62,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          81,
    productId:   214301,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    41.5,
    price:       129.99,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .52,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          82,
    productId:   214302,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    42,
    price:       128.99,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .23,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          83,
    productId:   214303,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    42.5,
    price:       127.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .74,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          84,
    productId:   214304,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    43,
    price:       126.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .54,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          85,
    productId:   214305,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    43.5,
    price:       125.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .21,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          86,
    productId:   214306,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    44,
    price:       124.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .11,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          87,
    productId:   214307,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    44.5,
    price:       123.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .31,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          88,
    productId:   214308,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    45,
    price:       122.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .76,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          89,
    productId:   214309,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    45.5,
    price:       121.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .21,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          90,
    productId:   214310,
    productName: 'Compressor 1',
    activity:    'Assemble Paint',
    quantity:    46,
    price:       120.99000000000001,
    orderDate:   '2015-01-01T06:00:00.000Z',
    action:      'Action',
    rated:       .83,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          91,
    productId:   214311,
    productName: 'Compressor 2',
    activity:    'Assemble Paint',
    quantity:    46.5,
    price:       119.99000000000001,
    status:      'Late',
    orderDate:   '2015-01-02T06:00:00.000Z',
    action:      'Action',
    rated:       .42,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          92,
    productId:   214312,
    productName: 'Compressor 3',
    activity:    'Assemble Paint',
    quantity:    47,
    price:       118.99000000000001,
    status:      'Active',
    orderDate:   '2015-01-03T06:00:00.000Z',
    action:      'Action',
    rated:       .31,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          93,
    productId:   214313,
    productName: 'Compressor 4',
    activity:    'Assemble Paint',
    quantity:    47.5,
    price:       117.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-04T06:00:00.000Z',
    action:      'Action',
    rated:       .64,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          94,
    productId:   214314,
    productName: 'Compressor 5',
    activity:    'Assemble Paint',
    quantity:    48,
    price:       116.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-05T06:00:00.000Z',
    action:      'Action',
    rated:       .26,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          95,
    productId:   214315,
    productName: 'Compressor 6',
    activity:    'Assemble Paint',
    quantity:    48.5,
    price:       115.99000000000001,
    status:      'Inactive',
    orderDate:   '2015-01-06T06:00:00.000Z',
    action:      'Action',
    rated:       .51,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          96,
    productId:   214316,
    productName: 'Compressor 7',
    activity:    'Assemble Paint',
    quantity:    49,
    price:       114.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-07T06:00:00.000Z',
    action:      'Action',
    rated:       .43,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          97,
    productId:   214317,
    productName: 'Compressor 8',
    activity:    'Assemble Paint',
    quantity:    49.5,
    price:       113.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-08T06:00:00.000Z',
    action:      'Action',
    rated:       .11,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          98,
    productId:   214318,
    productName: 'Compressor 9',
    activity:    'Assemble Paint',
    quantity:    50,
    price:       112.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-09T06:00:00.000Z',
    action:      'Action',
    rated:       .66,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  },
  {
    id:          99,
    productId:   214319,
    productName: 'Compressor 10',
    activity:    'Assemble Paint',
    quantity:    50.5,
    price:       111.99000000000001,
    status:      'On Hold',
    orderDate:   '2015-01-10T06:00:00.000Z',
    action:      'Action',
    rated:       .34,
    cardData: [{
      title: 'Test Product',
      location: {label: 'location', value: 'St. Paul, MN'},
      price: {label: 'Price', value: '$550.00'},
      buttons: [{value: 'Action One'}, {value: 'Action Two'}, {value: 'Action Three'}]
    }]
  }
];
