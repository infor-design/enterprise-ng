import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'soho-swaplist-card',
  template: `
      <div [class]="cardClass">
        <div class="card-header">
          <h2 class="card-title">{{title}}</h2>
          <div class="buttons">
            <ng-content></ng-content>
          </div>
        </div>
        <div class="card-content">
          <div class="listview"></div>
        </div>
      </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSwapListCardComponent {
  // Default class used for the 'card'.
  private static CARD_DEFAULT_CLASS: string = 'card';

  /**
   *  The type of card.
   *
   * @todo make this a string literal?
   */
  private _type: string;

  /**
   * The title for the card.
   */
  private _title: string;

  @Input()
  public set type(value: string) {
    this._type = value;
  }

  /**
   * Return the class to use for the card.
   */
  public get cardClass(): string {
    let cardClasses = SohoSwapListCardComponent.CARD_DEFAULT_CLASS;

    if (this._type) {
      cardClasses += ' ' + this._type;
    }
    return cardClasses;
  }

  /**
   * Title of the card, e.g. 'Available'.
   */
  @Input()
  public set title(value: string) {
    this._title = value;
  }

  public get title(): string {
    return this._title;
  }
}

@Component({
  selector: 'soho-swaplist',
  templateUrl: 'soho-swaplist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSwapListComponent implements AfterViewInit, OnDestroy {
  /**
   * Used to provide unnamed controls with a unique id.
   */
  private static counter = 0;

  /**
   * Local variables
   */

  /**
   * Selector for originating element.
   */
  private jQueryElement: JQuery;

  /**
   * Reference to the Soho Api.
   */
  private swaplist: SohoSwapListStatic;

  /**
   * Block of options, use the accessors to modify.
   */
  private _options: SohoSwapListOptions = {};

  private _isOneThird: boolean = false;

  private _allItems: any;

  // Get the header DOM element
  @ContentChild('available')
  private _availableCard: SohoSwapListCardComponent = null;

  @ContentChild('selected')
  private _selectedCard: SohoSwapListCardComponent = null;

  @ContentChild('fullAccess')
  private _fullAccessCard: SohoSwapListCardComponent = null;

  /**
   * Name for the swaplist control. Necessary for ngModel to function.
   */
  @Input() name: string = `soho-swaplist-${SohoSwapListComponent.counter++}`;

  @Input()
  public set oneThird(value: boolean) {
    this._isOneThird = value !== null && <any>value !== 'false';
  }

  public get oneThird(): boolean {
    return this._isOneThird;
  }

  /**
   * Assign the id for the control
   * (maps to the name to use on a label's 'for' attribute)
   */
  @HostBinding('id') get id() {
    return this.name;
  }

  @HostBinding('class.swaplist') get isSwapList() {
    return true;
  }

  @HostBinding('class.one-third') get isOneThird() {
    return this.oneThird;
  }

  /**
   * Called when the swapt list value changes
   */
  @Output()
  public selected: EventEmitter<JQueryEventObject> = new EventEmitter<JQueryEventObject>();

  /**
   * Called when the swap list updates in some way.
   */
  // tslint:disable-next-line:no-output-rename
  @Output('updated')
  public updatedEvent: EventEmitter<Object> = new EventEmitter<JQueryEventObject>();

  @Input()
  public set allItems(allItems: any | Object | string) {
    this._allItems = allItems;
  }

  public get allItems(): any | Object | string {
    return this._allItems;
  }

  @Input()
  public set availableItems(value: any[]) {
    // todo: comfirm with the new dataset API
    this._options.available = value;
  }

  public get availableItems(): any[] {
    return this.swaplist.getAvailable();
  }

  @Input()
  public set selectedItems(value: any[]) {
    // todo: comfirm with the new dataset API
    this._options.selected = value;
  }

  public get selectedItems(): any[] {
    return this.swaplist.getSelected();
  }

  @Input()
  public set additionalItems(value: any[]) {
    // todo: comfirm with the new dataset API
    this._options.additional = value;
  }

  public get additionalItems(): any[] {
    return this.swaplist.getAdditional();
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.swaplist(this._options);

    this.jQueryElement
      .on('selected', (event: JQueryEventObject) => this.selected.emit(event))
      .on('swapupdate', (event: JQueryEventObject) => this.updatedEvent.emit(event));

    this.swaplist = this.jQueryElement.data('swaplist');
  }

  /**
  * Destroys any resources created by the control.
  */
  ngOnDestroy() {
    if (this.swaplist) {
      this.swaplist.destroy();
      this.swaplist = null;
    }
  }

  /**
  * Disable the control.
  */
  public disable(): void {
    this.swaplist.disable();
  }

  /**
    * Enable the control.
    */
  public enable(): void {
    this.swaplist.enable();
  }

  public readonly(): void {
    this.swaplist.readonly();
  }


  public setDataset(availableItems: any, selectedItems: any) {
    if (this.swaplist) {
      // @todo Implement when SOHO-5648 complete.
      // this.jQueryElement = jQuery(this.element.nativeElement);
      // this.options = new SohoSwapListOptions();
      // this.options.available = availableItems;
      // this.options.selected = selectedItems;
      // this.jQueryElement.swaplist(this.options);
      // this.swaplist = this.jQueryElement.data('swaplist');
    }
  }
}
