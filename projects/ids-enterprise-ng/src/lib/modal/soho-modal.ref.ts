import {
  ApplicationRef,
  ComponentRef,
  ComponentFactoryResolver,
  Injector,
  NgZone
} from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';
import { map, tap, take, takeUntil } from 'rxjs/operators';
import { ModalComponent } from './soho-modal.service';

/**
 * Modal reference object which gives you control over the jQuery modal.
 */
export class SohoModalRef<T> {

  private componentRef?: ComponentRef<T>;
  private jQueryElement: JQuery;
  private modal: SohoModalStatic;
  private _options: SohoModalOptions = {};
  // result returned in afterclose callback
  public dialogResult: any;

  // Event Observables
  private open$: Observable<Event>;
  private afterOpen$: Observable<Event>;
  private close$: Observable<Event>;
  private afterCloseEventCallback: (result: any) => void;

  // vetoable event guards
  private openEventGuard: () => boolean;
  private closeEventGuard: () => boolean;
  private destroyEventGuard: () => boolean;

  // fires right before modal gets destroyed
  private destroyed$ = new Subject();

  /**
   * returns the component instance inside the modal
   */
  get componentDialog(): T {
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
   * Cleans up the listeners and component
   */
  private cleanup() {
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

    // destroys event listeners
    this.ngZone.run(() => {
      this.destroyed$.next();
      this.destroyed$.complete();
    });

    return true;
  }

  /**
   * Executes the callback function and returns its result, otherwise just returns true.
   */
  private eventGuard(callbackFn: () => boolean, execIfTrue?: Function): boolean {
    const result = callbackFn ? this.ngZone.run(() => callbackFn()) : true;
    if (result && execIfTrue) {
      this.ngZone.run(() => execIfTrue());
    }
    return result;
  }

  /**
   * Opens the modal
   */
  open(): SohoModalRef<T> {
    if (this.modal) {
      this.modal.open();
      return this;
    }

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

    // Start modal destroy on afterclose
    fromEvent(this.jQueryElement, 'afterclose').pipe(
      takeUntil(this.destroyed$)
    ).subscribe(() => {
      // return dialog result to the afterClose callback
      if (this.afterCloseEventCallback) {
        this.ngZone.run(() => this.afterCloseEventCallback(this.dialogResult));
      }
      // start modal destroy
      this.ngZone.runOutsideAngular(() => this.modal.destroy());
    });

    // Setup vetoable event listeners
    this.jQueryElement.on('beforeopen', () => this.eventGuard(this.openEventGuard));
    this.jQueryElement.on('beforeclose', () => this.eventGuard(this.closeEventGuard));
    this.jQueryElement.on('beforedestroy', () => this.eventGuard(this.destroyEventGuard, () => this.cleanup()));

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
   * Destroys the modal regardless if it's open/close
   */
  destroy(): SohoModalRef<T> {
    this.modal.destroy();
    return this;
  }

  /**
   * Subscribes to event observables and executes callback hooks until destroyed
   */
  private executeCallback(observable$: Observable<Event>, callback: Function) {
    observable$.pipe(takeUntil(this.destroyed$))
      .subscribe((e: Event) => this.ngZone.run(() => callback()));
  }

  /**
   * Executes the callback for the opened event
   * @param eventFn opened event callback hook
   */
  opened(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.open$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the after open event
   * @param eventFn after open event callback hook
   */
  afterOpen(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.afterOpen$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the closed event
   * @param eventFn closed event callback hook
   */
  closed(eventFn: Function): SohoModalRef<T> {
    this.executeCallback(this.close$, eventFn);
    return this;
  }

  /**
   * Executes the callback for the after close event return the dialog result
   * @param eventFn after close event callback hook
   */
  afterClose(eventFn: (result: any) => void): SohoModalRef<T> {
    this.afterCloseEventCallback = eventFn;
    return this;
  }

  /**
   * Sets beforeopen vetoable event guard.
   * Prevents modal from opening if callback function returns false.
   * WARNING:
   * You'll need to call destroy() manually later to avoid memory leaks,
   * as the modal still exists even when it's not displayed.
   *
   * @param callbackFn function callback
   */
  beforeOpen(callbackFn: () => boolean): SohoModalRef<T> {
    this.openEventGuard = callbackFn;
    return this;
  }

  /**
   * Sets beforeclose vetoable event guard.
   * Prevents modal from closing if callback function returns false.
   * @param callbackFn function callback
   */
  beforeClose(callbackFn: () => boolean): SohoModalRef<T> {
    this.closeEventGuard = callbackFn;
    return this;
  }

  /**
   * Sets beforedestroy vetoable event guard.
   * Prevents modal from being destroyed if callback function returns false.
   * WARNING:
   * You'll need to call destroy() manually later to avoid memory leaks,
   * as the modal still exists even when it's not displayed.
   *
   * @param callbackFn function callback
   */
  beforeDestroy(callbackFn: () => boolean): SohoModalRef<T> {
    this.destroyEventGuard = callbackFn;
    return this;
  }
}
