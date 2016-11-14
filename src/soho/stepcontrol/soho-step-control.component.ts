import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

/**
 * Internal component to support the step list items
 */
@Component({
  selector: 'div[soho-steps-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepsListComponent {
  @HostBinding('class.accordion') get isAccordion() { return true; }
  @HostBinding('class.panel') get isPanel() { return true; }
  @HostBinding('class.step-process-accordion') get isStepProcessAccordion() { return true; }
  @HostBinding('class.js-step-links-scroll') get isJsStepLinksScroll() { return true; }
  @HostBinding('attr.data-init') get isDataInit() { return false; }

  constructor() {
  }
}

/**
 * Internal component to support the step list title
 */
@Component({
  selector: 'div[soho-steps-list-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepsListTitleComponent {
  @HostBinding('class.title') get isTitle() { return true; }
  @HostBinding('class.title-wide') get isTitleWide() { return true; }

  constructor() {
  }
}

/**
 * Internal component to support the tab list content
 */
@Component({
  selector: 'div[soho-step-content]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoStepsContentComponent {
  @HostBinding('class.scrollable') get isScrollable() { return true; }
  @HostBinding('class.step-panels') get iStepPanels() { return true; }
  @HostBinding('class.js-step-panels-scroll') get isJsStepPanelsScroll() { return true; }
}

/**
 * Internal component to support the tab list content
 */
@Component({
  selector: 'div[soho-step-content-panel]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoStepsContentPanelComponent {
  @HostBinding('class.js-step-process-panel') get isJsStepProcessPanel() { return true; }
  @HostBinding('attr.id') get idAttr() { return this.stepId; };
  @Input() stepId: string;
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'div[soho-step-content-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepContentTitleComponent {

  constructor() {
  }
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'div[soho-step-list-items]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        margin-left: 20px;
      }
    `   // indent the substep nodes
  ]
})
export class SohoStepListItemsComponent {

  constructor() {
  }
  @HostBinding('class.accordion-pane') get isAccordionPane() { return true; }
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'div[soho-step-list-item]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host >>> a {
        margin-left:-40px;
      }
    `   // this is used to fix an issue caused by an unexpected element between the accordion element and the alert Icon
  ]
})
export class SohoStepListItemComponent {

  constructor() {
  }
  @HostBinding('class.step-process-item') get isStepProcessItem() { return true; };
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'a[soho-step-list-item-anchor]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemAnchorComponent {
  @HostBinding('class.js-step-link') get isJsStepLink() { return true; };
  @HostBinding('attr.href') get hrefAttr() { return '#' + this.stepId; };
  @Input() stepId: string;
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'div[soho-step-list-item-header]', // tslint:disable-line
  template: `<ng-content></ng-content>
            <button class="btn hide-focus" type="button">
              <svg class="chevron icon active" focusable="false" aria-hidden="true" role="presentation">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-caret-down"></use>
              </svg>
            </button>
          `,
  styleUrls: [ 'soho-step-control.component.css' ]
})
export class SohoStepListItemHeaderComponent {

  @HostBinding('class.accordion-header') get isAccordionHeader() { return true; }
  @Input() icon: string;
}

/**
 * main tab component
 */

@Component({
  selector: 'div[soho-step]', // tslint:disable-line
  templateUrl: './soho-step-control.component.html',
})
export class SohoStepControlComponent implements AfterViewInit, OnDestroy {

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeStepChange event is fired whenever a step is clicked giving the event handler a chance
   * to "veto" the step changed.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeStepChange: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * The activated event is fired whenever a step is changed;
   * @type {EventEmitter<Object>}
   */
  @Output() afterStepChange: EventEmitter<Object> = new EventEmitter<Object>();

  // Reference to the jQuery control.
  private jQueryElement: JQuery;
  // Reference to the soho tabs control api.
  private stepContol: SohoStepsStatic;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.find('.soho-step-process').stepprocess({
      beforeStepChange: () => {
        let stepSelected = {};
        this.beforeStepChange.emit(stepSelected);
      },
      afterStepChange: () => {
        let stepSelected = {};
        this.afterStepChange.emit(stepSelected);
      }
    });

    this.stepContol = this.jQueryElement.find('.soho-step-process').data('stepprocess');
  }

  ngOnDestroy() {
  }
}
