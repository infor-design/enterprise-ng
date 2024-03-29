/****************************************************************
 *						                                                  *
 *                           NOTICE                             *
 *						                                                  *
 *   THIS SOFTWARE IS THE PROPERTY OF AND CONTAINS              *
 *   CONFIDENTIAL INFORMATION OF INFOR AND/OR ITS AFFILIATES    *
 *   OR SUBSIDIARIES AND SHALL NOT BE DISCLOSED WITHOUT PRIOR   *
 *   WRITTEN PERMISSION. LICENSED CUSTOMERS MAY COPY AND        *
 *   ADAPT THIS SOFTWARE FOR THEIR OWN USE IN ACCORDANCE WITH   *
 *   THE TERMS OF THEIR SOFTWARE LICENSE AGREEMENT.             *
 *   ALL OTHER RIGHTS RESERVED.			                            *
 *                                                              *
 *   (c) COPYRIGHT 2022 INFOR.  ALL RIGHTS RESERVED.            *
 *   THE WORD AND DESIGN MARKS SET FORTH HEREIN ARE             *
 *   TRADEMARKS AND/OR REGISTERED TRADEMARKS OF INFOR           *
 *   AND/OR ITS AFFILIATES AND SUBSIDIARIES. ALL RIGHTS         *
 *   RESERVED.  ALL OTHER TRADEMARKS LISTED HEREIN ARE          *
 *   THE PROPERTY OF THEIR RESPECTIVE OWNERS.                   *
 *						                                                  *
 ****************************************************************/
 
 export class PartnerMapping {
  public externalValue: string;
  public internalValue: string;
  public businessKey: string;
  public accountingEntityID: string;
  public locationId: string;

  constructor() {
    this.externalValue = '';
    this.internalValue = '';
    this.businessKey = '';
    this.accountingEntityID = '';
    this.locationId = '';
  }
}
