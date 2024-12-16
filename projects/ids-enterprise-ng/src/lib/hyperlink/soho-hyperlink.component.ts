import {
  AfterViewInit,
  Component,
  ElementRef,
  Output,
  EventEmitter,
  HostBinding,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

export type SohoHyperlinkType = 'show-visited' | 'forward-caret' | 'back-caret';

@Component({
    selector: 'a[soho-hyperlink]', // eslint-disable-line
    template: ` <svg soho-icon *ngIf="isCaretLeft" [icon]="'caret-left'"></svg>
              <ng-content></ng-content>
              <svg soho-icon *ngIf="isCaretRight" [icon]="'caret-right'"></svg>
              `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class SohoHyperlinkComponent implements AfterViewInit {

  static SHOWVISITED: SohoHyperlinkType = 'show-visited';
  static DIRECTIONAL: SohoHyperlinkType = 'forward-caret';
  static BACK: SohoHyperlinkType = 'back-caret';

  /**
   * The type of the hyperlink, defaulting to 'hide-focus'.
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('soho-hyperlink') set sohoHyperlink(type: SohoHyperlinkType) {
    if (type) {
      this.hyperlinkType = type;
    }
  }

  @Input() icon?: string;

  /**
   * Sets the expandable-expander class to be placed on the button for the
   * soho-expandablearea to use as it's expand/collapse trigger
   *
   */
  @Input() expandableExpander = false;

  /**
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native, @angular-eslint/no-output-rename
  @Output() change?: EventEmitter<SohoHyperlinkEvent>;

  @HostBinding('class.hyperlink') hyperLinkClass = true;

  @HostBinding('class.show-visited') get showVisitedClass() {
    if (this.hyperlinkType === SohoHyperlinkComponent.SHOWVISITED) {
      return true;
    }
  }

  @HostBinding('class.directional') get directionalClass() {
    if (this.hyperlinkType === SohoHyperlinkComponent.DIRECTIONAL) {
      return true;
    }
  }

  @HostBinding('class.back') get backClass() {
    if (this.hyperlinkType === SohoHyperlinkComponent.BACK) {
      return true;
    }
  }

  @HostBinding('attr.href') @Input() href?: string;

  @HostBinding('attr.disabled') @Input() disabled?: boolean;

  @HostBinding('attr.isCaretRight') @Input() isCaretRight?: boolean;

  @HostBinding('attr.isCaretLeft') @Input() isCaretLeft?: boolean;

  @HostBinding('class.expandable-expander') get isExpandableExpander() {
    return this.expandableExpander;
  }

  private hyperlinkType?: SohoHyperlinkType;
  private jQueryElement?: JQuery;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);

    /*
     * hideFocus() is the plugin used for hyperlink
     * Initialize hideFocus()
     */
    this.jQueryElement.hideFocus();
  }
}
