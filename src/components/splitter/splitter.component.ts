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
  selector: 'soho-22splitter-pane',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSplitterPaneComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    console.log("SohoSplitterPaneComponent");
  }
}

@Component({
  selector: 'soho-splitter',
  templateUrl: 'splitter.component.html'
})
export class SohoSplitterComponent implements AfterViewInit, OnDestroy {
  private jQueryElement: any;
  private splitter: any;

  @Input() axis: 'x' | 'y' = 'x';
  @Input() resize: 'immediate' | 'end' = 'immediate';

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    const options: any = {
      axis: this.axis,
      resize: this.resize,
      containment: null
    };

    console.log(`Splitter: ${this.axis}`);

    this.jQueryElement.find('.splitter').splitter(options);

    this.splitter = this.jQueryElement.data('data');
  }

  ngOnDestroy() {
    if (this.splitter) {
      this.splitter.destroy();
      this.splitter = null;
    }
  }
}

