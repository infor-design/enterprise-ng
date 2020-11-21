import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input, NgZone,
  OnDestroy,
  Output
} from '@angular/core';

/**
 * SUB COMPONENT: SOHO-CONTEXT-MENU-HEADING
 */
@Component({
  selector: 'li[soho-context-menu-heading]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoContextMenuHeadingComponent {
  @HostBinding('class.heading') get isHeading() {
    return true;
  }
}

/**
 * SUB COMPONENT: SOHO-CONTEXT-MENU-SHORTCUT-TEXT
 */
@Component({
  selector: 'span[soho-context-menu-shortcut-text]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoContextMenuShortCutTextComponent {
  @HostBinding('class.shortcut-text') get isShortCutText() {
    return true;
  }
}

/**
 * SUB COMPONENT: SOHO-CONTEXT-MENU-SEPARATOR
 */
@Component({
  selector: 'li[soho-context-menu-separator]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoContextMenuSeparatorComponent {
  @HostBinding('class.separator') get isSeparator() {
    return true;
  }
  @HostBinding('class.single-selectable-section') @Input() singleSelectableSection = false;
  @HostBinding('class.multi-selectable-section') @Input() multiSelectableSection = false;
}

/**
 * SUB COMPONENT: SOHO-CONTEXT-MENU-LABEL
 */
@Component({
  selector: 'a[soho-context-menu-label]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoContextMenuItemLabelComponent {
  @HostBinding('attr.href') get hrefAttr() {
    if (this.menuId) {
      return '#' + this.menuId;
    }
    if (this.menuUrl) {
      return this.menuUrl;
    }
    return '#';
  }
  @Input() menuId: string;
  @Input() menuUrl: string;
}

/**
 * SUB COMPONENT: SOHO-CONTEXT-MENU-ITEM
 */
@Component({
  selector: 'li[soho-context-menu-item]', // eslint-disable-line
  template: `<ng-content></ng-content>`
})
export class SohoContextMenuItemComponent {
  @HostBinding('class.is-checked') @Input() isChecked: boolean;
  @HostBinding('class.is-selectable') @Input() isSelectable = false;
  @HostBinding('class.is-disabled') @Input() isDisabled = false;
  @HostBinding('class.is-indented') @Input() isIndented = false;
  @HostBinding('class.submenu') @Input() subMenu = false;
}

/**
 * MAIN DIRECTIVE: SOHO-CONTEXT-MENU
 */
@Directive({
  selector: '[soho-context-menu]', // eslint-disable-line
})

export class SohoContextMenuDirective implements AfterViewInit, OnDestroy {
  private jQueryElement: JQuery;
  private contextMenu: SohoPopupMenuStatic;

  // -------------------------------------------
  // Default options block
  // -------------------------------------------
  private options: SohoPopupMenuOptions = {
    trigger: 'rightClick'
  };

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  @Output() selected = new EventEmitter<SohoContextMenuEvent>();
  @Output() beforeopen = new EventEmitter<SohoContextMenuEvent>();

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() open = new EventEmitter<SohoContextMenuEvent>();

  // using output renaming since close conflicts with the close method
  // in this class.
  @Output('close') closeEvent = new EventEmitter<SohoContextMenuEvent>(); // eslint-disable-line

  // -------------------------------------------
  // Component Inputs

  @Input() set trigger(trigger: SohoPopupMenuTrigger) {
    this.options.trigger = trigger;
    if (this.contextMenu) {
      this.contextMenu.settings.trigger = trigger;
      this.contextMenu.updated();
    }
  }

  @Input() set menu(menu: string) {
    this.options.menu = menu;
    if (this.contextMenu) {
      this.contextMenu.settings.menu = menu;
      this.contextMenu.updated();
    }
  }

  /** Auto Focus */
  @Input() set autoFocus(autoFocus: boolean) {
    this.options.autoFocus = autoFocus;
    if (this.contextMenu) {
      this.contextMenu.settings.autoFocus = autoFocus;
    }
  }

  get autoFocus(): boolean {
    if (this.contextMenu) {
      return this.contextMenu.settings.autoFocus;
    }
    return this.options.autoFocus;
  }

  /** Mouse focus. */
  @Input() set mouseFocus(mouseFocus: boolean) {
    this.options.mouseFocus = mouseFocus;
    if (this.contextMenu) {
      this.contextMenu.settings.mouseFocus = mouseFocus;
    }
  }

  get mouseFocus(): boolean {
    if (this.contextMenu) {
      return this.contextMenu.settings.mouseFocus;
    }
    return this.options.mouseFocus;
  }

  /** Attach to body. */
  @Input() set attachToBody(attachToBody: boolean) {
    this.options.attachToBody = attachToBody;
    if (this.contextMenu) {
      this.contextMenu.settings.attachToBody = attachToBody;
    }
  }

  get attachToBody(): boolean {
    if (this.contextMenu) {
      return this.contextMenu.settings.attachToBody;
    }
    return this.options.attachToBody;
  }

  @Input() set placementOpts(placementOpts: SohoPopupmenuPlacementOpts) {
    this.options.placementOpts = placementOpts;
    if (this.contextMenu) {
      this.contextMenu.settings.placementOpts = placementOpts;
    }
  }

  get placementOpts(): SohoPopupmenuPlacementOpts {
    if (this.contextMenu) {
      return this.contextMenu.settings.placementOpts;
    }
    return this.options.placementOpts;
  }

  @Input() set offset(offset: SohoPopupmenuOffset) {
    this.options.offset = offset;
    if (this.contextMenu) {
      this.contextMenu.settings.offset = offset;
    }
  }

  get offset(): SohoPopupmenuOffset {
    if (this.contextMenu) {
      return this.contextMenu.settings.offset;
    }
    return this.options.offset;
  }

  @Input() set removeOnDestroy(removeOnDestroy: boolean) {
    this.options.removeOnDestroy = removeOnDestroy;
    if (this.contextMenu) {
      this.contextMenu.settings.removeOnDestroy = removeOnDestroy;
    }
  }

  get removeOnDestroy(): boolean {
    if (this.contextMenu) {
      return this.contextMenu.settings.removeOnDestroy;
    }
    return this.options.removeOnDestroy;
  }

  /** beforeOpen - ajax callback for open event */
  @Input() set beforeOpen(beforeOpen: SohoPopupMenuSourceFunction) {
    this.options.beforeOpen = beforeOpen;
    if (this.contextMenu) {
      this.contextMenu.settings.beforeOpen = beforeOpen;
    }
  }

  get beforeOpen(): SohoPopupMenuSourceFunction {
    if (this.contextMenu) {
      return this.contextMenu.settings.beforeOpen;
    }
    return this.options.beforeOpen;
  }

  constructor(private element: ElementRef, private ngZone: NgZone) { }

  ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      this.jQueryElement = jQuery(this.element.nativeElement);
      this.jQueryElement.popupmenu(this.options);
      this.contextMenu = this.jQueryElement.data('popupmenu');

      // Add listeners to emit events
      this.jQueryElement.on('selected', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.selected.next({ e, args })));

      this.jQueryElement.on('beforeopen', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.beforeopen.emit({ e, args })));

      this.jQueryElement.on('close', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.closeEvent.emit({ e, args })));

      this.jQueryElement.on('open', (e: JQuery.TriggeredEvent, args: JQuery) =>
        this.ngZone.run(() => this.open.emit({ e, args })));
    });
  }

  updated() {
    this.ngZone.runOutsideAngular(() => this.contextMenu.updated());
  }

  teardown() {
    this.ngZone.runOutsideAngular(() => this.contextMenu.teardown());
  }

  /**
   * Closes the popup menu
   *
   * @param isCancelled Internally set option used if the operation is a cancel.
   *  Wont matter for manual api call.
   * @param noFocus Do not return focus to the calling element (fx a button)
   */
  close(isCancelled?: boolean, noFocus?: boolean): void {
    if (this.contextMenu) {
      this.ngZone.runOutsideAngular(() => this.contextMenu.close(isCancelled, noFocus));
    }
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        this.jQueryElement.off();
      }
      if (this.contextMenu) {
        // @todo raise an issue on this failing on removeData!
        // this.menuButton.destroy();
        this.contextMenu.destroy();
        this.contextMenu = null;
      }
    });
  }
}
