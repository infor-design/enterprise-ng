import {
  ViewContainerRef,
  Injectable,
  Injector,
  ComponentFactoryResolver
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';

import { SohoModalDialogRef } from './soho-modal-dialog.ref';

import { SohoModalDialogInjector } from './soho-modal-dialog.injector';

/**
 * This service is used to create a modal dialog, based on the content
 * of an Angular Componnent on the screen.
 */
@Injectable()
export class SohoModalDialogService {
  /**
   * Constructor.
   *
   * @param componentFactoryResolver - used to create component factories for components dynamically.
   * @param injector - the current in scope injector, use as a delegate.
   */
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
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
   * @param component - the type of the component to instantiate; must not be null.
   * @param parent - the parent container; must not be null.
   * @param options - the control options to use.
   *
   * @return the modal dialog reference.
   */
  public modal<T>(component: ComponentType<T>, parent: ViewContainerRef, options?: SohoModalOptions): SohoModalDialogRef<T> {
    ArgumentHelper.checkNotNull('component', component);
    ArgumentHelper.checkNotNull('parent', parent);

    const modalDialogRef = new SohoModalDialogRef<T>();
    const dialogInjector = new SohoModalDialogInjector(modalDialogRef, this.injector);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const instance = parent.createComponent<T>(componentFactory, parent.length, dialogInjector);
    instance.instance['options'] = options; // pass in any options/settings object to dialog()
    modalDialogRef.component = instance;
    return modalDialogRef;
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
    return new SohoModalDialogRef<T>()
      .content(content);
  }
}

/**
 * Object with a "new"" method returning the type T.
 */
export interface ComponentType<T> {
  new (...args: any[]): T;
}
