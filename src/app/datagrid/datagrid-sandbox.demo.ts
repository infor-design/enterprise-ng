import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";

import { combineLatest, map, Observable, startWith, Subject } from "rxjs";

interface MyData {
  displayName: string;
}

@Component({
  selector: "app-datagrid-sandbox-demo",
  templateUrl: "datagrid-sandbox.demo.html",
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DataGridSandboxDemoComponent implements OnInit {
  defaultGridOptions = {
    columns: [
      {
        id: "displayName",
        name: "Name",
        field: "displayName",
        sortable: true,
        // formatter: Soho.Formatters.Ellipsis,
      },
    ],
    dataset: [],
  };

  gridOptions$!: Observable<SohoDataGridOptions>;

  dataset$ = new Subject<MyData[]>();

  ngOnInit(): void {
    const dataset$ = this.getDataset().pipe(startWith([]));
    this.gridOptions$ = combineLatest([dataset$]).pipe(
      map(([dataset]) => {
        return {
          ...this.defaultGridOptions,
          dataset,
          toolbar: { keywordFilter: true },
        };
      })
    );
  }

  getDataset(): Observable<MyData[]> {
    return this.dataset$;
  }

  onClickGetDataset(): void {
    this.dataset$.next([
      { displayName: "Hello" },
      { displayName: "World" },
      { displayName: "Foo" },
      { displayName: "Bar" },
      { displayName: "Zoo" },
    ]);
  }
}
