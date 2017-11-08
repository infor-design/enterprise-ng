import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

@Component({
  selector: '[lm-code-block]', // tslint:disable-line
  template: `<div class="code-block"><ng-content></ng-content></div>`,
  styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements AfterViewInit, OnDestroy {

  constructor(private elementRef: ElementRef) {

    // TODO: Add focus within poly fill for IE 11
    // https://gist.github.com/aFarkas/a7e0d85450f323d5e164

  }

  ngAfterViewInit() {
    console.log(this.elementRef);
  }

  ngOnDestroy() {

  }

}
