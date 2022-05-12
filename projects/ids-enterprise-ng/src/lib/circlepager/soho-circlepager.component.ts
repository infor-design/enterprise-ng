import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  NgZone,
  Input,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: '[soho-circlepager]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoCirclepagerComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
  /** Options. */
  private settings: SohoCirclepagerOptions = {};

  @HostBinding('class.circlepager') get isCirclePager() {
    return true;
  }

  /** The number of slides to show in one view / pane. */
  @Input() set slidesToShow(value: number) {
    this.settings.slidesToShow = value;

    if (this.circlepager) {
      this.circlepager.settings.slidesToShow = value;
      // todo: does this setting require an updated call to circlepager.js?
    }
  }

  /** First showing slide/group, an 0-based integer */
  @Input() set startingSlide(value: number) {
    this.settings.startingSlide = value;

    if (this.circlepager) {
      this.circlepager.settings.startingSlide = value;
      this.updateRequired = true;
    }
  }

  /** Setting loop: true will loop back after next/previous reached to end */
  @Input() set loop(value: boolean) {
    this.settings.loop = value;

    if (this.circlepager) {
      this.circlepager.settings.loop = value;
      this.updateRequired = true;
    }
  }

  private jQueryElement?: JQuery;
  private circlepager?: SohoCirclepager | null;

  /** Add extra attributes like id's to the component **/
  @Input() set attributes(attributes: Array<Object> | Object) {
    this.settings.attributes = attributes;

    if (this.circlepager) {
      this.circlepager.settings.attributes = attributes;
      this.updateRequired = true;
    }
  }

  private updateRequired = false;

  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
  ) { }

  /** Setup */
  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.circlepager(this.settings);
      this.circlepager = this.jQueryElement.data('circlepager');
    });
  }

  ngAfterViewChecked() {
    if (this.circlepager && this.updateRequired) {
      this.ngZone.runOutsideAngular(() => this.circlepager?.updated(this.circlepager.settings));
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
      if (this.circlepager) {
        try {
          this.circlepager.destroy();
        } catch (e) {
          console.error(e);
        }
        this.circlepager = null;
      }
    });
  }
}
