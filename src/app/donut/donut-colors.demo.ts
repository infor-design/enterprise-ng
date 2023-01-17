import {
    Component,
    OnInit,
    ViewChild
} from '@angular/core';
// @ts-ignore
import { SohoPieComponent } from 'ids-enterprise-ng';

@Component({
    selector: 'app-pie-color-demo',
    templateUrl: 'donut-colors.demo.html',
})
export class DonutColorsDemoComponent implements OnInit {

    @ViewChild(SohoPieComponent, { static: true }) sohoPieComponent?: SohoPieComponent;

    public donutData = [{
        data: [{
            name: 'Azure 7',
            value: 16,
            color: 'azure07'
        }, {
            name: 'Ruby 6',
            value: 12,
            color: 'ruby06'
        }, {
            name: 'Emerald 5',
            value: 14,
            color: 'emerald05'
        }],
        centerLabel: 'Donut Chart',
        centerTooltip: 'Total Value: 41'
    }];

    constructor() { }

    ngOnInit() { }
}
