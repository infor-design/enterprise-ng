import { Observable } from 'rxjs/Rx';

import {
    GridColumn,
    GridRequest
} from './datagrid.model';

/**
 * Dynamic SoHo Data Grid contract.
 */
export abstract class DataGridService {

    /**
     * Returns the columns to use for the grid.
     *
     * This default service return an single root node.
     *
     * @todo allow this to be parameterised, such that the
     * caller can controll initial depth, recursion, etc ...
     */
    abstract getColumns(): GridColumn[];

    /**
     * Returns a list of data rows, as a promise.
     *
     * @param gridRequest -
     */
    abstract getData(req: GridRequest): Observable<any[]>;
}
