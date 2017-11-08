import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef
} from '@angular/core';

@Component({
  selector: '[lm-code-block]', // tslint:disable-line
  template: `<div class="code-block-container">
      <div class="code-block">
      <ng-content></ng-content></div>
      <button type="button" class="btn-icon hide-focus">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xlink:href="#icon-launch"></use>
        </svg>
        <span>Launch</span>
      </button>

      <button type="button" class="btn-actions code-block-actions btn-menu"
        soho-context-menu trigger="click">
        <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
          <use xlink:href="#icon-more"></use>
        </svg>
        <span>Launch</span>
      </button>
      <ul soho-popupmenu>
        <li soho-popupmenu-item><a soho-popupmenu-label>Show Field History</a></li>
        <li soho-popupmenu-item><a soho-popupmenu-label>Show Pending Changes</a></li>
        <li soho-popupmenu-item>
          <a soho-popupmenu-label>Drill Around</a>
          <ul soho-popupmenu>
            <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 1</a></li>
            <li soho-popupmenu-item><a soho-popupmenu-label>Sub Menu 2</a></li>
          </ul>
        </li>
        <li soho-popupmenu-separator singleSelectableSection="true"></li>
        <li soho-popupmenu-heading>Options</li>
        <li soho-popupmenu-item
        (click)="toggleLabels()" [isChecked]="showLabels" isSelectable="true">
            <a soho-popupmenu-label>Show Labels</a>
        </li>
      </ul>
    </div>`,
  styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements AfterViewInit, OnDestroy {
  public showLabels = true;

  constructor(private elementRef: ElementRef) {

    // TODO: Add focus within poly fill for IE 11
    // https://gist.github.com/aFarkas/a7e0d85450f323d5e164
  }

  ngAfterViewInit() {
    console.log(this.elementRef);
  }

  ngOnDestroy() {

  }

  toggleLabels() {
    setTimeout(() => this.showLabels = !this.showLabels);
  }

}
