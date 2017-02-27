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
} from '@angular/core';

@Component({
  selector: 'soho-swaplist',
  templateUrl: './soho-swaplist.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoSwapListComponent implements AfterViewInit, OnDestroy {


  // TODO
  // Need to add titles of sections.
  // Need to add tempalte capability
  // Finish off integration with code.
  // More demo examples.

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

  /**
   * Displayed items.
   */
  private _allItems: any;

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
  public set allItems(allItems: any[]) {
    this._allItems = allItems;
  }

  public get allItems(): any[] {
    return this._allItems;
  }

  @Input()
  public set availableItems(value: any[]) {
    this._options.available = value;
  }

  public get availableItems(): any[] {
    return this._options.available;
  }

  @Input()
  public set selectedItems(value: any[]) {
    this._options.selected = value;
  }

  public get selectedItems(): any[] {
    return this._options.selected;
  }

  constructor(private element: ElementRef) {
  }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.swaplist(this._options);

    this.jQueryElement
      .on('selected', (event: JQueryEventObject) => this.selected.emit(event))
      .on('updated', (event: JQueryEventObject) => this.updatedEvent.emit(event));

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
      // this.jQueryElement = jQuery(this.element.nativeElement);
      // this.options = new SohoSwapListOptions();
      // this.options.available = availableItems;
      // this.options.selected = selectedItems;
      // this.jQueryElement.swaplist(this.options);
      // this.swaplist = this.jQueryElement.data('swaplist');
    }
  }
}
