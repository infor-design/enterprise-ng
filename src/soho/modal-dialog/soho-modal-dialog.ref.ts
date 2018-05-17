import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Wrapper for the jQuery modal control.
 *
 * @todo Return a promise from open.
 * @todo async vetoable interface - is this possible?
 * @todo on the fly updating of dialog
 * @todo searchable dialog example
 */
export class SohoModalDialogRef<T> {
  /** Component - if the content is derived from an existing component. */
  private componentRef?: ComponentRef<T>;

  /** Vetoable Event Guard */
  private eventGuard: SohoModalDialogVetoableEventGuard<T> = { };

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

  /**
   * The component displayed as the dialog content.
   *
   * @param componentRef - reference to the component defining the modal dialog content.
   */
  set component(componentRef: ComponentRef<T>) {
    // The component can also implement the guard interface, if it does
    // use it.
    this.eventGuard = componentRef.instance;
    this.componentRef = componentRef;
  }

  /**
   * The component displayed inside the modal frame, if specified.  This may
   * be null if the dialog is built from an HTML fragment or a jQuery selector.
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
   *
   * @param frameHeight - the extra frame height to allow.
   */
  frameHeight(frameHeight: number): SohoModalDialogRef<T> {
    this._options.frameHeight = frameHeight;
    if (this.modal) {
      this.modal.settings.frameHeight = frameHeight;
      // @todo - need an api on modal to update settings.
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
   * @return the dialof ref for onward assignment.
   */
  apply(fn: (component: T) => void): SohoModalDialogRef<T> {
    if (fn && this.componentRef.instance) {
      fn(this.componentRef.instance);
    }
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
   */
  constructor() {
  }

  /**
   * Opens the dialog.
   *
   * @return the dialog ref.
   */
  open(): SohoModalDialogRef<T> {
    if (!this.componentRef && !this._options.content) {
      throw Error('componentRef or content must be initialised.');
    }

    // Assume conent ...
    let element: JQuery = $('body');
    if (this.componentRef) {
      // .. unless component supplied, in which case get a selector
     // to the component and use that.
      element = jQuery(this.componentRef.location.nativeElement);
      this._options.content = element;
    }

    element.modal(this._options);
    this.modal = element.data('modal');

    // When the modal is opened, it is moved to the body, so
    // set the jQueryElement.
    this.jQueryElement = this.modal.element;

    // Add listeners to control events
    this.jQueryElement.on('close', ((event: any, isCancelled: boolean) => { this.onClose(event, isCancelled); }));
    this.jQueryElement.on('afterclose', ((event: any) => { this.onAfterClose(event); }));
    this.jQueryElement.on('open', ((event: any) => { this.onOpen(event); }));
    this.jQueryElement.on('afteropen', ((event: any) => { this.onAfterOpen(event); }));

    // These are vetoable events.
    this.jQueryElement.on('beforeopen', ((event: any) => this.onBeforeOpen(event)));
    this.jQueryElement.on('beforeclose', ((event: any) => this.onBeforeClose(event)));
    this.jQueryElement.on('beforedestroy', ((event: any) => this.onBeforeDestroy(event)));

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
      this.modal.close();
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
    this.open$.subscribe((f: any) => { eventFn(f, this); });
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
    this.afterOpen$.subscribe((f: any) => { eventFn(f, this); });
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
    this.close$.subscribe((f: any) => { eventFn(f, this, this.componentDialog); });
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
    this.afterClose$.subscribe((result: any) => { eventFn(result, this, this.componentDialog); });
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
   * Handles the 'beforeCloseevent, fired before the modal dialog
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
  private onBeforeDestroy(event: any): boolean {
    const fn: Function = this.eventGuard.beforeDestroy;
    const allow = fn ? fn.call(this.eventGuard) : true;
    if (allow && this.componentRef) {
      this.componentRef.destroy();
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

    // SOHO-4879 - Closing modal dialog does not remove the 'modal-page-container'
    this.modal.destroy();
    this.modal = null;
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
