import { Component } from '@angular/core';

@Component({
    selector: 'app-lookup-source',
    templateUrl: './lookup-source.demo.html',
    standalone: false
})
export class LookupSourceDemoComponent {

  model = ["first", "third"];
  columns?: SohoDataGridColumn[] = [
    {
      id: "productId",
      name: "Product Id",
      field: "productId",
      width: 140,
      formatter: Soho.Formatters.Readonly
    },
    {
      id: "productName",
      name: "Product Name",
      sortable: false,
      field: "productName",
      width: 250,
    },
    {
      id: "activity",
      hidden: true,
      name: "Activity",
      field: "activity",
      width: 125,
    },
    {
      id: "quantity",
      name: "Quantity",
      field: "quantity",
      width: 125,
    },
    {
      id: "price",
      name: "Price",
      field: "price",
      width: 125,
      formatter: Soho.Formatters.Decimal
    },
    {
      id: "orderDate",
      name: "Order Date",
      field: "orderDate",
      formatter: Soho.Formatters.Date,
      dateFormat: "M/d/yyyy"
    },
  ];

  dataset: Order[] = [
    {
      id: 1,
      productId: "first",
      productName: "Compressor",
      activity: "Assemble Paint",
      quantity: 1,
      price: 210.99,
      status: "OK",
      orderDate: new Date(2014, 12, 8),
      action: "Action",
    }, {
      id: 2,
      productId: "second",
      productName: "Different Compressor",
      activity: "Inspect and Repair",
      quantity: 2,
      price: 210.99,
      status: "",
      orderDate: new Date(2015, 7, 3),
      action: "On Hold",
    }, {
      id: 3,
      productId: "third",
      productName: "Compressor",
      activity: "Inspect and Repair",
      quantity: 1,
      price: 120.99,
      status: "",
      orderDate: new Date(2014, 6, 3),
      action: "Action",
    }, {
      id: 4,
      productId: "fourth",
      productName: "Another Compressor",
      activity: "Assemble Paint",
      quantity: 3,
      price: 210.99,
      status: "OK",
      orderDate: new Date(2015, 3, 3),
      action: "Action",
    }, {
      id: 5,
      productId: "fifth",
      productName: "I Love Compressors",
      activity: "Inspect and Repair",
      quantity: 4,
      price: 210.99,
      status: "OK",
      orderDate: new Date(2015, 5, 5),
      action: "On Hold",
    }, {
      id: 5,
      productId: "sixth",
      productName: "Air Compressors",
      activity: "Inspect and Repair",
      quantity: 41,
      price: 120.99,
      status: "OK",
      orderDate: new Date(2014, 6, 9),
      action: "On Hold",
    }, {
      id: 6,
      productId: "seventh",
      productName: "Some Compressor",
      activity: "inspect and Repair",
      quantity: 41,
      price: 123.99,
      status: "OK",
      orderDate: new Date(2014, 6, 9),
      action: "On Hold",
    },
  ];

  source: SohoDataGridSourceFunction = (request, response): void => {
    setTimeout(() => response(this.dataset, request), 1000);
  }
}

interface Order {
  id: number;
  productId: string;
  productName: string;
  activity: string;
  quantity: number;
  price: number;
  status: string;
  orderDate: Date;
  action: string;
}