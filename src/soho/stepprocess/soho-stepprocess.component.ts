import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output } from '@angular/core';

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

/**************************************************************
 * SUB STEP LIST
 **************************************************************/
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
    return this.stepId ? '#' + this.stepId : null;
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
  @HostBinding('class.tree-text') treeText = true;
}

/**************************************************************
 * STEP CONTENT TITLE
 **************************************************************/
@Component({
  selector: 'div[soho-step-content-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`
})
export class SohoStepContentTitleComponent {
  @HostBinding('class.heading') isHeading = true;
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
  @HostBinding('attr.id') get idAttr() { return this.stepId; }
  @Input() stepId: string;
}

/**************************************************************
 * MAIN STEP PROCESS COMPONENT
 **************************************************************/
@Component({
  selector: 'div[soho-stepprocess]', // tslint:disable-line
  templateUrl: './soho-stepprocess.component.html',
})
export class SohoStepProcessComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.step-process-container') isStepProcessContainer = true;
  @HostBinding('class.two-column') isTwoColumn = true;
  @HostBinding('class.fixed') isFixed = true;
  @HostBinding('class.page-container') isPageContainer = true;
  @HostBinding('class.no-scroll') isNoScroll = true;
  @HostBinding('attr.role') main = 'main';

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------

  /**
   * Whether or not to restrict navigation to next and previous buttons only.
   */
  @Input() set linearProgression(linearProgression: boolean) {
    this.stepProcessOptions.linearProgression = linearProgression;
    if (this.jQueryElement) {
      this.stepprocess.settings.linearProgression = linearProgression;
    }
  }

  @Input() set nextButtonLabel(label: string) {
    if (this.jQueryElement) {
      this.jQueryElement.find('.js-step-link-next').html(label);
    }
  }

  @Input() set nextButtonEnable(enabled: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.find('.js-step-link-next').prop('disabled', !enabled);
    }
  }

  @Input() set previousButtonEnable(enabled: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.find('.js-step-link-prev').prop('disabled', !enabled);
    }
  }

  @Input() set saveCloseButtonEnable(enabled: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.find('.js-btn-save-changes').prop('disabled', !enabled);
    }
  }

  // ------------------------------------------------------------------------
  // @Outputs
  // ------------------------------------------------------------------------

  @Output() beforeSelectStep = new EventEmitter<BeforeSelectStepEvent>();
  @Output() onSaveClose: EventEmitter<SohoStepSaveCloseEvent> = new EventEmitter<SohoStepSaveCloseEvent>();

  // ------------------------------------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement: JQuery;

  // Reference to the soho stepprocess control api.
  private stepprocess: SohoStepProcessStatic;

  // The internal stepsOptions object used to construct the stepproces control
  private stepProcessOptions: SohoStepProcessOptions = {};

  // beforeStepSelect callback that is adapted to an Angular EventEmittier
  private beforeSelectStepDeferred: JQueryDeferred<boolean> = $.Deferred();

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    this.stepProcessOptions.stepList = '#step-list';
    this.stepProcessOptions.beforeSelectStep = this.beforeSelectStepPromise;

    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.stepprocess(this.stepProcessOptions);
    this.stepprocess = this.jQueryElement.data('stepprocess');
    this.jQueryElement.find('.js-btn-save-changes').
    on('click', (e: JQuery.Event) => { this.fireOnSaveClose(); });
  }

  private beforeSelectStepPromise = (args: { stepLink: JQuery, isStepping: StepDirection }): JQueryPromise<boolean> => {
    this.beforeSelectStepDeferred = $.Deferred();

    if (this.beforeSelectStep.observers.length > 0) {
      // not sure what it would mean to have a multiple observers potentially
      // calling the response function.
      if (this.beforeSelectStep.observers.length !== 1) {
        console.warn('stepprocess: only 1 observer is allowed for the beforeSelectStep event emitter');
      }

      const beforeSelectStepEvent: BeforeSelectStepEvent = {} as any;

      // ------------------------------------------------------------------------------
      // The first beforeSelectStep is called before the this.stepprocess can be set.
      // In that case there is no currentSelectedStep so getting teh currentStepId
      // can be skipped.
      // ------------------------------------------------------------------------------
      if (this.stepprocess) {
        const $selectedStep = this.stepprocess.getSelectedStep();
        beforeSelectStepEvent.currentStepId = $selectedStep.children('a').attr('href').substring(1);
      }

      if (args.stepLink) {
        beforeSelectStepEvent.targetStepId = $(args.stepLink).attr('href').substring(1);
      } else {
        beforeSelectStepEvent.targetStepId = beforeSelectStepEvent.currentStepId;
      }

      beforeSelectStepEvent.isStepping = args.isStepping;
      beforeSelectStepEvent.response = this.beforeSelectStepResponse;
      this.beforeSelectStep.emit(beforeSelectStepEvent);
    } else {
      this.beforeSelectStepDeferred.resolve(true);
    }

    return this.beforeSelectStepDeferred.promise();
  }
  private beforeSelectStepResponse = (response: BeforeSelectStepResult) => {
    if (response.overrideTargetStepId) {
      const stepLinkToSelect = $('.js-step-link[href="#' + response.overrideTargetStepId + '"]');
      this.beforeSelectStepDeferred.resolve(response.continue, stepLinkToSelect as any);
    } else {
      this.beforeSelectStepDeferred.resolve(response.continue);
    }
  }

  private fireOnSaveClose(): void {
    const $selectedStep = this.stepprocess.getSelectedStep();
    const currentStepId = $selectedStep.children('a').attr('href').substring(1);
    const event: SohoStepSaveCloseEvent = {currentStepId: currentStepId};
    this.onSaveClose.emit(event);
  }

  ngOnDestroy() {
    if (this.stepprocess) {
      this.stepprocess.destroy();
    }
  }
}
