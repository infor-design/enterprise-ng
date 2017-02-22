import {
  Component,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'soho-button-demo',
  templateUrl: './button.demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonDemoComponent implements OnInit {
  public shouldSayHi = false;

  constructor() {}
  ngOnInit() {}
  toggleHello() {
    this.shouldSayHi = !this.shouldSayHi;
  }
}
