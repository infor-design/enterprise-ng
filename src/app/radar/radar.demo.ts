import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {SohoRadarComponent} from '../../soho/radar';

@Component({
  selector: 'soho-radar-demo',
  templateUrl: './radar.demo.html',
})
export class RadarDemoComponent implements OnInit {

  @ViewChild(SohoRadarComponent) sohoRadarComponent: SohoRadarComponent;

  // The following multiple "private selection" definitions are all examples of ways to set the selection on the chart
  // private selection: SohoRadarSelected  = {fieldName: 'name', fieldValue: 'Samsung'};
  private selection: SohoRadarSelected  = {index: 1};

  public radarData = [{
    data: [
      {name: 'Battery Life', value: 0.22},
      {name: 'Brand', value: 0.28},
      {name: 'Cost', value: 0.29},
      {name: 'Design', value: 0.17},
      {name: 'Connectivity', value: 0.22},
      {name: 'Screen', value: 0.02},
      {name: 'Price', value: 0.21}
    ],
    name: 'iPhone X',
    id: '1'
  }, {
    data: [
      {name: 'Battery Life', value: 0.27},
      {name: 'Brand', value: 0.16},
      {name: 'Cost', value: 0.35},
      {name: 'Design', value: 0.13},
      {name: 'Connectivity', value: 0.20},
      {name: 'Screen', value: 0.13},
      {name: 'Price', value: 0.35}
    ],
    name: 'Samsung',
    id: '2'
  }, {
    data: [
      {name: 'BatteryLife ', value: 0.26},
      {name: 'Brand', value: 0.10},
      {name: 'Contract', value: 0.30},
      {name: 'Design', value: 0.14},
      {name: 'Connectivity', value: 0.22},
      {name: 'Screen', value: 0.04},
      {name: 'Price', value: 0.41}
    ],
    name: 'Nokia Smartphone',
    id: '3'
  }];

  constructor() { }
  ngOnInit() {}

  onRendered(event: Event) {
    console.log('Soho Radar: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Radar: Selected', event);
  }

  onRadar(event: Event) {
    console.log('Soho Radar: onRadar', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Radar: onDeselected', event);
  }

  onDeSelected(event: Event) {
    console.log('Soho Radar: Deselected', event);
  }

  update() {
    this.radarData = [{
      data: [
        {name: 'Battery Life', value: 0.22},
        {name: 'Brand', value: 0.28},
        {name: 'Cost', value: 0.29},
        {name: 'Design', value: 0.17},
        {name: 'Price', value: 0.21}
      ],
      name: 'iPhone XI',
      id: '1'
    }, {
      data: [
        {name: 'Battery Life', value: 0.21},
        {name: 'Brand', value: 0.21},
        {name: 'Cost', value: 0.35},
        {name: 'Design', value: 0.13},
        {name: 'Price', value: 0.35}
      ],
      name: 'Some Samsung',
      id: '2'
    }, {
      data: [
        {name: 'BatteryLife ', value: 0.12},
        {name: 'Brand', value: 0.10},
        {name: 'Contract', value: 0.31},
        {name: 'Design', value: 0.14},
        {name: 'Price', value: 0.41}
      ],
      name: 'Smartphone',
      id: '3'
    }];
  }

  setChartSelection() {
    const sohoRadarSelected: SohoRadarSelected = this.selection;
    this.sohoRadarComponent.setSelected(sohoRadarSelected);
  }

  toggleChartSelection () {
    const sohoRadarSelected: SohoRadarSelected = this.selection;
    this.sohoRadarComponent.toggleSelected(sohoRadarSelected);
  }

}
