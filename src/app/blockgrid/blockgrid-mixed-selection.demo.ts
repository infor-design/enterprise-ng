import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'soho-blockgrid-mixed-selection.demo',
  templateUrl: './blockgrid-mixed-selection.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlockGridMixedSelectionDemoComponent {

  constructor(private elementRef: ElementRef) {
  }

  public data = [
    { img: 'https://randomuser.me/api/portraits/med/women/8.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/9.jpg', maintxt: 'Jane Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/10.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, SVP' },
    { img: 'https://randomuser.me/api/portraits/med/women/11.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Developer' },
    { img: 'https://randomuser.me/api/portraits/med/women/12.jpg', maintxt: 'Sheena Taylor', subtxt: 'Infor, Architect' }
  ];
}
