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
// Author Theo Harper (theo.harper@infor.com)
// Version $
// $Id:  $
//

// Static helper class for precondition checking.
export class ArgumentHelper  {

    /**
     * Checks the given parameter is not null, throws an exception if not. 
     */
    public static checkNotNull(parameterName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The parameter/input '${parameterName}' must not be null.`);
        }
    }

    public static checkNotEmpty(parameterName: string, arg: string) {
        ArgumentHelper.checkNotNull(parameterName, arg);
        if (arg.length === 0) {
            throw new Error(`The parameter/input '${parameterName}' must not be empty.`);
        }
    }

    public static checkInputNotNull(parentName: string, inputName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The @Input('${inputName}') is mandatory on '${parentName}'.`);
        }
    }

    public static checkChildNotNull(parentName: string, childName: string, arg: any) {
        if (arg === null || arg === undefined) {
            throw new Error(`The @ViewChild('${childName}') is mandatory on '${parentName}'.`);
        }
    }
}


