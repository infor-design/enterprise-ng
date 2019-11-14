import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
  NgZone,
} from '@angular/core';

import { SohoModalRef } from './soho-modal.ref';

/**
 * This service is used to create a modal that can
 * contain an Angular Component
 */
@Injectable()
export class SohoModalService {

  constructor(
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private ngZone: NgZone
  ) {}

  /**
   * Creates a modal containing the given component,
   * returning a reference to control with.
   *
   * The dialog won't be open yet, see SohoModalRef api for further methods.
   *
   * @param component - the type of the component to instantiate
   * @param settings  - optional modal settings
   *
   * @return the modal reference.
   */
  public modal<T>(component: ModalComponent<T>, settings = {} as SohoModalOptions): SohoModalRef<T> {
    return new SohoModalRef<T>(this.appRef, this.componentFactoryResolver, this.injector, this.ngZone, settings, component);
  }

  /**
   * Creates a modal containing the given content string,
   * returning a reference to control with.
   *
   * The dialog won't be open yet, see SohoModalRef api for further methods.
   *
   * @param content  - message string content
   * @param settings - optional modal settings
   *
   * @return the modal reference.
   */
  public message<T>(content: string, settings = {} as SohoModalOptions): SohoModalRef<T> {
    settings.content = content;
    return new SohoModalRef<T>(this.appRef, this.componentFactoryResolver, this.injector, this.ngZone, settings);
  }
}

/**
 * Object with a "new"" method returning the type T.
 */
export type ModalComponent<T> = new (...args: any[]) => T;
