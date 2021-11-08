import {
  Component,
  HostBinding,
  Input,
  NgZone,
} from '@angular/core';

@Component({
  selector: '[soho-swipe-action]', // eslint-disable-line
  template: `
    <div class="swipe-container">
      <ng-content></ng-content>
    </div>`,
})
export class SohoSwipeActionComponent {

  /** Options */
  private _options: SohoSwipeActionOptions = {};
  private _swipeaction?: SohoSwipeActionStatic | null;

  @HostBinding('class.swipe-action') get isSwipeAction() {
    return true;
  }

  @Input()
  public set swipeType(swipeType: SohoSwipeType) {
    this._options.swipeType = swipeType;
    if (this._swipeaction) {
      this._swipeaction.settings.swipeType = swipeType;
      this.updated(this._swipeaction.settings);
    }
  }
  public get swipeType(): SohoSwipeType {
    if (!this._swipeaction) {
      return this._options.swipeType;
    }
    return this._swipeaction.settings.swipeType;
  }

  constructor(
    private ngZone: NgZone,
  ) { }

  public updated(settings: any): SohoSwipeActionComponent {
    this.ngZone.runOutsideAngular(() => this._swipeaction?.updated(settings));
    return this;
  }
}
