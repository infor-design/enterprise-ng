import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  Optional,
} from '@angular/core';

@Component({
  selector: 'datagrid-column-component',
  templateUrl: './datagrid-column-component.demo.html',
  styleUrls: ['./datagrid-column-component.demo.scss'],
})
export class DatagridColumnComponent implements OnInit {
  id: number = 0;
  viewValue: string = '';

  constructor(
    @Optional() @Inject('args') public args: SohoDataGridPostRenderCellArgs
  ) {
    this.viewValue = 'Item description with an icon';
  }

  ngOnInit() { }
}
