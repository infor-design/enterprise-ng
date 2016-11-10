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

  constructor() {
  }
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
  styles: [
    `
      :host >>> soho-icon {
        display: inline-block;
      }
      
      :host >>> soho-icon + a{
        width:calc(100% - 75px) !important;
      }
    `       // this is used to fix an issue caused by an unexpected element between the accordion element and the alert Icon
  ]
})
export class SohoStepListItemHeaderComponent {

  constructor() {
  }
  @HostBinding('class.accordion-header') get isAccordionHeader() { return true; }
  @Input() icon: string;
}

/**
 * Internal component to support the svg icons
 */
@Component({
  selector: 'svg[soho-step-icon]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepIconComponent {
  @HostBinding('class.icon') get isIcon() { return true };
  @HostBinding('class.icon-error') get isError() { return this.icon === "error" };
  @HostBinding('class.icon-confirm') get isConfirm() { return this.icon === "confirm" };

  @Input() icon: string;

  constructor() {
  }
}

/**
 * Internal component to support the use tag
 */
@Component({
  selector: 'use[soho-step-icon-use]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepIconUseComponent {
  @HostBinding('attr.xlink:href') get href() { return this.getHref() };

  @Input() icon: string;
  constructor() {
  }

  getHref() {
    if (this.icon === "error") {
      return "#icon-error";
    } else if (this.icon === "confirm") {
      return "#icon-confirm";
    } else if (this.icon === "half") {
      return "#icon-half-empty-circle";
    } else if (this.icon === "bullet") {
      return "#icon-bullet-steps";
    }
  }
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
  @Output() beforestepchange: EventEmitter<Object> = new EventEmitter<Object>();

  /**
   * The activated event is fired whenever a step is changed;
   * @type {EventEmitter<Object>}
   */
  @Output() afterstepchange: EventEmitter<Object> = new EventEmitter<Object>();

  // Reference to the jQuery control.
  private jQueryElement: any;
  // Reference to the soho tabs control api.
  private stepContol: any;

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    let self = this;
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    //$('.soho-step-process')
    this.jQueryElement.find('.soho-step-process').stepprocess(
      {
      beforeStepChange: function() {
        let stepSelected = {};
        self.beforestepchange.emit(stepSelected);
        return true;  // to allow step to change
      },
      afterStepChange: function() {
        let stepSelected = {};
        self.afterstepchange.emit(stepSelected);
      }
    });

    this.stepContol = this.jQueryElement.data('step-contol');
  }

  ngOnDestroy() {
  }

  formatNow(): string {
    var d = new Date();
    var hr: number = d.getHours();
    let min: number = d.getMinutes();
    let minStr: string = "";
    if (min < 10) {
      minStr = "0" + min;
    }
    let ampm: string = 'am';
    if (hr > 12) {
      ampm = 'pm';
      hr -= 12;
    }
    return hr + ":" + min + ampm;
  }
}
