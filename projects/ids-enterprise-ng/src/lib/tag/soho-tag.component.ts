import {
  Component,
  Input,
  HostBinding,
  ElementRef,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  booleanAttribute
} from '@angular/core';

/**
 * Support Tag types.
 *
 * `error` displayed as an error (for example with a red background).
 * `good` displayed to mean correct or valid (for example with a green background).
 * `alert` displayed as an alert (for example with a yellow background).
 * `secondary` displayed as grey - like a secondary button.
 *
 * Leaving the value off the element displays the element in it's default state.
 *
 * Note: You should not use color alone to indicate state, this should be either
 * supplemented with off-screen labels or visual labels near the element explaining the state.
 */
export type SohoTagType = 'error' | 'good' | 'alert' | 'secondary' | 'info' | 'success' | undefined;

@Component({
  selector: '[soho-tag]', // eslint-disable-line
  templateUrl: './soho-tag.component.html',
  styleUrl: './soho-tag.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTagComponent implements OnDestroy {
  @Input('soho-tag')
  @HostBinding('class')
  tagType: SohoTagType;

  @Input({ transform: booleanAttribute })
  @HostBinding('class.is-clickable')
  isClickable = false;

  @Input({ transform: booleanAttribute })
  @HostBinding('class.is-dismissible')
  isDismissible = false;

  @Output() dismissed = new EventEmitter();
  @Output() clicked = new EventEmitter();
  @Output() destroyed = new EventEmitter();

  constructor(public elementRef: ElementRef) { }

  get settings() {
    return {
      content: this.elementRef.nativeElement.textContent
    }
  }

  onClick(event: MouseEvent) {
    event.preventDefault();
    const e = { ...event, tag: this }
    // Note: Renamed event to `clicked` because `click` is reserved in angular
    this.clicked.emit(e);
  }

  onDismiss(event: MouseEvent) {
    const e = { ...event, tag: this }
    this.dismissed.emit(e);
    // NOTE: is there an angular way to self-destruct?
    // Removal via nativeElement.remove() does not invoke ngOnDestroy
    this.elementRef.nativeElement.remove();
    this.destroyed.emit(e);
  }

  ngOnDestroy() {
    console.info('tag destroyed', this.tagType, this.settings)
  }
}
