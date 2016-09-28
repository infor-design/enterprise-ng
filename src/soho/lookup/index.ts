export * from './lookup.component';
export * from './lookup.module';

export declare abstract class OnBeforeLookupShow {
  /**
   * Used to manage data prior to showing the lookup.
   *
   * For example:
   *  - When the button is clicked, show a loading dialog and make the request for
   *    lookup grid data.
   *  - Upon receiving grid data, set lookup.settings.options for the columns and dataset.
   *  - Then call grid() to build the grid and complete the lookup call.
   */
  abstract onBeforeLookupShow(lookup: any, grid: (gridOptions: Object) => {}): any;
}

export interface SohoLookupChangeEvent {
  data: Object;
  elem: HTMLElement[];
  idx: number;
};
