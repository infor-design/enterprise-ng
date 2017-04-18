
import { Component, ElementRef, HostBinding, Input  } from '@angular/core';

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-HEADING
 */
@Component({
  selector: 'li[soho-popupmenu-heading]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuHeadingComponent {
  @HostBinding('class.heading') get isHeading() { return true; }
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-SEPARATOR
 */
@Component({
  selector: 'li[soho-popupmenu-separator]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() { return true; }
  @HostBinding('class.single-selectable-section') @Input() singleSelectableSection = false;
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-LABEL
 */
@Component({
  selector: 'a[soho-popupmenu-label]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuItemLabelComponent {
  @HostBinding('attr.disabled') get propDisabled() { return this.isDisabled === true ? '' : null; }

  @HostBinding('attr.href') get hrefAttr() {
    if (this.menuId) {
      return '#' + this.menuId;
    }

    if (this.menuUrl) {
      return this.menuUrl;
    }

    return '#';
  }

  @Input() menuId: string;
  @Input() menuUrl: string;
  @Input() isDisabled = false;
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-ITEM
 */
@Component({
  selector: 'li[soho-popupmenu-item]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuItemComponent {
  @HostBinding('class.is-checked') @Input() isChecked: boolean;
  @HostBinding('class.is-selectable') @Input() isSelectable = false;
}

/**
 * MAIN COMPONENT: SOHO-MENUPOPUPMENU
 */
@Component({
  selector: 'ul[soho-popupmenu]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuComponent {
  @HostBinding('class.popupmenu') popupmenu = true;

  constructor(private element: ElementRef) {}
}
