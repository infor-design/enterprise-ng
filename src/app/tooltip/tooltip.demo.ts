import {
  Component,
  OnInit,
  ViewChildren,
  QueryList,
  ViewChild
} from '@angular/core';

import { SohoTooltipDirective } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tooltip-demo',
  templateUrl: 'tooltip.demo.html',
})
export class TooltipDemoComponent implements OnInit {

  @ViewChildren(SohoTooltipDirective) tooltips?: QueryList<SohoTooltipDirective>;
  @ViewChild('keepOpenTooltip', { read: SohoTooltipDirective }) keepOpenTooltip?: SohoTooltipDirective;

  public normalTooltipText = 'Tooltips Provide<br> Additional Information';

  public standardTooltipText = `<span style=\'text-align: left; display: inline-block;\'>
  <b style=\'text-transform: uppercase; line-height: 1.7em;\'>Connected order</b>
  <br>Tooltips Provide <br> Additional Information</span>`;

  public popoverTitle = 'Purchase Information';
  public popoverMarkup = `<div id="popover-contents" class="popover-content-area hidden">
      <p>Purchase <strong>2</strong> more to save <a href="#" class="hyperlink"><strong>$100</strong></a> total</p>
      <div style="width: 315px; margin: 7px auto;">
        <table role="grid" style="width: 210px" class="l-pull-left">
          <thead>
            <tr>
              <th scope="col" role="columnheader">Quantity</th>
              <th scope="col" role="columnheader">Unit Price</th>
              <th scope="col" role="columnheader">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>50</td>
              <td>$18.00</td>
              <td><strong>$900.00</strong></td>
            </tr>
          </tbody>
        </table>
        <button class="btn-primary" type="button">Apply</button>
      </div>
      <div class="modal-buttonset">
        <button type="button" class="btn-modal-primary">View more</button>
      </div>
    </div>`;

  constructor() { }
  ngOnInit() {
  }

  openTooltip() {
    this.tooltips?.toArray()[1].show();
  }

  changeTooltip() {
    this.standardTooltipText = 'CHANGED';
    this.normalTooltipText = 'CHANGED';
  }

  forceClose() {
    this.keepOpenTooltip?.hide(true);
  }
}
