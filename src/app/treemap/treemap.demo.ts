import {
  Component,
  OnInit
} from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'app-treemap-demo',
    templateUrl: 'treemap.demo.html',
    standalone: false
})
export class TreemapDemoComponent implements OnInit {

  public treemapData = {
    name: 'Storage Utilization (78 GB)',
    children: [
      {
        name: 'by type',
        children: [
          {
            name: 'type1',
            children: [
              { name: 'JSON', value: 3400 }
            ]
          }, {
            name: 'type2',
            children: [
              { name: 'PDF', value: 2200 }
            ]
          }, {
            name: 'type3',
            children: [
              { name: 'BOD', value: 1000 }
            ]
          }, {
            name: 'type4',
            children: [
              { name: 'TXT', value: 1000 }
            ]
          }, {
            name: 'type5',
            children: [
              { name: 'CSV', value: 2000 }
            ]
          }, {
            name: 'type6',
            children: [
              { name: 'Assets', value: 800 }
            ]
          }, {
            name: 'type7',
            children: [
              { name: 'Others', value: 1700 }
            ]
          }]
      }]
  };

  constructor() { }

  ngOnInit() { }

  onRendered(event: Event) {
    console.log('Soho Tree Map: onRender', event);
  }
}
