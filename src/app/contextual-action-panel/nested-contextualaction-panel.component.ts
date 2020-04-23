import {
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

/**
 * This is an example of a nested CAP component.
 */
@Component({
  templateUrl: 'nested-contextualaction-panel.component.html'
})
export class NestedContextualActionPanelComponent {

  /**
   * The 'dialogPlaceholder' is where the reference dialog component will be
   * parented when it is instantiated.
   *
   * This can be the ViewContainerRef of this component, or another component.
   */
  @ViewChild('nestedCapPlaceholder', { read: ViewContainerRef, static: true })
  placeholder: ViewContainerRef;
}
