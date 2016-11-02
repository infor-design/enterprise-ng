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

export type SohoHyperlinkType = 'hide-focus' | 'show-visited' | 'directional' | 'back';

@Component({
  selector: 'a[soho-hyperlink]', // tslint:disable-line
  template: ` <soho-icon *ngIf="isCaretLeft" [icon]="'caret-left'"></soho-icon> 
              <ng-content></ng-content>                      
              <soho-icon *ngIf="isCaretRight" [icon]="'caret-right'"></soho-icon>  
              `,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SohoHyperlinkComponent implements AfterViewInit {

  static HIDEFOCUS: SohoHyperlinkType = 'hide-focus';
  static SHOWVISITED: SohoHyperlinkType = 'show-visited';
  static DIRECTIONAL: SohoHyperlinkType = 'directional';
  static BACK: SohoHyperlinkType = 'back';

  /** The type of the hyperlink, defaulting to 'hide-focus'. */
  @Input('soho-hyperlink') set sohoHyperlink(type: SohoHyperlinkType) {
    this.hyperlinkType = type ? type : SohoHyperlinkComponent.HIDEFOCUS;
  }

  @Input() icon: string;

  @Output() change: EventEmitter<SohoHyperlinkEvent>;

  @HostBinding('class.hyperlink') hyperLinkClass = true;

  @HostBinding('class.hide-focus') get hideFocusClass() {
    if (this.hyperlinkType === SohoHyperlinkComponent.HIDEFOCUS
    || this.hyperlinkType === SohoHyperlinkComponent.DIRECTIONAL
    || this.hyperlinkType === SohoHyperlinkComponent.BACK) {
      return true;
    }
  }

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

  @HostBinding('attr.href') @Input() href: string;

  @HostBinding('attr.disabled') @Input() disabled: boolean;

  @HostBinding('attr.isCaretRight') @Input() isCaretRight: boolean;

  @HostBinding('attr.isCaretLeft') @Input() isCaretLeft: boolean;

  private hyperlinkType: SohoHyperlinkType;
  private jQueryElement: JQuery;

  constructor(private element: ElementRef) { }

  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.element.nativeElement);
    this.jQueryElement.on('change', (event: JQueryEventObject) => this.change.emit(event));

    // no control initializer for hyperlink
  }
}
