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
  templateUrl: 'toolbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SohoToolbarComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class.toolbar') get isToolbar() { return true; };
  @HostBinding('style.display') get isBlock() { return 'block'; };
  @HostBinding('class.has-more-button') get showMoreButton() {
    return this.hasMoreButton;
  }

  @Input() hasMoreButton:  boolean = false;
  @Input() maxVisibleButtons: number = 3;
  @Input() rightAlign: boolean = false;

  /**
   * The beforeactivate event is fired whenever a toolbar is activated giving the event handler a chance
   * to "veto" the tab selection change.
   * @type {EventEmitter<Object>}
   */
  @Output() beforeactivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The activated event is if the beforeActivate succeeds.
   * @type {EventEmitter<Object>}
   */
  @Output() activated: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The afteractivate event is fired after the toolbar has been activated.
   * @type {EventEmitter<Object>}
   */
  @Output() afteractivate: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The selected event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<SohoToolbarEvent>}
   */
  @Output() selected: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  /**
   * The buttonClicked event is fired when a toolbar button has been clicked.
   * @type {EventEmitter<SohoToolbarEvent>}
   */
  @Output() buttonClicked: EventEmitter<SohoToolbarEvent> = new EventEmitter<SohoToolbarEvent>();

  private jQueryElement: any;
  private toolbar: any;

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    // Assign element to local variable
    this.jQueryElement = jQuery(this.element.nativeElement);

    this.jQueryElement.toolbar({
      maxVisibleButtons: this.maxVisibleButtons,
      rightAlign : this.rightAlign
    });

    // bind to jquery events and emit as angular events
    this.jQueryElement.on('beforeactivate', ((event: SohoToolbarEvent) => { this.beforeactivate.emit(event); }));
    this.jQueryElement.on('activated', ((event: SohoToolbarEvent) => { this.activated.emit(event); }));
    this.jQueryElement.on('afteractivate', ((event: SohoToolbarEvent) => { this.afteractivate.emit(event); }));

    this.jQueryElement.on('selected', (event: SohoToolbarEvent, item: HTMLButtonElement|HTMLAnchorElement) => {
      event.item = item;
      this.selected.emit(event);
    });

    this.toolbar = this.jQueryElement.data('toolbar');
  }

  ngOnDestroy() {
    if (this.jQueryElement) {
      this.jQueryElement.destroy();
      this.jQueryElement = null;
    }
  }

  updated() {
    if (this.toolbar) {
      this.toolbar.updated();
    }
  }
}
