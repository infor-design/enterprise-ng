/// <reference path="soho-modal-dialog.d.ts" />

import { ComponentRef, NgZone, ApplicationRef, ComponentFactoryResolver, Injector, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ComponentType } from '.';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Wrapper for the jQuery modal control.
 *
 */
export class SohoModalDialogRef<T> {
  /** Component - if the content is derived from an existing component. */
  private componentRef?: ComponentRef<T>;

  /** Vetoable Event Guard */
  // tslint:disable-next-line: deprecation
  private eventGuard: SohoModalDialogVetoableEventGuard<T> = {};

  /**
   * Closes the modal dialogs if router navigation is detected, this prevents diaslogs from being
   * left open when navigating.
   */
  private _closeOnNavigation = true;

  /** Selector referencing the modal-dialog after it has been moved to the dialog container. */
  private jQueryElement: JQuery;

  /** Soho Control Api */
  private modal: SohoModalStatic;

  /** The result of the dialog. */
  private _dialogResult: any;

  /** Event fired when the modal is opened. */
  private open$: Subject<any> = new Subject();

  /** Event fired when the modal is closed. */
  private close$: Subject<any> = new Subject();

  /** Event fired after closing the modal. */
  private afterClose$: Subject<any> = new Subject();

  /** Event fired after openning the modal dialog. */
  private afterOpen$: Subject<any> = new Subject();

  /** Handle resource tidy up of this class. */
  private destroyed$ = new Subject();

  /**
   * The component displayed inside the modal frame, if specified.  This may
   * be null if the dialog is built from an HTML fragment or a jQuery selector.
   *
   * @returns the contained component dialog.
   */
  public get componentDialog(): T {
    if (this.componentRef) {
      return this.componentRef.instance;
    }
    return null;
  }

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  /**
   * Cached options.
   */
  private _options: SohoModalOptions = {};

  /**
   * Sets the whole options block for this modal dialog.
   *
   * @param options - the options to set.
   */
  options(options: SohoModalOptions): SohoModalDialogRef<T> {
    this._options = options;

    // @todo update the dialog if required.
    if (this.modal) {
      this.modal.settings = options;
      // @todo - need an api on modal to update settings.
    }

    return this;
  }

  /**
   * Sets the frame height for the dialog.
   * @param frameHeight - the extra frame height to allow.
   */
  frameHeight(frameHeight: number): SohoModalDialogRef<T> {
    this._options.frameHeight = frameHeight;
    if (this.modal) {
      this.modal.settings.frameHeight = frameHeight;
    }
    return this;
  }

  /**
   * Sets the frame width for the dialog.
   * @param frameWidth - the extra frame width to allow.
   */
  frameWidth(frameWidth: number): SohoModalDialogRef<T> {
    this._options.frameWidth = frameWidth;
    if (this.modal) {
      this.modal.settings.frameWidth = frameWidth;
    }
    return this;
  }

  /**
   * A call back function that can be used to return data for the modal. This is the callback form of the before show event.
   * @param beforeShow - The callback function
   */
  beforeShow(beforeShow: any): SohoModalDialogRef<T> {
    this._options.beforeShow = beforeShow;
    if (this.modal) {
      this.modal.settings.beforeShow = beforeShow;
    }
    return this;
  }

  /**
   * If true, show a close icon button on the top right of the modal.
   * @param showCloseBtn - if true the x will be shown.
   */
  showCloseBtn(showCloseBtn: boolean): SohoModalDialogRef<T> {
    this._options.showCloseBtn = showCloseBtn;
    if (this.modal) {
      this.modal.settings.showCloseBtn = showCloseBtn;
    }
    return this;
  }

  /**
   * Optional max width to add in pixels.
   * @param maxWidth - The width in pixels
   */
  maxWidth(maxWidth: number): SohoModalDialogRef<T> {
    this.modal.settings.maxWidth = maxWidth;
    if (this.modal) {
      this.modal.settings.maxWidth = maxWidth;
    }
    return this;
  }

  /**
   * Sets the title of the modal dialog.
   *
   * @param title - the title of the dialog.
   */
  title(title: string): SohoModalDialogRef<T> {
    this._options.title = title;
    if (this.modal) {
      this.modal.settings.title = title;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the buttons to use on the modal dialog.
   *
   * @param buttons - list of buttons to display
   */
  buttons(buttons: SohoModalButton[]): SohoModalDialogRef<T> {
    this._options.buttons = buttons;
    if (this.modal) {
      this.modal.settings.buttons = buttons;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'id' that the modal control uses.
   *
   * @param id - the id.
   */
  id(id: string): SohoModalDialogRef<T> {
    this._options.id = id;
    if (this.modal) {
      this.modal.settings.id = id;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'trigger' that the modal control uses.
   *
   * @param trigger - when to open the dialog.
   */
  trigger(trigger: SohoModalTriggerType): SohoModalDialogRef<T> {
    this._options.trigger = trigger;
    if (this.modal) {
      this.modal.settings.trigger = trigger;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'isAlert' that the modal control uses.
   *
   * @param isAlert - true if this dialog is to be styled an an alert.
   */
  isAlert(isAlert: boolean): SohoModalDialogRef<T> {
    this._options.isAlert = isAlert;
    if (this.modal) {
      this.modal.settings.isAlert = isAlert;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the fullsize configuration that the modal control uses.
   * @param fullsize - The full size configuration to use.
   */
  fullsize(fullsize: SohoModalFullSize): SohoModalDialogRef<T> {
    this._options.fullsize = fullsize;
    if (this.modal) {
      this.modal.settings.fullsize = fullsize;
    }
    return this;
  }

  /**
   * Sets the breakpoint configuration that the modal control uses in full size mode(s).
   * @param breakpoint - The full size configuration to use.
   */
  breakpoint(breakpoint: SohoModalBreakPoint): SohoModalDialogRef<T> {
    this._options.breakpoint = breakpoint;
    if (this.modal) {
      this.modal.settings.breakpoint = breakpoint;
    }
    return this;
  }

  /**
   * Controls the opacity of the background overlay.
   * @param overlayOpacity - The percent between 0 and 1 of opacity to use.
   */
  overlayOpacity(overlayOpacity: number): SohoModalDialogRef<T> {
    this._options.overlayOpacity = overlayOpacity;
    if (this.modal) {
      this.modal.settings.overlayOpacity = overlayOpacity;
    }
    return this;
  }

  /**
   * If true, causes the modal's trigger element not to become focused once the modal is closed.
   * @param noRefocus - If true, refocus
   */
  noRefocus(noRefocus: boolean): SohoModalDialogRef<T> {
    this._options.noRefocus = noRefocus;
    if (this.modal) {
      this.modal.settings.noRefocus = noRefocus;
    }
    return this;
  }

  /**
   * The modal's trigger element to keep refocused once the modal is closed. This can be html or jquery object or query selector as string.
   * @param triggerButton - The element (for example a button) to refocus on close.
   */
  triggerButton(triggerButton: boolean): SohoModalDialogRef<T> {
    this._options.triggerButton = triggerButton;
    if (this.modal) {
      this.modal.settings.triggerButton = triggerButton;
    }
    return this;
  }

  /**
   * Sets the 'content' that the modal control uses.
   *
   * @param content - a selector or string representing the dialog content.
   */
  content(content: JQuery | string): SohoModalDialogRef<T> {
    this._options.content = content;
    if (this.modal) {
      this.modal.settings.content = content;
      // @todo - need an api on modal to update content.
    }
    return this;
  }

  /**
   * Sets the 'cssClass' of the modal control.
   */
  cssClass(cssClass: string): SohoModalDialogRef<T> {
    this._options.cssClass = cssClass;
    if (this.modal) {
      this.modal.settings.cssClass = cssClass;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'autoFocus' of the modal control.
   *
   * @param autoFocus -if true; the dialog will autoFocus.
   */
  autoFocus(autoFocus: boolean): SohoModalDialogRef<T> {
    this._options.autoFocus = autoFocus;
    if (this.modal) {
      this.modal.settings.autoFocus = autoFocus;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Applies a function to the instantiated component,
   * allowing the component to be modified, or initialised.
   *
   * The function is provided with a typed value for the
   * instance.
   *
   * @param component - the instantated instance.
   * @return the dialog ref for onward assignment.
   */
  apply(fn: (component: T) => void): SohoModalDialogRef<T> {
    if (fn && this.componentRef.instance) {
      fn(this.componentRef.instance);
    }
    return this;
  }

  /**
   * When set to true, this dialog is closed when navigation is detected.
   *
   * @param closeOnNavigation controls the close behaviour when navigating.
   * @return the dialog ref for support a fluent api.
   */
  closeOnNavigation(closeOnNavigation: boolean): SohoModalDialogRef<T> {
    this._closeOnNavigation = closeOnNavigation;
    return this;
  }

  /**
    * Dialog result property.
    *
    * @param dialogResult - the stored restult of the dialog.
    */
  set dialogResult(dialogResult: any) {
    this._dialogResult = dialogResult;
  }
  get dialogResult(): any {
    return this._dialogResult;
  }

  /**
   * Constructor.
   *
   * @paran appRef - application reference used to insert the component.
   */
  constructor(
    router: Router,
    private appRef: ApplicationRef,
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private ngZone: NgZone,
    settings: SohoModalOptions,
    modalComponent?: ComponentType<T>) {
    this.options(settings);

    if (modalComponent) {

      // Create component
      this.componentRef = componentFactoryResolver
        .resolveComponentFactory(modalComponent)
        .create(this.injector);

      appRef.attachView(this.componentRef.hostView);

      // Handle angular closing the component by closing the corresponding dialog.
      this.componentRef.onDestroy(() => {
        // Disable the beforeClose veto capability when navigating.
        this.eventGuard.beforeClose = null;
        this.close();
      });

      // Initialise the event guart
      this.eventGuard = this.componentRef.instance;

      this._options.content = jQuery(this.componentRef.location.nativeElement);
    }

    // Add a subscription to the router to remove
    // the dialog when the user navigates.
    router.events
      .pipe(takeUntil(this.destroyed$))
      .subscribe(e => {
        if (this._closeOnNavigation && e instanceof NavigationEnd) {
          // Disable the beforeClose veto capability when navigating.
          this.eventGuard.beforeClose = null;
          if (this.modal) {
            this.modal.close(true);
          }
          if (this.componentRef) {
            this.componentRef.destroy();
          }
        }
      });
  }

  /**
   * Opens the dialog.
   *
   * @return the dialog ref.
   */
  open(): SohoModalDialogRef<T> {
    if (this.modal) {
      this.modal.open();
      return this;
    }

    if (!this.componentRef && !this._options.content) {
      throw Error('componentRef or content must be initialised.');
    }

    this.jQueryElement = this.ngZone.runOutsideAngular(() => {
      const element = jQuery('body');
      element.modal(this._options);

      this.modal = element.data('modal');
      return this.modal.element;
    });

    // Add listeners to control events
    this.jQueryElement.on('close', ((event: any, isCancelled: boolean) => this.ngZone.run(() => this.onClose(event, isCancelled))));
    this.jQueryElement.on('afterclose', ((event: any) => this.ngZone.run(() => this.onAfterClose(event))));
    this.jQueryElement.on('open', ((event: any) => this.ngZone.run(() => this.onOpen(event))));
    this.jQueryElement.on('afteropen', ((event: any) => this.ngZone.run(() => this.onAfterOpen(event))));

    // These are vetoable events.
    this.jQueryElement.on('beforeopen', ((event: any) => this.ngZone.run(() => this.onBeforeOpen(event))));
    this.jQueryElement.on('beforeclose', ((event: any) => this.ngZone.run(() => this.onBeforeClose(event))));
    this.jQueryElement.on('beforedestroy', ((event: any) => this.ngZone.run(() => this.onBeforeDestroy(event))));

    return this;
  }

  /**
   * Closes the modal dialog, if open.  The dialog is not closed
   * fully until the 'afterClosed' event is fired.
   *
   * @param dialogResult - optional result - passed back to the caller.
   */
  close(dialogResult?: any): SohoModalDialogRef<T> {
    this.dialogResult = dialogResult;
    if (this.modal) {
      this.ngZone.runOutsideAngular(() => this.modal.close());
    }
    return this;
  }

  // ------------------------------------------
  // Events
  // ------------------------------------------

  /**
   * Registers a before open guard.
   *
   * SOHO-4892 - Returning false from beforeOpen or beforeDestroy breaks dialogs
   *
   * @param eventFn - the function to call before openning the dialog.
   */
  beforeOpen(eventFn: () => boolean): SohoModalDialogRef<T> {
    this.eventGuard.beforeOpen = eventFn;
    return this;
  }

  /**
   * Opened Event.
   *
   * This event is fired when the dialog is being opened.
   *
   * @param eventFn - the function to invoke when the dialog is to be opened.
   */
  opened(eventFn: Function): SohoModalDialogRef<T> {
    this.open$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * Opened Event.
   *
   * This event is fired after the dialog has been opened.
   *
   * @param eventFn - the function to invoke when the dialog is to be opened.
   */
  afterOpen(eventFn: Function): SohoModalDialogRef<T> {
    this.afterOpen$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * Registers a before close guard.
   *
   * @param eventFn - the function to call before closing the dialog.
   */
  beforeClose(eventFn: SohoModalDialogEventVetoFunction<T>): SohoModalDialogRef<T> {
    this.eventGuard.beforeClose = eventFn;
    return this;
  }

  /**
   * Closed Event.
   *
   * This event is fired when the dialog is being closed.
   *
   * @param eventFn - the function to invoke when the dialog is to be closed.
   */
  closed(eventFn: SohoModalDialogEventFunction<T>): SohoModalDialogRef<T> {
    this.close$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => { eventFn(f, this, this.componentDialog); });
    return this;
  }

  /**
   * After Closed Event.
   *
   * This event is fired, with the result of the dialog, when the dialog has been
   * closed and destroyed.
   *
   * @param eventFn - the function to invoke after the dialog has been closed.
   */
  afterClose(eventFn: SohoModalDialogEventFunction<T>): SohoModalDialogRef<T> {
    this.afterClose$.pipe(takeUntil(this.destroyed$)).subscribe((result: any) => { eventFn(result, this, this.componentDialog); });
    return this;
  }

  /**
   * Registers a before destroy guard.
   *
   * SOHO-4892 - Returning false from beforeOpen or beforeDestroy breaks dialogs
   *
   * @param eventFn - the function to call before destroying the dialog.
   */
  beforeDestroy(eventFn: () => boolean): SohoModalDialogRef<T> {
    this.eventGuard.beforeDestroy = eventFn;
    return this;
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handles the 'afterOpen' event, fired after the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   */
  private onAfterOpen(event: any) {
    this.afterOpen$.next(event);
  }

  /**
   * Handles the 'beforeOpen' event, fired before the modal dialog
   * has been opened.
   *
   * @param event - full event object.
   *
   * @return true if the dialog can be opened; otherwise false if veoted.
   */
  private onBeforeOpen(event: any): boolean {
    const fn: Function = this.eventGuard.beforeOpen;
    return fn ? fn.call(this.eventGuard) : true;
  }

  /**
   * Handles the 'beforeClose' event, fired before the modal dialog
   * has been destroyed.
   *
   * @param event - event object.
   * @return true if the dialog can be closed; otherwise false if veoted.
   */
  private onBeforeClose(event: any): boolean {
    const fn: Function = this.eventGuard.beforeClose;
    this.eventGuard.isCancelled = this.modal.isCancelled;

    return fn ? fn.call(this.eventGuard, this) : true;
  }

  /**
   * Handles the 'beforeDestroy' event, fired before the modal dialog
   * has been destroyed.
   *
   * @param event - event object.
   * @return true if the dialog can be destroyed; otherwise false if veoted.
   */
  private onBeforeDestroy(_: any): boolean {
    const fn: Function = this.eventGuard.beforeDestroy;
    const allow = fn ? fn.call(this.eventGuard) : true;

    if (allow) {
      // Remove all events.
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }

      this.ngZone.run(() => {
        if (this.componentRef) {
          this.appRef.detachView(this.componentRef.hostView);
          this.componentRef.destroy();
          this.componentRef = null;
        }

        // Tidy up all subscriptions.
        this.destroyed$.next();
        this.destroyed$.complete();

        // Clean up references
        this.eventGuard = null;
      });
    }
    return allow;
  }

  /**
   * Handles the 'open' event, fired just before
   * the focus is assigned to a modal.
   *
   * @param event - full event object.
   */
  private onOpen(event: any) {
    this.open$.next(event);
  }

  /**
   * Handles the close event.
   *
   * @param event - full event object.
   * @param isCancelled - is true if the cancel button was pressed; otherwise false.
   */
  private onClose(event: any, isCancelled: boolean) {
    this.close$.next(isCancelled);
  }

  /**
   * Handles the 'afterClose' event, fired when the dialog
   * has been closed and tidy up is required.
   *
   * @param event - full event object.
   */
  private onAfterClose(event: any) {
    // Pass the dialog result back.
    this.afterClose$.next(this.dialogResult);
    this.afterClose$.complete();

    this.ngZone.runOutsideAngular(() => {
      // must destroy before turning off jquery events. modal.destroy relies on
      // the onBeforeDestroy event.
      this.modal.destroy();
      this.modal = null;
    });
  }
}

/**
 * Close/AfterClose event handler.
 *
 * @param result - the dialog result (if set); may be undefined.
 * @param dialogRef - the dialog reference (or wrapper); never null.
 * @param dialogComponent - the component hosted in the modal; may be undefined.
 */
export type SohoModalDialogEventFunction<T> = (result: any, dialogRef: SohoModalDialogRef<T>, dialogComponent: T) => void;

/**
 * BeforeClose event handler.
 *
 * @param dialogRef - the dialog reference; never null.
 */
export type SohoModalDialogEventVetoFunction<T> = (dialogRef: SohoModalDialogRef<T>) => boolean;

/**
 * Contract for all SohoModalDialogComponents.
 */
// tslint:disable-next-line:no-empty-interface
export interface SohoModalComponent<T> {
}

/**
 * Vetoable Event Handlers.
 */
export interface SohoModalDialogVetoableEventGuard<T> {

  /**
   *  Track if cancelled
   */
  isCancelled?: boolean;

  /**
   * Invoked before a modal is opened.
   *
   * @return false to veto the open action; otherwise true.
   */
  beforeOpen?(): boolean;

  /**
   * Invoked before a modal is closed, allowing the close to be vetoed.
   *
   * @param result - the value of the dialog result, passed to close or set.
   * @param dialogRef - a reference to the modal dialog wrapper.
   * @param dialogComponent - the underlying dialog component displayed in the dialog.
   * @return false to veto the close action; otherwise true.
   */
  beforeClose?(result: any, dialogRef: SohoModalDialogRef<T>, dialogComponent: T): boolean;

  /**
   * Invoked before a modal is opened.
   *
   * @return false to veto the destroy action; otherwise true.
   */
  beforeDestroy?(): boolean;
}
