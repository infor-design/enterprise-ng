import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Wrapper for the jQuery panel control.
 *
 */
export class SohoContextualActionPanelRef<T> {
  /** Component - if the content is derived from an existing component. */
  private componentRef?: ComponentRef<T>;

  /** Selector referencing the panel-panel after it has been moved to the panel container. */
  private jQueryElement: JQuery;

  /** Soho Control Api */
  private contextualactionpanel: SohoContextualActionPanelStatic;

  /** The result of the panel. */
  private _panelResult: any;

  /** Event fired when the panel is opened. */
  private open$: Subject<any> = new Subject();

  /** Event fired when the panel is closed. */
  private close$: Subject<any> = new Subject();

  /** Event fired after closing the panel. */
  private afterClose$: Subject<any> = new Subject();

  /** Event fired after opening the panel panel. */
  private afterOpen$: Subject<any> = new Subject();

  /**
   * The component displayed as the panel content.
   *
   * @param componentRef - reference to the component defining the panel panel content.
   */
  set component(componentRef: ComponentRef<T>) {
    // The component can also implement the guard interface, if it does
    // use it.
    this.componentRef = componentRef;
  }

  /**
    * The component displayed inside the panel's frame, if specified.  This may
    * be null if the component is built from an HTML fragment or a jQuery selector.
    */
  public get componentPanel(): T {
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
  private _options: SohoContextualActionPanelOptions = {};

  /**
   * Sets the whole options block for this contextual action panel.
   *
   * @param options - the options to set.
   */
  options(options: SohoContextualActionPanelOptions): SohoContextualActionPanelRef<T> {
    this._options = options;

    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings = options;
    }

    return this;
  }
  /**
   * Sets the title of the panel.
   *
   * @param title - the title of the panel.
   */
  title(title: string): SohoContextualActionPanelRef<T> {
    this._options.title = title;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.title = title;
    }
    return this;
  }

  /**
   * Sets the buttons to use on the panel panel.
   *
   * @param buttons - list of buttons to display
   */
  buttons(buttons: SohoContextualActionPanelButton[]): SohoContextualActionPanelRef<T> {
    this._options.buttons = buttons;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.buttons = buttons;
    }
    return this;
  }

  /**
   * Sets the 'id' that the panel control uses.
   *
   * @param id - the id.
   */
  id(id: string): SohoContextualActionPanelRef<T> {
    this._options.id = id;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.id = id;
    }
    return this;
  }

  /**
   * Sets the 'id' that the panel control uses.
   *
   * @param initializeContent - Sets the ability to initialize content.
   */
  initializeContent(initializeContent: boolean): SohoContextualActionPanelRef<T> {
    this._options.initializeContent = initializeContent;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.initializeContent = initializeContent;
    }
    return this;
  }
  /**
   * Sets the 'trigger' that the panel control uses.
   *
   * @param trigger - when to open the panel.
   */
  trigger(trigger: SohoContextualActionPanelTriggerType): SohoContextualActionPanelRef<T> {
    this._options.trigger = trigger;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.trigger = trigger;
    }
    return this;
  }

  /**
   * Sets the 'content' that the panel control uses.
   *
   * @param content - a selector or string representing the panel content.
   */
  content(content: JQuery | string): SohoContextualActionPanelRef<T> {
    this._options.content = content;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.content = content;
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
   * @param component - the instantiated instance.
   * @return the panel ref for onward assignment.
   */
  apply(fn: (component: T) => void): SohoContextualActionPanelRef<T> {
    if (fn && this.componentRef.instance) {
      fn(this.componentRef.instance);
    }
    return this;
  }

 /**
   * panel result property.
   *
   * @param panelResult - the stored result of the panel.
   */
  set panelResult(panelResult: any) {
    this._panelResult = panelResult;
  }
  get panelResult(): any {
    return this._panelResult;
  }

  /**
   * Constructor.
   */
  constructor() {
  }

  /**
   * Opens the panel.
   *
   * @return the panel ref.
   */
  open(): SohoContextualActionPanelRef<T> {
    if (!this.componentRef && !this._options.content) {
      throw Error('componentRef or content must be initialised.');
    }

    // Assume content...
    let element: JQuery = $('body');

    if (this.componentRef) {
      // .. unless component supplied, in which case get a selector
     // to the component and use that.
      element = jQuery(this.componentRef.location.nativeElement);
      this._options.content = element;
    }

    element.contextualactionpanel(this._options);
    this.contextualactionpanel = element.data('contextualactionpanel');
    // When the panel is opened, it is moved to the body, so
    // set the jQueryElement.
    this.jQueryElement = this.contextualactionpanel.element;

    // Add listeners to control events
    this.jQueryElement.on('close', ((event: any, isCancelled: boolean) => { this.onClose(event, isCancelled); }));
    this.jQueryElement.on('open', ((event: any) => { this.onOpen(event); }));
    this.contextualactionpanel.panel.on('afterclose', ((event: any) => { this.onAfterClose(event); }));
    this.contextualactionpanel.panel.on('afteropen', ((event: any) => { this.onAfterOpen(event); }));

    return this;
  }

  /**
   * Closes the panel panel, if open.  The panel is not closed
   * fully until the 'afterClosed' event is fired.
   *
   * @param panelResult - optional result - passed back to the caller.
   */
  close(panelResult?: any): SohoContextualActionPanelRef<T> {
    this.panelResult = panelResult;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.close();
    }
    return this;
  }

  // ------------------------------------------
  // Events
  // ------------------------------------------

  /**
   * Opened Event.
   *
   * This event is fired when the panel is being opened.
   *
   * @param eventFn - the function to invoke when the panel is to be opened.
   */
  opened(eventFn: Function): SohoContextualActionPanelRef<T> {
    this.open$.subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * Opened Event.
   * This event is fired after the panel has been opened.
   *
   * @param eventFn - the function to invoke when the panel is to be opened.
   */
  afterOpen(eventFn: Function): SohoContextualActionPanelRef<T> {
    this.afterOpen$.subscribe((f: any) => { eventFn(f, this); });
    return this;
  }

  /**
   * Closed Event.
   *
   * This event is fired when the panel is being closed.
   *
   * @param eventFn - the function to invoke when the panel is to be closed.
   */
  closed(eventFn: SohoContextualActionPanelEventFunction<T>): SohoContextualActionPanelRef<T> {
    this.close$.subscribe((result: any) => { eventFn(result, this, this.componentPanel); });
    return this;
  }

  /**
   * After Closed Event.
   *
   * This event is fired, with the result of the panel, when the panel has been
   * closed and destroyed.
   *
   * @param eventFn - the function to invoke after the panel has been closed.
   */
  afterClose(eventFn: SohoContextualActionPanelEventFunction<T>): SohoContextualActionPanelRef<T> {
    this.afterClose$.subscribe((result: any) => { eventFn(result, this, this.componentPanel); });
    return this;
  }

  // -------------------------------------------
  // Event Handlers
  // -------------------------------------------

  /**
   * Handles the 'open' event, fired just before
   * the focus is assigned to a panel.
   *
   * @param event - full event object.
   */
  private onOpen(event: any) {
    this.open$.next(event);
  }
  /**
   * Handles the 'afterOpen' event, fired after the panel panel
   * has been opened.
   *
   * @param event - full event object.
   */
  private onAfterOpen(event: any) {
    this.afterOpen$.next(event);
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
   * Handles the 'afterClose' event, fired when th panel
   * has been closed and tidy up is required.
   *
   * @param event - full event object.
   */
  private onAfterClose(event: any) {
    // Pass the panel result back.
    this.afterClose$.next(this.panelResult);
    this.afterClose$.complete();

    this.contextualactionpanel.destroy();
    this.contextualactionpanel = null;

    this.componentRef.destroy();
    this.componentRef = null;
  }
}
/**
 * Close/AfterClose event handler.
 *
 * @param result - the panel result (if set); may be undefined.
 * @param panelRef - the panel reference (or wrapper); never null.
 * @param panelComponent - the component hosted in the modal; may be undefined.
 */
export type SohoContextualActionPanelEventFunction<T> = (result: any, panelRef: SohoContextualActionPanelRef<T>, panelComponent: T) => void;

/**
 * Contract for all SohoContextualActionPanelComponents.
 */
export interface SohoContextualActionPanelComponent<T> {
}
