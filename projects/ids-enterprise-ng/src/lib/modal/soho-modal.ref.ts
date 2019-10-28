import {
  ApplicationRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  NgZone
} from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, tap, take, takeUntil } from 'rxjs/operators';
import { ModalComponent } from './soho-modal.service';

/**
 * Wrapper for the jQuery modal control.
 */
export class SohoModalRef<T> {

  private componentRef?: ComponentRef<T>;
  private jQueryElement: JQuery;
  private modal: SohoModalStatic;
  private _options: SohoModalOptions = {};
  // result passed as param to close() method
  private dialogResult: any;

  // Event Observables
  private open$: Observable<Event>;
  private afterOpen$: Observable<Event>;
  private close$: Observable<Event>;
  private afterClose$: Observable<any>;

  // vetoable event guards
  private openEventGuard: (e: Event) => boolean;
  private closeEventGuard: (e: Event) => boolean;
  private destroyEventGuard: (e: Event) => boolean;

  /**
   * returns the component instance inside the modal
   */
  public get componentDialog(): T {
    if (this.componentRef) {
      return this.componentRef.instance;
    }
    return null;
  }

  /**
   * Sets the whole options block for this modal dialog.
   * @param options - the options to set.
   */
  options(options: SohoModalOptions): SohoModalRef<T> {
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
  frameHeight(frameHeight: number): SohoModalRef<T> {
    this._options.frameHeight = frameHeight;
    if (this.modal) {
      this.modal.settings.frameHeight = frameHeight;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the title of the modal dialog.
   * @param title - the title of the dialog.
   */
  title(title: string): SohoModalRef<T> {
    this._options.title = title;
    if (this.modal) {
      this.modal.settings.title = title;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the buttons to use on the modal dialog.
   * @param buttons - list of buttons to display
   */
  buttons(buttons: SohoModalButton[]): SohoModalRef<T> {
    this._options.buttons = buttons;
    if (this.modal) {
      this.modal.settings.buttons = buttons;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'id' that the modal control uses.
   * @param id - the id.
   */
  id(id: string): SohoModalRef<T> {
    this._options.id = id;
    if (this.modal) {
      this.modal.settings.id = id;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'trigger' that the modal control uses.
   * @param trigger - when to open the dialog.
   */
  trigger(trigger: SohoModalTriggerType): SohoModalRef<T> {
    this._options.trigger = trigger;
    if (this.modal) {
      this.modal.settings.trigger = trigger;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'isAlert' that the modal control uses.
   * @param isAlert - true if this dialog is to be styled an an alert.
   */
  isAlert(isAlert: boolean): SohoModalRef<T> {
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
  fullsize(fullsize: SohoModalFullSize): SohoModalRef<T> {
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
  breakpoint(breakpoint: SohoModalBreakPoint): SohoModalRef<T> {
    this._options.breakpoint = breakpoint;
    if (this.modal) {
      this.modal.settings.breakpoint = breakpoint;
    }
    return this;
  }

  /**
   * Sets the 'content' that the modal control uses.
   * @param content - a selector or string representing the dialog content.
   */
  content(content: JQuery | string): SohoModalRef<T> {
    this._options.content = content;
    if (this.modal) {
      this.modal.settings.content = content;
      // @todo - need an api on modal to update content.
    }
    return this;
  }

  /**
   * Sets the 'cssClass' of the modal control.
   * @param cssClass - css class name
   */
  cssClass(cssClass: string): SohoModalRef<T> {
    this._options.cssClass = cssClass;
    if (this.modal) {
      this.modal.settings.cssClass = cssClass;
      // @todo - need an api on modal to update settings.
    }
    return this;
  }

  /**
   * Sets the 'autoFocus' of the modal control.
   * @param autoFocus -if true; the dialog will autoFocus.
   */
  autoFocus(autoFocus: boolean): SohoModalRef<T> {
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
   */
  apply(fn: (component: T) => void): SohoModalRef<T> {
    if (fn && this.componentDialog) {
      fn(this.componentDialog);
    }
    return this;
  }

  /**
   * Constructor.
   */
  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private ngZone: NgZone,
    private settings: SohoModalOptions,
    private modalComponent?: ModalComponent<T>
  ) {
    this.options(settings);

    if (modalComponent) {
      // create component
      this.componentRef = componentFactoryResolver
        .resolveComponentFactory(modalComponent)
        .create(this.injector);
      appRef.attachView(this.componentRef.hostView);

      // set modal content
      this._options.content = jQuery(this.componentRef.location.nativeElement);
    }
  }

  /**
   * Handles destruction of component and modal
   */
  private destroy() {
    // Close vetoable event listeners
    this.jQueryElement.off('beforeopen');
    this.jQueryElement.off('beforeclose');
    this.jQueryElement.off('beforedestroy');

    if (this.componentRef) {
      // destroy component
      this.ngZone.run(() => {
        this.appRef.detachView(this.componentRef.hostView);
        this.componentRef.destroy();
        this.componentRef = null;
      });
    }

    if (this.modal) {
      // destroy modal
      this.ngZone.runOutsideAngular(() => {
        this.modal.destroy();
        this.modal = null;
      });
    }
  }

  /**
   * Returns true or executes the event guard if it exists
   * @param eventFn Veto function that returns boolean
   * @param e       Event Object from JQuery
   */
  private checkEventGuard(guardFn: (e: Event) => boolean, e: Event) {
    return guardFn ? this.ngZone.run(() => guardFn(e)) : true;
  }

  /**
   * Opens the modal
   */
  open(): SohoModalRef<T> {
    this.jQueryElement = this.ngZone.runOutsideAngular(() => {
      const element = jQuery('body');
      element.modal(this._options);

      this.modal = element.data('modal');
      return this.modal.element;
    });

    // Create Event Observables
    this.open$ = fromEvent(this.jQueryElement, 'open');
    this.afterOpen$ = fromEvent(this.jQueryElement, 'afteropen');
    this.close$ = fromEvent(this.jQueryElement, 'close');
    this.afterClose$ = fromEvent(this.jQueryElement, 'afterclose').pipe(
      take(1),
      tap(() => this.destroy()),
      map(() => this.dialogResult)
    );

    // Setup vetoable event listeners
    this.jQueryElement.on('beforeopen', (e: Event) => this.checkEventGuard(this.openEventGuard, e));
    this.jQueryElement.on('beforeclose', (e: Event) => this.checkEventGuard(this.closeEventGuard, e));
    this.jQueryElement.on('beforedestroy', (e: Event) => this.checkEventGuard(this.destroyEventGuard, e));

    return this;
  }

  /**
   * Closes the modal and sets the returned result
   * @param dialogResult - optional result received in afterClose callback
   */
  close(dialogResult?: any): SohoModalRef<T> {
    this.dialogResult = dialogResult;
    this.modal.close();
    return this;
  }

  /**
   * Subscribes to the modal's event hooks and keeps it until afterclose event is fired
   * @param observable$ the observable that listens to the event
   * @param callback    the callback function
   */
  private executeCallback(observable$: Observable<Event>, callback: Function) {
    // afterClose shall close all event subscriptions
    observable$.pipe(takeUntil(this.afterClose$))
      .subscribe((e: Event) => this.ngZone.run(() => callback(e, this, this.componentDialog)));
  }

  /**
   * Executes the callback for the opened event
   * @param eventFn opened event hook
   */
  opened(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.open$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the after open event
   * @param eventFn after open event hook
   */
  afterOpen(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.afterOpen$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the closed event
   * @param eventFn closed event hook
   */
  closed(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.close$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the after close event return the dialog result
   * @param eventFn after close event hook
   */
  afterClose(eventFn: Function): SohoModalRef<T> {
    this.afterClose$.subscribe((result) => this.ngZone.run(() => eventFn(result, this)));
    return this;
  }

  /**
   * Sets beforeopen vetoable event guard
   * @param eventFn function callback
   */
  beforeOpen(eventFn: (e: Event) => boolean): SohoModalRef<T> {
    this.openEventGuard = eventFn;
    return this;
  }

  /**
   * Sets beforeclose vetoable event guard
   * @param eventFn function callback
   */
  beforeClose(eventFn: (e: Event) => boolean): SohoModalRef<T> {
    this.closeEventGuard = eventFn;
    return this;
  }

  /**
   * Sets beforedestroy vetoable event guard
   * @param eventFn function callback
   */
  beforeDestroy(eventFn: (e: Event) => boolean): SohoModalRef<T> {
    this.destroyEventGuard = eventFn;
    return this;
  }
}
