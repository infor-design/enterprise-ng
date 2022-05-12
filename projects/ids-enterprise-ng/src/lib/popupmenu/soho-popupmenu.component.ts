import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input, NgZone,
  OnDestroy,
  Output,
} from '@angular/core';

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-HEADING
 */
@Component({
  selector: 'li[soho-popupmenu-heading]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuHeadingComponent {
  @HostBinding('class.heading') get isHeading() {
    return true;
  }
}

/**
 * SUB COMPONENT: SOHO-POPUPMENU-SHORTCUT-TEXT
 */
@Component({
  selector: 'span[soho-popupmenu-shortcut-text]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuShortCutTextComponent {
  @HostBinding('class.shortcut-text') get isShortCutText() {
    return true;
  }
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-SEPARATOR
 */
@Component({
  selector: 'li[soho-popupmenu-separator]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() {
    return true;
  }
  @HostBinding('class.single-selectable-section') @Input() singleSelectableSection = false;
  @HostBinding('class.multi-selectable-section') @Input() multiSelectableSection = false;
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-LABEL
 */
@Component({
  selector: 'a[soho-popupmenu-label]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuItemLabelComponent {
  @HostBinding('attr.href') get hrefAttr() {
    if (this.menuId) {
      return '#' + this.menuId;
    }

    if (this.menuUrl) {
      return this.menuUrl;
    }

    return '#';
  }

  @Input() menuId?: string;
  @Input() menuUrl?: string;
}

/**
 * SUB COMPONENT: SOHO-MENUPOPUPMENU-ITEM
 */
@Component({
  selector: 'li[soho-popupmenu-item]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuItemComponent {
  @HostBinding('class.is-checked') @Input() isChecked?: boolean;
  @HostBinding('class.is-selectable') @Input() isSelectable = false;
  @HostBinding('class.is-disabled') @Input() isDisabled = false;
  @HostBinding('class.is-indented') @Input() isIndented = false;
  @HostBinding('class.submenu') @Input() subMenu = false;
}

/**
 * MAIN COMPONENT: SOHO-MENUPOPUPMENU
 */
@Component({
  selector: 'ul[soho-popupmenu]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoPopupMenuComponent implements AfterViewInit, OnDestroy {

  @Input() set popupmenuOptions(_popupMenuOptions: SohoPopupMenuOptions) {
    this._popupMenuOptions = _popupMenuOptions;
    if (this.jQueryElement) {
      (this.popupmenu as any).settings = _popupMenuOptions;
    }
  }

  get popupmenuOptions(): SohoPopupMenuOptions {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings;
    }

    return this._popupMenuOptions;
  }

  /** id (or jQuery object) of associated drop down list. */
  @Input() set menu(menu: string | JQuery) {
    this._popupMenuOptions.menu = menu;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.menu = menu;
    }
  }

  get menu(): string | JQuery {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.menu;
    }

    return (this._popupMenuOptions as any).menu;
  }

  /** 'click' | 'rightClick' | 'immediate' */
  @Input() set trigger(trigger: SohoPopupMenuTrigger) {
    this._popupMenuOptions.trigger = trigger;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.trigger = trigger;
    }
  }

  get trigger(): SohoPopupMenuTrigger {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.trigger;
    }

    return (this._popupMenuOptions as any).trigger;
  }

  /** Auto Focus */
  @Input() set autoFocus(autoFocus: boolean) {
    this._popupMenuOptions.autoFocus = autoFocus;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.autoFocus = autoFocus;
    }
  }

  get autoFocus(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.autoFocus;
    }

    return (this._popupMenuOptions as any).autoFocus;
  }

  /** Mouse focus. */
  @Input() set mouseFocus(mouseFocus: boolean) {
    this._popupMenuOptions.mouseFocus = mouseFocus;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.mouseFocus = mouseFocus;
    }
  }

  get mouseFocus(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.mouseFocus;
    }

    return (this._popupMenuOptions as any).mouseFocus;
  }

  /** Attach to body. */
  @Input() set attachToBody(attachToBody: boolean) {
    this._popupMenuOptions.attachToBody = attachToBody;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.attachToBody = attachToBody;
    }
  }

  get attachToBody(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.attachToBody;
    }

    return (this._popupMenuOptions as any).attachToBody;
  }

  /** beforeOpen - ajax callback for open event */
  @Input() set beforeOpen(beforeOpen: SohoPopupMenuSourceFunction) {
    this._popupMenuOptions.beforeOpen = beforeOpen;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.beforeOpen = beforeOpen;
    }
  }

  get beforeOpen(): SohoPopupMenuSourceFunction {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.beforeOpen;
    }

    return (this._popupMenuOptions as any).beforeOpen;
  }

  /** Switches aria to use listbox construct instead of menu construct (internal). */
  @Input() set ariaListbox(ariaListbox: boolean) {
    this._popupMenuOptions.ariaListbox = ariaListbox;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.ariaListbox = ariaListbox;
    }
  }

  get ariaListbox(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.ariaListbox;
    }

    return (this._popupMenuOptions as any).ariaListbox;
  }

  /**
   * By default, menus open up underneath their target element.  Set this to true to
   * use mouse coordinates for positioning a menu inside of its target element.
   */
  @Input() set useCoordsForClick(useCoordsForClick: boolean) {
    this._popupMenuOptions.useCoordsForClick = useCoordsForClick;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.useCoordsForClick = useCoordsForClick;
    }
  }

  get useCoordsForClick(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.useCoordsForClick;
    }

    return (this._popupMenuOptions as any).useCoordsForClick;
  }

  /** Can pass in the event object so you can do a right click with immediate */
  @Input() set eventObj(eventObj: any) {
    this._popupMenuOptions.eventObj = eventObj;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.eventObj = eventObj;
    }
  }

  get eventObj(): any {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.eventObj;
    }

    return (this._popupMenuOptions as any).eventObj;
  }

  @Input() set placementOpts(placementOpts: SohoPopupmenuPlacementOpts) {
    this._popupMenuOptions.placementOpts = placementOpts;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.placementOpts = placementOpts;
    }
  }

  get placementOpts(): SohoPopupmenuPlacementOpts {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.placementOpts;
    }

    return (this._popupMenuOptions as any).placementOpts;
  }

  @Input() set offset(offset: SohoPopupmenuOffset) {
    this._popupMenuOptions.offset = offset;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.offset = offset;
    }
  }

  get offset(): SohoPopupmenuOffset {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.offset;
    }

    return (this._popupMenuOptions as any).offset;
  }

  @Input() set removeOnDestroy(removeOnDestroy: boolean) {
    this._popupMenuOptions.removeOnDestroy = removeOnDestroy;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.removeOnDestroy = removeOnDestroy;
    }
  }

  get removeOnDestroy(): boolean {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.removeOnDestroy;
    }

    return (this._popupMenuOptions as any).removeOnDestroy;
  }

  @Input() set attributes(attributes: Array<Object> | Object | undefined) {
    this._popupMenuOptions.attributes = attributes;
    if (this.popupmenu) {
      (this.popupmenu as any).settings.attributes = attributes;
    }
  }

  get attributes(): Array<Object> | Object | undefined {
    if (this.popupmenu) {
      return (this.popupmenu as any).settings.attributes;
    }

    return this._popupMenuOptions.attributes;
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected = new EventEmitter<SohoPopupMenuEvent>();

  @Output() popupmenuafterplace = new EventEmitter<SohoPopupMenuEvent>();

  @Output() beforeopen = new EventEmitter<SohoPopupMenuEvent>();

  /**
   * @todo remove override of native element
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() open = new EventEmitter<SohoPopupMenuEvent>();

  @Output() afteropen = new EventEmitter<SohoPopupMenuEvent>();

  // using output renaming since close conflicts with the close method
  // in this class.
  @Output('close') closeEvent = new EventEmitter<SohoPopupMenuEvent>(); // eslint-disable-line

  // -------------------------------------------
  // Host Bindings
  // -------------------------------------------

  @HostBinding('class.popupmenu') isPopupmenu = true;
  @HostBinding('class.is-selectable') @Input() isSelectable = false;
  @HostBinding('class.is-multiselectable') @Input() isMultiselectable = false;

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  private popupmenu?: SohoPopupMenuStatic;

  private _popupMenuOptions: SohoPopupMenuOptions = {};

  constructor(private elementRef: ElementRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Wrap for later.
      this.jQueryElement = jQuery(this.elementRef.nativeElement);

      // Initialise the SohoXi control.
      this.jQueryElement.popupmenu(this._popupMenuOptions);

      // Once the control is initialised, extract the control plug-in from the element.
      this.popupmenu = this.jQueryElement.data('popupmenu');

      // bind to jquery events and emit as angular events
      this.jQueryElement.on('selected', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.selected.emit({ e, args })));

      this.jQueryElement.on('popupmenuafterplace', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.popupmenuafterplace.emit({ e, args })));

      this.jQueryElement.on('beforeopen', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.beforeopen.emit({ e, args })));

      this.jQueryElement.on('open', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.open.emit({ e, args })));

      this.jQueryElement.on('afteropen', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.afteropen.emit({ e, args })));

      this.jQueryElement.on('close', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.closeEvent.emit({ e, args })));
    });
  }

  /**
   * Returns the selected html element.
   */
  getSelected(): any {
    if (this.popupmenu) {
      return this.ngZone.runOutsideAngular(() => this.popupmenu?.getSelected());
    }
  }

  /**
   * Updates the control to reflect the settings.
   */
  updated(settings: any): void {
    if (this.popupmenu) {
      this.ngZone.runOutsideAngular(() => this.popupmenu?.updated(settings));
    }
  }

  /**
   * Tear down the markup for the popup menu
   */
  teardown(): void {
    if (this.popupmenu) {
      this.ngZone.runOutsideAngular(() => this.popupmenu?.teardown());
    }
  }

  /**
   * Closes the popup menu
   */
  close(isCancelled?: boolean, noFocus?: boolean): void {
    if (this.popupmenu) {
      this.ngZone.runOutsideAngular(() => this.popupmenu?.close(isCancelled, noFocus));
    }
  }

  /**
   * Destroy the markup and any other resources.
   */
  destroy() {
    setTimeout(() => {
      this.ngZone.runOutsideAngular(() => {
        if (this.jQueryElement) {
          this.jQueryElement.off();
          this.jQueryElement = undefined;
        }
        if (this.popupmenu) {
          this.popupmenu.destroy();
          this.popupmenu = undefined;
        }
      });
    }, 200);
  }

  /**
   * Cleanup just before Angular destroys the component.
   * Unsubscribe observables, detach event handlers and remove other resources to avoid memory leaks.
   */
  ngOnDestroy() {
    this.destroy();
  }
}
