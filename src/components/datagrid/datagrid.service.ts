// Copyright (c) 2016 Infor. All rights reserved. www.infor.com
// 
// NOTICE 
// 
// THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS
// CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES
// OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR
// WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND
// ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH
// THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.
// ALL OTHER RIGHTS RESERVED.
//
// (c) COPYRIGHT 2016 INFOR.  ALL RIGHTS RESERVED.
// THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE
// TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR
// AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS
// RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE
// THE PROPERTY OF THEIR RESPECTIVE OWNERS. 

//
// Author: Theo Harper (theo.harper@infor.com)
//

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { 
    GridColumn, 
    GridRequest 
} from './datagrid.model';

/**
 * Dynamic Grid contract.
 */
@Injectable()
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