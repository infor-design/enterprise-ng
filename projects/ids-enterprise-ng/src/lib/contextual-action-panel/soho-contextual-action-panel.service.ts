import {
  ViewContainerRef,
  Injectable,
  Injector,
  ComponentFactoryResolver,
  ApplicationRef,
  NgZone
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';
import { SohoContextualActionPanelRef } from './soho-contextual-action-panel.ref';

/**
 * This service is used to create a panel panel, based on the content
 * of an Angular Component on the screen.
 */
@Injectable()
export class SohoContextualActionPanelService {
  /**
   * Constructor.
   *
   * @param appRef - application reference; must not be null.
   * @param componentFactoryResolver - used to create component factories for components dynamically.
   * @param injector - the current in scope injector, use as a delegate.
   * @param ngZone - the angular zone; must not be null.
   */
  constructor(
    private readonly appRef: ApplicationRef,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly ngZone: NgZone) {
  }

  /**
   * Creates a panel defined by the given component, returning a reference to the
   * panel that can be interacted with.
   *
   * The component has the potential to include the panel reference when it is
   * instantiated, as a provider.
   *
   * The panel won't necessarily be open yet, see the panel ref Api for further methods.
   *
   * @param component - the type of the component to instantiate; must not be null.
   * @param parent - the parent container; must not be null.
   * @param options - the default options for the panel; optional.
   *
   * @return the panel reference.
   */
  public contextualactionpanel<T>(component: PanelComponentType<T>, parent: ViewContainerRef,
    options?: SohoContextualActionPanelOptions): SohoContextualActionPanelRef<T> {
    ArgumentHelper.checkNotNull('component', component);
    ArgumentHelper.checkNotNull('parent', parent);

    return new SohoContextualActionPanelRef<T>(
      this.appRef, this.componentFactoryResolver, this.injector, this.ngZone, (options as any), component);
  }
}

/**
 * Object with a "new"" method returning the type T.
 */
export type PanelComponentType<T> = new (...args: any[]) => T;
