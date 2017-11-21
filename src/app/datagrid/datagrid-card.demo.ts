import {
  Component,
  ChangeDetectionStrategy, Input
} from '@angular/core';

@Component({
  selector: 'soho-datagrid-card-demo',
  templateUrl: './datagrid-card.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles : [`
    .demo-card-row {
      display: flex;
      flex-direction: row;
      padding-top: 5px;
    }
    .demo-card-row label {
      padding-right: 5px;
      font-weight: bold;
    }
    .demo-card-row label,
    .demo-card-row span {
      font-size: 1.2rem;
    }
    a {
      padding: 0 5px;
    }
  `]
})
export class DataGridCardDemoComponent {
  @Input() dataSet: any;

  constructor() {}

  onClick(value: string) {
    alert(value + ' Clicked');
  }
}
