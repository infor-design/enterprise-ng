import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: '[soho-form-compact]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoFormCompactComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /** Options. */
  private options: SohoFormCompactOptions = {};

  @HostBinding('class.form-compact') get isFormCompact() {
    return true;
  }

  private jQueryElement?: JQuery;
  private formcompact?: SohoFormCompact | null;
  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);

      this.jQueryElement.formcompact(this.options);
      this.formcompact = this.jQueryElement.data('formcompact');
    });
  }

  ngAfterViewChecked() {
    if (this.formcompact && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.formcompact?.updated(this.formcompact?.settings));
      this.updateRequired = false;
    }
  }

  /** Tear Down */
  ngOnDestroy() {
    // call outside the angular zone so change detection isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }
      if (this.formcompact) {
        this.formcompact.destroy();
        this.formcompact = null;
      }
    });
  }
}
