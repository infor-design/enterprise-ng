import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'soho-splitter-left-pane',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSplitterLeftPaneComponent {
  @HostBinding('class.pane-left') paneLeft= true;
}

@Component({
  selector: 'soho-splitter-right-pane',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSplitterRightPaneComponent {
  @HostBinding('class.pane-right') paneRight = true;
}

@Component({
  selector: '[soho-splitter]',
  templateUrl: 'splitter.component.html'
})
export class SohoSplitterComponent implements AfterViewInit, OnDestroy {
  private jQueryElement: any;
  private splitter: any;

  @Input() axis: 'x' | 'y' = 'x';

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    const options: any = {
      axis: 'x',
      resize: 'immediate', // (or end)
      containment: null
    };

    this.jQueryElement.splitter(options);

    this.splitter = this.jQueryElement.data('data');

  // this.jQueryElement.on('split', (f) => this.onSplit(f));
  }

  ngOnDestroy() {
    // Necessary clean up step (add additional here)
    if (this.splitter) {
      this.splitter.destroy();
      this.splitter = null;
    }
  }
}

/**
 * Holds all components usable for splitter
 */
export const SPLITTER_COMPONENTS = [
  SohoSplitterLeftPaneComponent,
  SohoSplitterRightPaneComponent,
  SohoSplitterComponent
];
