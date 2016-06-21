import {Component, ElementRef, OnInit, HostBinding, Input} from '@angular/core';

declare var $: any;

@Component({
    selector : 'soho-expandablearea-component',
    template : `
        <div class="expandable-header">
          <span class="title">{{ title }}</span>
        </div>
        <div class="expandable-pane">
          <div class="content">
            <ng-content></ng-content>
          </div>
        </div>
    `
})

export class SohoExpandableAreaComponent implements OnInit {
  elementRef: ElementRef;
  constructor(elementRef: ElementRef) {
    this.elementRef = elementRef;
  }

  @Input() title: string;
  @HostBinding('class') classes = 'expandable-area';

  ngOnInit() {
    $(this.elementRef.nativeElement).expandablearea();
  }
}
