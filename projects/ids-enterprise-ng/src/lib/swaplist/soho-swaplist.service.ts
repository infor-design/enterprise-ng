/// <reference path="soho-swaplist.d.ts" />

import { Observable } from 'rxjs';

/**
 * Dynamic Soho SwapList Service contract.
 */
export abstract class SohoSwapListService {
    /**
     * Returns a list of <SohoSwapListOptions> data.
     */
    abstract getData(): Observable<SohoSwapListOptions>;
}
