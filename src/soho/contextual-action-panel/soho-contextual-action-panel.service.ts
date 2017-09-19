import {
  ViewContainerRef,
  Injectable,
  Injector,
  ComponentFactoryResolver
} from '@angular/core';

import { ArgumentHelper } from '../utils/argument.helper';
import { SohoContextualActionPanelRef } from './soho-contextual-action-panel.ref';
import { SohoContextualActionPanelInjector } from './soho-contextual-action-panel.injector';

/**
 * This service is used to create a panel panel, based on the content
 * of an Angular Component on the screen.
 */
@Injectable()
export class SohoContextualActionPanelService {
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
   *
   * @return the panel reference.
   */
  public contextualactionpanel<T>(component: PanelComponentType<T>, parent: ViewContainerRef, options?): SohoContextualActionPanelRef<T> {
    ArgumentHelper.checkNotNull('component', component);
    ArgumentHelper.checkNotNull('parent', parent);

    const panelRef = new SohoContextualActionPanelRef<T>();
    const panelInjector = new SohoContextualActionPanelInjector(panelRef, this.injector);
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const instance = parent.createComponent<T>(componentFactory, parent.length, panelInjector);
    instance.instance['options'] = options; // pass in any options/settings object to panel()
    panelRef.component = instance;
    return panelRef;
  }
}

/**
 * Object with a "new"" method returning the type T.
 */
export interface PanelComponentType<T> {
  new (...args: any[]): T;
}
