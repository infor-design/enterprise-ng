import { ComponentRef, ApplicationRef, ComponentFactoryResolver, Injector, NgZone } from '@angular/core';
import { Subject } from 'rxjs';
import { PanelComponentType } from '.';
import { takeUntil } from 'rxjs/operators';

/**
 * Wrapper for the jQuery panel control.
 *
 */
export class SohoContextualActionPanelRef<T> {
  /** Component - if the content is derived from an existing component. */
  private componentRef?: ComponentRef<T> | null;

  /** Selector referencing the panel-panel after it has been moved to the panel container. */
  private jQueryElement?: JQuery;

  /** Soho Control Api */
  private contextualactionpanel?: SohoContextualActionPanelStatic | null;

  /** The result of the panel. */
  private _panelResult: any;

  /** Event fired when the panel is opened. */
  private open$: Subject<any> = new Subject();

  /** Event fired when the panel is closed. */
  private close$: Subject<any> = new Subject();

  /** Event fired before closing the panel */
  private beforeClose$: Subject<any> = new Subject();

  /** Event fired after closing the panel. */
  private afterClose$: Subject<any> = new Subject();

  /** Event fired after opening the panel panel. */
  private afterOpen$: Subject<any> = new Subject();

  /** Handle resource tidy up of this class. */
  private destroyed$ = new Subject();

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
  public get componentPanel(): T | null {
    if (this.componentRef) {
      return this.componentRef.instance;
    }
    return null;
  }

  /**
   * The buttonset API for the CAP dialog.
   *
   * @returns the buttonset API for the CAP dialog, if initialized.
   */
  public get buttonsetAPI(): SohoButtonsetStatic | undefined {
    return this.contextualactionpanel ? this.contextualactionpanel.buttonsetAPI : undefined;
  }

  // -------------------------------------------
  // Default options block
  // -------------------------------------------

  /**
   * Cached options.
   */
  private _options: SohoContextualActionPanelOptions = {
    content: undefined,
    initializeContent: true, // initialize content before opening
    title: 'Contextual Action Panel',
    modalSettings: {
      title: undefined,
      buttons: [],
      centerTitle: false,
      showCloseBtn: false,
      trigger: 'immediate',
      useFlexToolbar: false
    }
  };

  /**
   * Sets the whole options block for this contextual action panel.
   *
   * @param options - the options to set.
   */
  options(options: SohoContextualActionPanelOptions): SohoContextualActionPanelRef<T> {
    this._options = $.extend(true, this._options, options);

    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings = this._options;
    }

    return this;
  }

  /**
   * Sets the whole options block for this contextual action panel.
   *
   * @param modalSettings - the options to set.
   */
  modalSettings(modalSettings: SohoModalOptions): SohoContextualActionPanelRef<T> {
    this._options.modalSettings = $.extend(true, this._options.modalSettings, modalSettings);

    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.modalSettings = this._options.modalSettings;
    }

    return this;
  }

  /**
   * Ability to add class(es) to the parent CAP element.
   *
   * @param cssClass - the class(es) value to add in CAP element.
   */
  cssClass(cssClass: string) {
    if (this.contextualactionpanel && this.open()) {
      this.ngZone.runOutsideAngular(() => {
        const cap = jQuery('div.contextual-action-panel.modal');
        cap.addClass(`${cssClass}`);
      });
    } else {
      this._options.modalSettings = $.extend(true, this._options.modalSettings, { cssClass: cssClass });
      if (this.contextualactionpanel) {
        this.contextualactionpanel.settings.modalSettings = this._options.modalSettings;
      }
    }

    return this;
  }

  /** Add extra attributes like id's to the component **/
  attributes(attributes: Array<Object> | Object): SohoContextualActionPanelRef<T> {
    this._options.attributes = $.extend(true, this._options.attributes, attributes);

    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.attributes = this._options.attributes;
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
   * @deprecated (use modalSettings)
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
   * @deprecated (use modalSettings)
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
   * Sets the 'centerTitle' that the panel control uses.
   *
   * @deprecated (use modalSettings)
   * @param centerTitle - Aligns title to center
   */
  centerTitle(centerTitle: boolean): SohoContextualActionPanelRef<T> {
    this._options.centerTitle = centerTitle;
    if (this.contextualactionpanel) {
      this.contextualactionpanel.settings.centerTitle = centerTitle;
    }
    return this;
  }

  /**
   * Sets the 'trigger' that the panel control uses.
   *
   * @deprecated (use modalSettings)
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
    if (fn && this.componentRef?.instance) {
      fn(this.componentRef?.instance);
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
  constructor(private appRef: ApplicationRef,
    componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private ngZone: NgZone,
    settings: SohoContextualActionPanelOptions,
    panelComponent?: PanelComponentType<T>) {

    if (settings) {
      this.options(settings);
    }

    if (panelComponent) {
      this.componentRef = componentFactoryResolver
        .resolveComponentFactory(panelComponent)
        .create(this.injector);

      appRef.attachView(this.componentRef.hostView);
      this._options.content = jQuery(this.componentRef.location.nativeElement);
    }
  }

  /**
   * Opens the panel.
   *
   * @return the panel ref.
   */
  open(): SohoContextualActionPanelRef<T> {
    if (this.contextualactionpanel) {
      // this.contextualactionpanel.open();
      return this;
    }

    if (!this.componentRef && !this._options.content) {
      throw Error('componentRef or content must be initialised.');
    }

    this.jQueryElement = this.ngZone.runOutsideAngular(() => {
      const element = jQuery('body');
      element.contextualactionpanel(this._options);

      this.contextualactionpanel = element.data('contextualactionpanel');
      return this.contextualactionpanel?.element;
    });

    // Add listeners to control events
    this.jQueryElement?.on('close.contextualactionpanel', ((event: any, isCancelled: boolean) => {
      this.onClose(event, isCancelled);
    }));
    this.jQueryElement?.on('open.contextualactionpanel', ((event: any) => {
      this.onOpen(event);
    }));
    (this.contextualactionpanel as any).panel?.on('afterclose.contextualactionpanel', ((event: any) => {
      this.onAfterClose(event);
    }));
    (this.contextualactionpanel as any).panel?.on('afteropen.contextualactionpanel', ((event: any) => {
      this.onAfterOpen(event);
    }));
    (this.contextualactionpanel as any).panel?.on('beforeclose.contextualactionpanel', ((event: any) => {
      this.onBeforeClose(event);
    }));

    return this;
  }

  /**
   * Closes the panel, if open. The panel is not closed
   * fully until the 'afterClosed' event is fired.
   *
   * @param panelResult - optional result - passed back to the caller.
   * @param doForce - optional - forces the modal to close.
   */
  close(panelResult?: any, doForce?: boolean): SohoContextualActionPanelRef<T> {
    this.panelResult = panelResult;
    if (this.contextualactionpanel) {
      this.ngZone.runOutsideAngular(() => {
        this.contextualactionpanel?.close(doForce);
      });
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
  opened(eventFn: Function): SohoContextualActionPanelRef<T> | null {
    this.open$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => {
      eventFn(f, this);
    });
    return this;
  }

  /**
   * Opened Event.
   * This event is fired after the panel has been opened.
   *
   * @param eventFn - the function to invoke when the panel is to be opened.
   */
  afterOpen(eventFn: Function): SohoContextualActionPanelRef<T> | null {
    this.afterOpen$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => {
      eventFn(f, this);
    });
    return this;
  }

  /**
   * Before Closed Event.
   * This event is fired before closing the panel.
   *
   * @param eventFn - the function to invoke when the panel before closing.
   */
  beforeClose(eventFn: Function): SohoContextualActionPanelRef<T> | null {
    this.beforeClose$.pipe(takeUntil(this.destroyed$)).subscribe((f: any) => {
      eventFn(f, this);
    });
    return this;
  }

  /**
   * Closed Event.
   *
   * This event is fired when the panel is being closed.
   *
   * @param eventFn - the function to invoke when the panel is to be closed.
   */
  closed(eventFn: SohoContextualActionPanelEventFunction<T>): SohoContextualActionPanelRef<T> | null {
    this.close$.pipe(takeUntil(this.destroyed$)).subscribe((result: any) => {
      eventFn(result, this, (this.componentPanel as any));
    });
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
  afterClose(eventFn: SohoContextualActionPanelEventFunction<T> | null): SohoContextualActionPanelRef<T> | null {
    this.afterClose$.pipe(takeUntil(this.destroyed$)).subscribe((result: any) => {
      if (!eventFn) {
        return;
      }
      eventFn(result, this, (this.componentPanel as any));
    });
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
  private onClose(_event: any, isCancelled: boolean) {
    this.close$.next(isCancelled);
  }

  /**
   * Handles the 'afterClose' event, fired when th panel
   * has been closed and tidy up is required.
   *
   * @param event - full event object.
   */
  private onAfterClose(_event: any) {
    // Pass the panel result back.
    this.ngZone.run(() => {
      this.afterClose$.next(this.panelResult);
      this.afterClose$.complete();
    });

    if (this.jQueryElement) {
      this.jQueryElement.off('close.contextualactionpanel open.contextualactionpanel');
    }

    this.contextualactionpanel?.destroy();
    this.contextualactionpanel = null;

    this.ngZone.run(() => {
      if (this.componentRef) {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
      }

      this.destroyed$.next(_event);
      this.destroyed$.complete();
    });

  }

  /**
   * Handles the 'beforeclose' event.
   *
   * @param event - full event object.
   */
  private onBeforeClose(event: any) {
    this.beforeClose$.next(event);
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
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SohoContextualActionPanelComponent<T> {
}
