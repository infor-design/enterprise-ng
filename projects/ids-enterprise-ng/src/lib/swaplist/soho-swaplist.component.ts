import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ContentChild
} from '@angular/core';

import { SohoSwapListService } from './soho-swaplist.service';

export type SohoSwapListCardType = 'available' | 'selected' | 'full-access';

/**************************************************************
 * SWAP LIST CARD
 **************************************************************/
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
          <div class="listview-search" *ngIf="showSearchable">
            <label class="audible" for="searchfield-{{cardType}}">{{searchTitle}}</label>
            <input class="searchfield" placeholder="{{searchTitle}}" name="searchfield-{{cardType}}"
             id="searchfield-{{cardType}}" data-init="false">
          </div>
          <div class="listview"></div>
        </div>
      </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSwapListCardComponent {
  @HostBinding('class.swaplist') get isSwapList() {
    return true;
  }

  /** The type of card. */
  private cardtype: SohoSwapListCardType;

  /** The title for the card. */
  private cardtitle: string;

  /** The show searchable for the search-field. */
  private showsearchable: boolean;

  /** The show searchable for the search-field. */
  private searchtitle: string;

  @Input()
  public set type(value: SohoSwapListCardType) {
    this.cardtype = value;
  }

  @Input()
  public set showSearchable(value: boolean) {
    this.showsearchable = value;
  }

  public get showSearchable(): boolean {
    return this.showsearchable;
  }

  @Input()
  public set searchTitle(value: string) {
    this.searchtitle = value;
  }

  public get searchTitle(): string {
    return this.searchtitle;
  }

  /**
   * Return the class to use for the card.
   */
  public get cardClass(): string {
    return `card${this.cardtype ? ` ${this.cardtype}` : ''}`;
  }

  /**
   * Return the card type to use for the card.
   */
  public get cardType(): string {
    return this.cardtype || '';
  }

  /**
   * Title of the card, e.g. 'Available'.
   */
  @Input()
  public set title(value: string) {
    this.cardtitle = value;
  }

  public get title(): string {
    return this.cardtitle;
  }
}

/**************************************************************
 * SWAP LIST
 **************************************************************/
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

  /** Flag controlling the display of the full access (additional) items. */
  private _showFullAccessCard = false;

  /**
   * Assign the id for the control
   * (maps to the name to use on a label's 'for' attribute)
   */
  @HostBinding('id') get id() {
    return this.name;
  }

  /** Adds the 'swaplist' class required by the SoHoXi control. */
  @HostBinding('class.swaplist') get isSwapList() {
    return true;
  }

  /** Adds the 'one-third' class required when full access is set. */
  @HostBinding('class.one-third') get isOneThird() {
    return this.showFullAccessCard;
  }

  /** The component used to represent the available items. */
  @ContentChild('available', { static: true }) private _availableCard: SohoSwapListCardComponent = null;

  /** The component used to represent the selected items. */
  @ContentChild('selected', { static: true }) private _selectedCard: SohoSwapListCardComponent = null;

  /** The component used to represent the full access (additional) items. */
  @ContentChild('additional', { static: true }) private _additionalCard: SohoSwapListCardComponent = null;

  // ------------------------------------------------------------------------
  // @Inputs
  // ------------------------------------------------------------------------
  /** Name for the swaplist control. Necessary for ngModel to function. */
  @Input() name = `soho-swaplist-${SohoSwapListComponent.counter++}`;

  /** Default title for available items card. */
  @Input()
  public availableCardTitle = Soho.Locale.translate('Available');

  /** Default title for selected items card. */
  @Input()
  public selectedCardTitle = Soho.Locale.translate('Selected');

  /** Default title for additional items card. */
  @Input()
  public fullAccessCardTitle = Soho.Locale.translate('AdditionalItems');

  /** Default search title for available items card. */
  @Input()
  public availableCardSearchTitle = Soho.Locale.translate('SearchAvailable');

  /** Default search title for selected items card. */
  @Input()
  public selectedCardSearchTitle = Soho.Locale.translate('SearchSelected');

  /** Default search title for additional items card. */
  @Input()
  public fullAccessCardSearchTitle = Soho.Locale.translate('SearchAdditionalItems');

  /** Default button text for select. */
  @Input()
  public btnMoveToSelect = Soho.Locale.translate('Select');

  /** Default button text for move to left. */
  @Input()
  public btnMoveToLeft = Soho.Locale.translate('MoveToLeft');

  /** Default button text for  move to right. */
  @Input()
  public btnMoveToRight = Soho.Locale.translate('MoveToRight');

  /**
   * Set searchable option for SohoSwapList.
   *
   * @param value option.
   */
  @Input()
  public set searchable(value: boolean) {
    this._options.searchable = value;
  }
  public get searchable(): boolean {
    return this._options.searchable;
  }

  /** Add extra attributes like id's to the component **/
  @Input()
  public set attributes(value: Array<Object> | Object) {
    this._options.attributes = value;
  }
  public get attributes(): Array<Object> | Object {
    return this._options.attributes;
  }

  /**
   * Set available card items.
   *
   * @param value item data.
   */
  @Input()
  public set availableItems(value: SohoSwapListItem[]) {
    this._options.available = value;
    if (this.swaplist) {
      this.swaplist.settings.available = value;
      this.swaplist.updated();
    }
  }

  /**
   * Return the dataset currently available card items.
   *
   * @return an array of SohoSwapListItem.
   */
  public get availableItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getAvailable());
  }

  /**
   * Set selected card items.
   *
   * @param value item data.
   */
  @Input()
  public set selectedItems(value: SohoSwapListItem[]) {
    this._options.selected = value;
    if (this.swaplist) {
      this.swaplist.settings.selected = value;
      this.swaplist.updated();
    }
  }

  /**
   * Return the dataset currently selected card items.
   *
   * @return an array of SohoSwapListItem.
   */
  public get selectedItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getSelected());
  }

  /**
   * Set additional card items.
   *
   * @param value item data.
   */
  @Input()
  public set additionalItems(value: SohoSwapListItem[]) {
    this._options.additional = value;
    if (this.swaplist) {
      this.swaplist.settings.additional = value;
      this.swaplist.updated();
    }
  }

  /**
   * Return the dataset currently additional card items.
   *
   * @return an array of SohoSwapListItem.
   */
  public get additionalItems(): SohoSwapListItem[] {
    return this.ConvertToModel(this.swaplist.getAdditional());
  }

  /**
   * Set flag to display third card full access card or not.
   *
   * @param value the value to show full access card.
   */
  @Input()
  public set showFullAccessCard(value: boolean) {
    this._showFullAccessCard = value === null || value as any === 'true';
  }

  /**
   * Return the value whether full access card displayed.
   *
   * @return boolean value.
   */
  public get showFullAccessCard(): boolean {
    return this._showFullAccessCard;
  }

  /**
   * Called before swap item/s.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('beforeswap')
  public beforeSwapEvent = new EventEmitter<SohoSwapListBeforeSwapEvent>();

  /**
   * Called when the swap list updates in some way.
   */
  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('updated')
  public updateEvent = new EventEmitter<SohoSwapListSwapUpdateEvent>();

  // ------------------------------------------------------------------------
  // Constructor
  // ------------------------------------------------------------------------
  constructor(
    private element: ElementRef,
    private ngZone: NgZone,
    @Optional() private swaplistService: SohoSwapListService) {
  }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.find('.searchfield').searchfield({ clearable: true });
      this.jQueryElement.swaplist(this._options);

      this.jQueryElement
        .on('beforeswap', (event: JQuery.TriggeredEvent, moved: SohoSwapListMoved) => this.onBeforeSwap(event, moved))
        .on('swapupdate', (event: JQuery.TriggeredEvent, moved: SohoSwapListMoved) => this.onSwapUpdate(event, moved));

      this.swaplist = this.jQueryElement.data('swaplist');

      if (this.swaplistService) {
        this.swaplistService.getData().subscribe((d: SohoSwapListOptions) => {
          this.updateDataset(d);
        });
      }
    });
  }

  /**
   * Destroys any resources created by the control.
   */
  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.swaplist) {
        this.swaplist.destroy();
        this.swaplist = null;
        this.jQueryElement.off();
      }
    });
  }

  /**
   * In case the list data is being bound asynchronously or modified on the fly,
   * you will need to trigger updated on so it updates the list(s).
   */
  public updated() {
    if (this.swaplist) {
      this.ngZone.runOutsideAngular(() => this.swaplist.updated());
    }
  }

  /**
   * Updates the dataset used by the swaplist, dynamically refesing the
   * control's view.
   *
   * @param dataset the dataset to assign.
   */
  public updateDataset(dataset: SohoSwapListOptions) {
    this._options.available = dataset.available;
    this._options.selected = dataset.selected;
    this._options.additional = dataset.additional;
    if (this.swaplist) {
      this.swaplist.updateDataset(this._options);
    }
  }

  /**
   * Converts the list of items into a list of swaplist items.
   *
   * @param items data to convert to item model.
   *
   * @todo remove any
   */
  private ConvertToModel(items: any[]): SohoSwapListItem[] {
    const results = [];
    for (const item of items) {
      results.push({ id: item.id, value: item.value, text: item.text });
    }
    return results;
  }

  private onBeforeSwap(event: SohoSwapListBeforeSwapEvent, moved: SohoSwapListMoved) {
    event.moved = moved;
    this.beforeSwapEvent.emit(event);
  }

  private onSwapUpdate(event: SohoSwapListSwapUpdateEvent, moved: SohoSwapListMoved) {
    event.moved = moved;
    this.updateEvent.emit(event);
  }
}
