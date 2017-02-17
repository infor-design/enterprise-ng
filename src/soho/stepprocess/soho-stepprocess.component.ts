import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ArgumentHelper } from '../utils';

/**************************************************************
 * STEP LIST TITLE
 **************************************************************/
@Component({
  selector: 'div[soho-step-list-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListTitleComponent {
  @HostBinding('class.title') get title() { return true; }
  @HostBinding('class.title-wide') get titleWide() { return true; }
  // @HostBinding('class.dual-title') @Input() dualTitle: boolean = false;
}

/**************************************************************
 * STEP LIST
 **************************************************************/
@Component({
  selector: 'ul[soho-step-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListComponent {
  @HostBinding('class.tree') isTree = true;
  @HostBinding('class.js-step-list-scroll') isJSStepTreeScroll = true;

  // -----------------------------------------------------------------
  // required by stepcontrol. make sure this id and the one passed
  // into the stepcontrol settings match.
  // -----------------------------------------------------------------
  @HostBinding('attr.id') id = 'step-list';

  // -----------------------------------------------------------------
  // disallow jquery.initialize() from initializing this as a tree
  // control. Needed due to desire for tree styles but not an actual
  // tree itself.
  // -----------------------------------------------------------------
  @HostBinding('attr.data-init') dataInit = false;
}

@Component({
  selector: 'ul[soho-substep-list]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoSubstepListComponent {
  @HostBinding('class.folder') isFolder = true;
  @HostBinding('class.js-step-folder') isJSStepFolder = true;
}


/**************************************************************
 * STEP LIST ITEM
 **************************************************************/
@Component({
  selector: 'li[soho-step-list-item]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemComponent {
  @HostBinding('class.js-step') get jsStep() { return true; }
  @HostBinding('class.is-selected') @Input() isSelected = false;
}

/**************************************************************
 * STEP LIST ITEM ANCHOR
 **************************************************************/
@Component({
  selector: 'a[soho-step-list-item-anchor]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemAnchorComponent {
  @HostBinding('class.js-step-link') isJsStepLink = true;
  @HostBinding('attr.href') get hrefAttr() {
    return '#' + this.stepId;
  }

  @Input() stepId: string;
}

/**************************************************************
 * STEP LIST ITEM TITLE
 **************************************************************/
@Component({
  selector: 'span[soho-step-list-item-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepListItemTitleComponent {
  @HostBinding('class.tree-text') treeText: boolean = true;
}

/**************************************************************
 * STEP CONTENT TITLE
 **************************************************************/
@Component({
  selector: 'div[soho-step-content-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepContentTitleComponent {
  @HostBinding('class.dual-title') @Input() dualTitle: boolean = false;
}

/**************************************************************
 * STEP CONTENT
 **************************************************************/
@Component({
  selector: 'div[soho-step-content]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoStepContentComponent {
  @HostBinding('class.scrollable') get isScrollable() { return true; }
  @HostBinding('class.step-container') get iStepContainer() { return true; }
  @HostBinding('class.js-step-container-scroll') get isJsStepPanelsScroll() { return true; }
}

/**************************************************************
 * STEP CONTENT PANEL
 **************************************************************/
@Component({
  selector: 'div[soho-step-content-panel]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
})
export class SohoStepContentPanelComponent {
  @HostBinding('class.js-step-panel') get isJsStepProcessPanel() { return true; }
  @HostBinding('attr.id') get idAttr() { return this.stepId; };
  @Input() stepId: string;
}

/**
 * Internal component to support the step content title
 * @deprecated - use soho-step-list-item isFolder=true
 */
// @Component({
//   selector: 'ul[soho-step-list-items]', // tslint:disable-line
//   template: `<ng-content></ng-content>`,
//   styles: [ `:host { margin-left: 20px;}` ]   // indent the substep nodes
// })
// export class SohoStepListItemsComponent {
//   @HostBinding('class.root') get isRoot() { return true; }
// }

/**
 * Internal component to support the step content title
 * @deprecated - use soho-step-list-item isFolder=true
 */
// @Component({
//   selector: 'div[soho-step-list-item-header]', // tslint:disable-line
//   template: `
//     <ng-content></ng-content>
//       <button class="btn hide-focus" type="button">
//         <svg class="chevron icon active" focusable="false" aria-hidden="true" role="presentation">
//           <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-caret-down"></use>
//         </svg>
//       </button>
//     `
// })
// export class SohoStepListItemHeaderComponent {
//
//   @HostBinding('class.accordion-header') get isAccordionHeader() { return true; }
//   @Input() icon: string;
// }

/**************************************************************
 * MAIN STEP PROCESS COMPONENT
 **************************************************************/
@Component({
  selector: 'div[soho-step]', // tslint:disable-line
  templateUrl: './soho-stepprocess.component.html',
})
export class SohoStepProcessComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.step-process-container') isStepProcessContainer = true;
  @HostBinding('class.two-column') isTwoColumn = true;
  @HostBinding('class.fixed') isFixed= true;
  @HostBinding('class.page-container') isPageContainer = true;
  @HostBinding('class.no-scroll') isNoScroll = true;
  @HostBinding('class.show-main') isShowMain = true;

  @HostBinding('attr.role') main: string = 'main';

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
  }

  get stepProcessOptions(): SohoStepProcessOptions {
    return this._stepProcessOptions;
  }

  @Input() set beforeStepChange(beforeSelectStep: BeforeSelectStepFunction) {
    this._stepProcessOptions.beforeSelectStep = beforeSelectStep;
    if (this.jQueryElement) {
      this.stepprocess.settings.beforeSelectStep = beforeSelectStep;
    }
  }

  /**
   *
   * @param cellNavigation
   */
  @Input() set linearProgression(linearProgression: boolean) {
    this._stepProcessOptions.linearProgression = linearProgression;
    if (this.jQueryElement) {
      this.stepprocess.settings.linearProgression = linearProgression;
    }
  }

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the soho tabs control api.
  private stepprocess: SohoStepProcessStatic;

  // An internal stepsOptions object that gets updated by using
  // the component's Inputs()
  private _stepProcessOptions: SohoStepProcessOptions = <SohoStepProcessOptions> {};

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this._stepProcessOptions.stepList = '#step-list';
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.stepprocess(this.stepProcessOptions);
    this.stepprocess = this.jQueryElement.data('stepprocess');
  }

  ngOnDestroy() {
    if (this.stepprocess) {
      this.stepprocess.destroy();
    }
  }
}
