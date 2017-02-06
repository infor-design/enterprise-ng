import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy, EventEmitter, Output,
} from '@angular/core';
import { ArgumentHelper } from '../utils';
import { SohoBusyIndicatorDirective } from '@infor/sohoxi-angular';

/**
 * Internal component to support the step list items
 */
@Component({
  selector: 'ul[soho-steps-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepsListComponent {
  @HostBinding('attr.id') get Id() { return 'json-tree'; }
  @HostBinding('class.tree') get isTree() { return true; }
  @HostBinding('class.js-step-tree-scroll') get isJsStepTreeScroll() { return true; }
  @HostBinding('attr.role') get role() { return 'tree'; }
  @HostBinding('attr.data-init') get isDataInit() { return false; }
  @HostBinding('attr.aria-label') get ariaLabel() { return 'Asset Types'; }

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
  @HostBinding('class.step-container') get iStepContainer() { return true; }
  @HostBinding('class.js-step-container-scroll') get isJsStepPanelsScroll() { return true; }
}

/**
 * Internal component to support the tab list content
 */
@Component({
  selector: 'div[soho-step-content-panel]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoStepsContentPanelComponent {
  @HostBinding('class.js-step-panel') get isJsStepProcessPanel() { return true; }
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
  selector: 'ul[soho-step-list-items]', // tslint:disable-line
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
  @HostBinding('class.root') get isRoot() { return true; }
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'li[soho-step-list-item]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemComponent {

  constructor() {}
//  @HostBinding('class.step-process-item') get isStepProcessItem() { return true; };
}

/**
 * Internal component to support the step title
 */
@Component({
  selector: 'span[soho-step-item-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepItemTitleComponent {

  constructor() {}
  @HostBinding('class.tree-text') get isTreeText() { return true; };
}

/**
 * Internal component to support the step content title
 */
@Component({
  selector: 'a[soho-step-list-item-anchor]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemAnchorComponent {
//  @HostBinding('class.js-step-link') get isJsStepLink() { return true; };
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
            `
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
  templateUrl: './soho-stepprocess.component.html',
})
export class SohoStepProcessComponent implements AfterViewInit, OnDestroy {

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * Set the step process options on a single call with the stepprocess options object.
   *
   * @param gridOptions.
   */
  @Input() set stepProcessOptions(stepProcessOptions: SohoStepProcessOptions) {
    ArgumentHelper.checkNotNull('stepProcessOptions', stepProcessOptions);
    this._stepProcessOptions = stepProcessOptions;
    if (this.jQueryElement) {
      this.updated();
    }
  }

  /** The selector for elements that are step panels. default is '.js-step-process-panel' */
  @Input() set stepPanels(stepPanels: string) {
    this._stepProcessOptions.stepPanels = stepPanels;
    if (this.jQueryElement) {
      this.stepprocess.settings.stepPanels = stepPanels;
      this.updated();
    }
  }

  /** The selector for elements that are step links. default is '.js-step-link' */
  @Input() set stepLinks(stepLinks: string) {
    this._stepProcessOptions.stepLinks = stepLinks;
    if (this.jQueryElement) {
      this.stepprocess.settings.stepLinks = stepLinks;
      this.updated();
    }
  }

  /** The selector of the previous step action element. default is '.js-step-link-prev' */
  @Input() set btnStepPrev(btnStepPrev: string) {
    this._stepProcessOptions.btnStepPrev = btnStepPrev;
    if (this.jQueryElement) {
      this.stepprocess.settings.btnStepPrev = btnStepPrev;
      this.updated();
    }
  }

  /** The selector of the next step action element. default is '.js-step-link-next' */
  @Input() set btnStepNext(btnStepNext: string) {
    this._stepProcessOptions.btnStepNext = btnStepNext;
    if (this.jQueryElement) {
      this.stepprocess.settings.btnStepNext = btnStepNext;
      this.updated();
    }
  }

  /** The selector of the element to toggle the steps list. default is '.js-toggle-steps' */
  @Input() set btnToggleStepLinks(btnToggleStepLinks: string) {
    this._stepProcessOptions.btnToggleStepLinks = btnToggleStepLinks;
    if (this.jQueryElement) {
      this.stepprocess.settings.btnToggleStepLinks = btnToggleStepLinks;
      this.updated();
    }
  }

    // The eventing for the stepProcess control is not working yet!!
  // /** The callback function called before the step selection changes */
  // @Input() set beforeStepChange(beforeStepChange: BeforeStepChangeFunction) {
  //   this._stepProcessOptions.beforeStepChange = beforeStepChange;
  //   if (this.jQueryElement) {
  //     this.stepprocess.settings.beforeStepChange = beforeStepChange;
  //     this.updated();
  //   }
  // }

  /** The callback function called after the step selection changes */
  @Input() set afterStepChange(afterStepChange: AfterStepChangeFunction) {
    this._stepProcessOptions.afterStepChange = afterStepChange;
    if (this.jQueryElement) {
      this.stepprocess.settings.afterStepChange = afterStepChange;
      this.updated();
    }
  }

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  /**
   * The beforeactivate event is fired whenever a tab is selected giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeStepChange = new EventEmitter<Object>();


  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the soho tabs control api.
  private stepprocess: SohoStepProcessStatic;

  // An internal stepsOptions object that gets updated by using
  // the component's Inputs()
  private _stepProcessOptions: SohoStepProcessOptions = <SohoStepProcessOptions> {};

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);
    const $stepProcess: JQuery = this.jQueryElement.find('.soho-step-process');

    $stepProcess.stepprocess(this._stepProcessOptions);
    this.stepprocess = $stepProcess.data('stepprocess');

    // The eventing for the stepProcess soho jquery control is not finished yet. This is not how the final version will work.
    this.stepprocess.theTreeApi.element
    .on('selected', (() => {
      this.beforeStepChange.emit();
    }));
  }

  public getSelectedStepRef(): string {
    const selectedNode: any = this.jQueryElement.find('li[soho-step-list-item] .is-selected').attr('href');
    return selectedNode.substring(1);
  }

  changeSelectedStep(stepLink: HTMLLinkElement): void {
    this.stepprocess.changeSelectedStep(stepLink);
  }

  ngOnDestroy() {
    // todo: need soho stepprocess control to implement destroy function
    // if (this.stepprocess) {
    //   this.stepprocess.destroy();
    // }
  }

  /**
   * Causes the stepprocess component view to be rebuilt
   */
  public updated(): void {
    // todo: need soho stepprocess control implement updated() function .
    // this.stepprocess.updated();
  }
}
