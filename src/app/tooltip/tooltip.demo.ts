import { Component, OnInit , ViewChildren, QueryList} from '@angular/core';

import {
  SohoTooltipDirective
} from '../../soho/tooltip';

@Component({
  selector: 'soho-tooltip-demo',
  templateUrl: 'tooltip.demo.html',
})
export class TooltipDemoComponent implements OnInit {

  @ViewChildren(SohoTooltipDirective) tooltips: QueryList<SohoTooltipDirective>;

  private normalTooltipText: string = "Tooltips Provide<br> Additional Information";
  private standardTooltipText: string = "<span style='text-align: left; display: inline-block;'><b style='text-transform: uppercase; line-height: 1.7em;'>Connected order</b><br>Tooltips Provide <br> Additional Information</span>";

  constructor() { }
  ngOnInit() {
  }

  openTooltip() {
    this.tooltips.last.show();
  }
}
