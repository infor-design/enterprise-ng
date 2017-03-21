import { Observable } from 'rxjs/Rx';

/**
 * Dynamic Soho SwapList Service contract.
 */
export abstract class SohoSwapListService {
    /**
     * Returns a list of data rows.
     *
     * @param gridRequest -used to define the data to return.
     *
     * @todo Request/Response type and data type would be defined after SwapList dataset API completed.
     */
    abstract getData(req: any, resp : any): Observable<any[]>;
}