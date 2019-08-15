export class DataGridLookupSelectionEvent<T> {
  constructor(public eventSource: T, public rows: Array<any>) {}
}
