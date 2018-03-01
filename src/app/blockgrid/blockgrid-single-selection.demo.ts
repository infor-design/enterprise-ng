import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import {
  SohoBlockGridComponent
} from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-blockgrid-single-selection.demo',
  templateUrl: './blockgrid-single-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridSingleSelectionDemoComponent implements AfterViewInit {
  @ViewChild(SohoBlockGridComponent) sohoBlockGridComponent: SohoBlockGridComponent;

  constructor(private elementRef: ElementRef) {
  }

  public data = [
    { img: 'https://randomuser.me/api/portraits/med/women/8.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/9.jpg', maintxt: 'Jane Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/10.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, SVP' },
    { img: 'https://randomuser.me/api/portraits/med/women/11.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/12.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Architect' }
  ];

  ngAfterViewInit(): void {
  }
}
