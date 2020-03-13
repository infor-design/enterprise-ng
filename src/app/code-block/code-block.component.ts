import {
  Component,
  OnDestroy,
  ElementRef,
  HostBinding,
  Input
} from '@angular/core';

@Component({
  selector: '[lm-code-block]', // tslint:disable-line
  template: `
    <div class="code-block-container">
      <div
        class="code-block input-style"
        [ngClass]="{ 'is-readonly': isReadOnly }"
      >
        <ng-content></ng-content>
      </div>
      <div class="code-block-buttons">
        <!--
        <button type="button" class="btn-icon hide-focus">
          <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
            <use href="#icon-launch"></use>
          </svg>
          <span>Launch</span>
        </button>
        -->

        <button
          type="button"
          class="btn-icon btn-actions code-block-actions btn-menu"
          soho-context-menu
          trigger="click"
          [beforeOpen]="onBeforeContextMenuOpen"
          (selected)="onSelected($event)"
        >
          <svg
            class="icon"
            focusable="false"
            aria-hidden="true"
            role="presentation"
          >
            <use href="#icon-more"></use>
          </svg>
          <span>Launch</span>
        </button>
        <ul class="popupmenu"></ul>
      </div>
    </div>
  `,
  styleUrls: ['./code-block.component.css']
})
export class CodeBlockComponent implements OnDestroy {
  @HostBinding('class.hide-labels') hideLabels = false;

  @Input() set readonly(value: boolean) {
    this.isReadOnly = value;
  }

  isReadOnly = false;

  private MENU_RESPONSE_HTML =
    '' +
    '<li><a href="#" id="ShowFieldHistory">Show Field History</a></li>' +
    '<li><a href="#" id="ShowPendingChanges">Show Pending Changes</a></li>' +
    '<li class="submenu">' +
    '<a href="#">Drill Points</a>' +
    '<ul class="popupmenu"></ul>' +
    '</li>' +
    '<li class="separator"></li>' +
    '<li class="heading">Options</li>' +
    '<li class="is-selectable"><a href="#" id="ShowLabels">Show Labels</a></li>' +
    '';

  private SUBMENU_RESPONSE_HTML =
    '' +
    '<li><a href="#" id="DrillOne">Drill Point One</a></li>' +
    '<li><a href="#" id="DrillTwo">Drill Point Two</a></li>' +
    '';

  constructor(private elementRef: ElementRef) { }

  ngOnDestroy() { }

  focus() {
    // Using jquery to focus the element as ViewChildren is not working
    // tslint:disable-next-line: deprecation
    const $event: MouseEventInit = event;
    const focusables = $(':focusable', this.elementRef.nativeElement);
    const target =
      $event && $event.shiftKey ? focusables.last() : focusables.first();
    target.trigger('focus');
  }

  toggleLabels() {
    setTimeout(() => (this.hideLabels = !this.hideLabels));
  }

  onBeforeContextMenuOpen = (
    response: AjaxBeforeOpenResponseFunction,
    options: any
  ) => {
    if (options.hasOwnProperty('contextElement')) {
      response(this.SUBMENU_RESPONSE_HTML);
      return;
    } else {
      response(this.MENU_RESPONSE_HTML);
      return;
    }
  }

  onSelected($event) {
    const buttonId = $event.args[0].id;
    if (buttonId === 'ShowLabels') {
      this.toggleLabels();
    } else {
      alert(buttonId + ' clicked');
    }
  }
}
