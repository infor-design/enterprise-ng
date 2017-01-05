import {
  AfterViewInit,
  Component,
  ChangeDetectionStrategy,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  OnDestroy
} from '@angular/core';

/**
 * soho toolbar more button
 */
@Component({
  selector: 'soho-toolbar-more-button',
  template: `
    <button class="btn-actions page-changer" type="button">
      <svg class="icon" focusable="false" aria-hidden="true" role="presentation">
        <use xlink:href="#icon-more"></use>
      </svg>
      <span class="audible" data-translate="text">More</span>
    </button>
    <!-- TODO: look into handling this through soho-button
    <button soho-button="actions" pageChanger="true" icon="more">
      <span class="audible" data-translate="text">More</span>
    </button>
    -->

    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarMoreButtonComponent {
  @HostBinding('class.more') get isMoreButton() { return true; };
}

/**
 * soho toolbar page title.
 */
@Component({
  selector: 'span[soho-page-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoPageTitleComponent {
  @HostBinding('class.page-title') get isPageTitle() { return true; };
}

/**
 * soho section title.
 */
@Component({
  selector: 'span[soho-section-title]', // tslint:disable-line
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoSectionTitleComponent {
  @HostBinding('class.section-title') get isSectionTitle() { return true; };
}

/**
 * Soho toolbar Navigation button
 */
@Component({
  selector: 'button[soho-nav-button]', // tslint:disable-line
  template: `
      <span class="audible">
        <ng-content></ng-content>
      </span>
      <span class="icon app-header">
        <span class="one"></span>
        <span class="two"></span>
        <span class="three"></span>
      </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarNavButtonComponent {
  @HostBinding('class.application-menu-trigger') get isAppMenuTrigger() { return true; };
  @HostBinding('class.btn-icon') get isIconButton() { return true; };
  @HostBinding('attr.type') get typeAttr() { return 'button'; };
}

/**
 * Soho toolbar title
 */
@Component({
  selector: 'soho-toolbar-title',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarTitleComponent {
  @HostBinding('class.title') get isTitle() { return true; };
}

/**
 * Soho toolbar buttonset
 */
@Component({
  selector: 'soho-toolbar-button-set',
  template: `<ng-content></ng-content>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoToolbarButtonSetComponent {
  @HostBinding('class.buttonset') get isButtonSet() { return true; };
  @HostBinding('style.display') get isInlineBlock() { return 'inline-block'; };
}

/**
 * The main soho toolbar component
 */
@Component({
  selector: 'soho-toolbar',
  templateUrl: './soho-toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.toolbar') get isToolbar() { return true; };
  @HostBinding('style.display') get isBlock() { return 'block'; };
  @HostBinding('class.has-more-button') get showMoreButton() {
    return this.options.hasMoreButton;
  }

  @Input() set hasMoreButton(value: boolean) {
    this.options.hasMoreButton = value;
    if (this.toolbar) {
      this.toolbar.settings.hasMoreButton = value;
      this.toolbar.updated();
    }
  }

  @Input() set maxVisibleButtons(value: number) {
    this.options.maxVisibleButtons = value;
    if (this.toolbar) {
      this.toolbar.settings.maxVisibleButtons = value;
      this.toolbar.updated();
    }
  }

  @Input() set rightAlign(value: boolean) {
    this.options.rightAlign = value;
    if (this.toolbar) {
      this.toolbar.settings.rightAlign = value;
      this.toolbar.updated();
    }
  }

  /**
   * The beforeactivate event is fired whenever a toolbar is activated giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeActivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The activated event is if the beforeActivate succeeds.
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The afteractivate event is fired after the toolbar has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afterActivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The selected event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<SohoToolbarSelectedEvent>}
   */
  @Output() selected: EventEmitter<SohoToolbarSelectedEvent> = new EventEmitter<SohoToolbarSelectedEvent>();

  /**
   * The buttonClicked event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<SohoToolbarEvent>}
   */
  @Output() buttonClicked: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /*
   * Returns information about original button from menu items
   */
  @Output() menuItemClicked: EventEmitter<SohoToolbarMenuItemEvent> = new EventEmitter<SohoToolbarMenuItemEvent>();
  @Output() menuItemMouseOver: EventEmitter<HTMLButtonElement> = new EventEmitter<HTMLButtonElement>();

  private options: SohoToolbarOptions = {};
  private jQueryElement: JQuery;
  private toolbar: SohoToolbarStatic;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.toolbar(this.options);
    this.toolbar = this.jQueryElement.data('toolbar');

    // bind to jquery events and emit as angular events
    this.jQueryElement
    .on('beforeactivate', ((event: JQueryEventObject) => { this.beforeActivate.emit(event); }))
    .on('activated', ((event: JQueryEventObject) => { this.activated.emit(event); }))
    .on('afteractivate', ((event: JQueryEventObject) => { this.afterActivate.emit(event); }))
    .on('selected', (event: JQueryEventObject, item: HTMLButtonElement | HTMLAnchorElement) => {
      this.selected.emit({ event, item });
    });

    // Returns original button info on mouseover event
    this.jQueryElement.find('.more').on('mouseover', 'a', ((event: JQueryEventObject) => {
      const originalButton: HTMLButtonElement = jQuery(event.target).data('originalButton');

      if (originalButton !== undefined) {
        this.menuItemMouseOver.emit(originalButton);
      }
    }));

    // Return item from overflow items and overflow submenu items on mousedown
    // Changed click to mousedown. Event propagation is being stopped in fn.popupmenu()
    // @ handleKeys: function () {} this was preventing events from being returned on
    // overflowed buttons
    this.jQueryElement.on('mousedown', 'a', ((event: JQueryEventObject) => {

      let item = $(event.currentTarget);

      // Get original button info if overflowed
      if ($(event.currentTarget).data().originalButton) {
        item = $(event.currentTarget).data().originalButton;
      }

      const o: any = {
        item: item,
        event: event
      };

      this.menuItemClicked.emit(o);
    }));

    this.toolbar = this.jQueryElement.data('toolbar');
  }

  ngOnDestroy() {
    if (this.toolbar) {
      this.toolbar.destroy();
      this.toolbar = null;
    }
  }

  updated() {
    if (this.toolbar) {
      this.toolbar.updated();
    }
  }
}
