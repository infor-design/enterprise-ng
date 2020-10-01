import { Observable } from 'rxjs';

/**
 * Dynamic Soho Data Grid Service contract.
 */
export abstract class SohoDataGridService {

  /**
   * Returns the columns to use for the data grid.
   */
  abstract getColumns(): SohoDataGridColumn[];

  /**
   * Returns a list of data rows.
   *
   * @todo implement pagingpaging
   *
   * @param gridRequest -used to define the data to return.
   */
  abstract getData(req: SohoDataGridSourceRequest): Observable<any[]>;
}
