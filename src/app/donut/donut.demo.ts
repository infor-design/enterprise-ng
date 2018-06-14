import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';
import {SohoPieComponent} from '../../soho/pie';

@Component({
  selector: 'soho-pie-demo',
  templateUrl: './donut.demo.html',
})
export class DonutDemoComponent implements OnInit {

  @ViewChild(SohoPieComponent) sohoPieComponent: SohoPieComponent;

  private selection: SohoPieSelected  = {fieldName: 'name', fieldValue: 'Component B'};
  public donutData = [{
    data: [{
      name: 'Component A',
      value: 16
    }, {
      name: 'Component B',
      value: 12
    }, {
      name: 'Component C',
      value: 14
    }],
    centerLabel: 'Donut Chart'
  }];

  constructor() {}

  ngOnInit() {}

  onRendered(event: Event) {
    console.log('Soho Donut: onRender', event);
  }

  onSelected(event: Event) {
    console.log('Soho Donut: Selected', event);
  }

  onDeselected(event: Event) {
    console.log('Soho Donut: Deselected', event);
  }

  setChartSelection() {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent.setSelected(sohoPieSelected);
  }

  toggleChartSelection () {
    const sohoPieSelected: SohoPieSelected = this.selection;
    this.sohoPieComponent.toggleSelected(sohoPieSelected);
  }
}
