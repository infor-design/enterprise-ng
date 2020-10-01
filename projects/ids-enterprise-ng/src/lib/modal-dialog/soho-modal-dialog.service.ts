import {
  ComponentFactoryResolver,
  Injectable,
  Injector,
  NgZone,
  ViewContainerRef,
  ApplicationRef,
  Optional
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';
import { SohoModalDialogRef } from './soho-modal-dialog.ref';
import { Router } from '@angular/router';

/**
 * This service is used to create a modal dialog, based on the content
 * of an Angular Componnent on the screen.
 */
@Injectable()
export class SohoModalDialogService {
  /**
   * Constructor.
   *
   * @param appRef - application reference; must not be null.
   * @param componentFactoryResolver - used to create component factories for components dynamically.
   * @param injector - the current in scope injector, use as a delegate.
   * @param ngZone - the angular zone; must not be null.
   * @router
   */
  constructor(
    private readonly appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly ngZone: NgZone,
    @Optional() private readonly router: Router) {
  }

  /**
   * Creates a modal dialog defined by the given component, returning a reference to the
   * dialog that can be interacted with.
   *
   * The component has the potential to include the dialog reference when it is
   * instantiated, as a provider.
   *
   * The dialog won't necessarily be open yet, see the dialog ref api for further methods.
   *
   * @param component - The type of the component to instantiate; must not be null.
   * @param parent - The parent container; obsolete but parameter kept for backwards API compatibility. Has no effect.
   * @param options - The control options to use.
   *
   * @return the modal dialog reference.
   */
  public modal<T>(component: ComponentType<T>, _parent?: ViewContainerRef, options?: SohoModalOptions): SohoModalDialogRef<T> {
    ArgumentHelper.checkNotNull('component', component);

    options = options || {};

    return new SohoModalDialogRef<T>(
      this.router, this.appRef, this.componentFactoryResolver, this.injector, this.ngZone, options, component);
  }

  /**
   * Creates a modal dialog (using the content defined in the options), returning a reference to the
   * dialog that can be interacted with.
   *
   * The dialog won't be open.
   *
   * @return the modal dialog reference.
   */
  public message<T>(content: string | JQuery): SohoModalDialogRef<T> {
    const settings: SohoModalOptions = { content };

    // Without a component, there is no destroy callback to ensure
    // the dialog's markup is removed.
    return new SohoModalDialogRef<T>(this.router, this.appRef, this.componentFactoryResolver, this.injector, this.ngZone, settings);
  }
}

/**
 * Object with a "new"" method returning the type T.
 */
export type ComponentType<T> = new (...args: any[]) => T;
