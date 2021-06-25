import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: '[soho-monthview]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoMonthViewComponent implements AfterViewChecked, AfterViewInit, OnDestroy {

  @HostBinding('class.monthview') isMonthView = true;
  @HostBinding('attr.data-init') dataInit = false;

  // @Input() set monthviewOptions(monthviewOptions: SohoMonthViewOptions | undefined) {
  //   this._monthviewOptions = monthviewOptions;
  // }

  /**
   * Local variables
   */
  // private _monthviewOptions: SohoMonthViewOptions = {};

  ngAfterViewInit() {

  }

  ngAfterViewChecked() {

  }

  ngOnDestroy() {

  }
}
