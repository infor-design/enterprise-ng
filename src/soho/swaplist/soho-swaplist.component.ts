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

type SohoSwapListCardType = 'available' | 'selected' | 'full-access';

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
  private _type: SohoSwapListCardType;

  /**
   * The title for the card.
   */
  private _title: string;

  @Input()
  public set type(value: SohoSwapListCardType) {
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
  /** Used to provide unnamed controls with a unique id. */
  private static counter = 0;

  /** Selector for originating element. */
  private jQueryElement: JQuery;

  /** Reference to the SoHoXi control api. */
  private swaplist: SohoSwapListStatic;

  /** Block of options, use the accessors to modify. */
  private _options: SohoSwapListOptions = {};

  //
  private _showFullAccessCard: boolean = false;

  // Get the header DOM element
  @ContentChild('available')
  private _availableCard: SohoSwapListCardComponent = null;

  @ContentChild('selected')
  private _selectedCard: SohoSwapListCardComponent = null;

  @ContentChild('additional')
  private _additionalCard: SohoSwapListCardComponent = null;

  /**
   * Name for the swaplist control. Necessary for ngModel to function.
   */
  @Input() name: string = `soho-swaplist-${SohoSwapListComponent.counter++}`;

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
    return this.showFullAccessCard;
  }

  /**
   * Called when the swap list value changes.
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
  public set availableItems(value: SohoSwapListItem[]) {
    // todo: comfirm with the new dataset API
    this._options.available = value;
  }

  public get availableItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getAvailable());
  }

  @Input()
  public set selectedItems(value: SohoSwapListItem[]) {
    this._options.selected = value;
  }

  public get selectedItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getSelected());
  }

  @Input()
  public set additionalItems(value: SohoSwapListItem[]) {
    this._options.additional = value;
  }

  public get additionalItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getAdditional());
  }

  @Input()
  public set showFullAccessCard(value: boolean) {
    this._showFullAccessCard = value === null || <any>value === 'true';
  }

  public get showFullAccessCard(): boolean {
    return this._showFullAccessCard;
  }

  /** Constructor. */
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

  private ConvertToModel(items: any[]): SohoSwapListItem[] {
    const results = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      results.push({ id: item.id, value: item.value, text: item.text });
    }
    return results;
  }

}
