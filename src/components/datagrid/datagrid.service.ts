import { Observable } from 'rxjs/Rx';

import {
    SohoGridColumn,
    SohoSourceRequest
} from './datagrid.model';

/**
 * Dynamic SoHo Data Grid contract.
 */
export abstract class SohoDataGridService {

    /**
     * Returns the columns to use for the data grid.
     */
    abstract getColumns(): SohoGridColumn[];

    /**
     * Returns a list of data rows.
     *
     * @todo implement pagingpaging
     * 
     * @param gridRequest -used to define the data to return.
     */
    abstract getData(req: SohoSourceRequest): Observable<any[]>;
}
