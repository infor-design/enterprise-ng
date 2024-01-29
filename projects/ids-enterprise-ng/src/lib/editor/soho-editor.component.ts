import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  NgZone,
  ChangeDetectorRef
} from '@angular/core';

import {
  BaseControlValueAccessor,
  provideControlValueAccessor
} from '../utils/base-control-value-accessor';

@Component({
  selector: '[soho-editor]', // eslint-disable-line
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideControlValueAccessor(SohoEditorComponent)]
})
export class SohoEditorComponent extends BaseControlValueAccessor<any> implements AfterViewInit, AfterViewChecked, OnDestroy {

  // -------------------------------------------
  // Options Block
  // -------------------------------------------

  private options: SohoEditorOptions = {};

  /**
   * Local variables
   */
  /**
   * Flag to force an update of the control after the view is created.
   */
  private runUpdatedOnCheck?: boolean;
  private isDisabled?: boolean = undefined;
  private isReadOnly?: boolean = undefined;

  @HostBinding('class.editor') get isEditor() {
    return true;
  }

  // -------------------------------------------
  // Component Input
  // -------------------------------------------

  /**
   * Enables or disables the control
   */
  @Input() set disabled(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.editor == null) {
      this.isDisabled = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isDisabled = value;

    if (value) {
      this.ngZone.runOutsideAngular(() => {
        this.editor?.disable();
      });
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.editor?.enable();
        this.isReadOnly = false;
      });
    }
  }

  get disabled(): boolean | undefined {
    return this.isDisabled;
  }

  /**
   * Sets the control to readonly
   */
  @Input() set readonly(value: boolean | undefined) {
    // Avoid setting the value if not required,
    // this causes issue on component initialisation
    // as enable() is called by both disabled()
    // and readonly().
    if (this.editor == null) {
      this.isReadOnly = value;
      return;
    }

    // Set the status locally (for refreshing)
    this.isReadOnly = value;
    if (value) {
      this.ngZone.runOutsideAngular(() => this.editor?.readonly());
    } else {
      this.ngZone.runOutsideAngular(() => {
        this.editor?.enable();
        this.isDisabled = false;
      });
    }
  }

  get readonly(): boolean | undefined {
    return this.isReadOnly;
  }

  @Input() set delay(delay: number) {
    this.options.delay = delay;
  }

  @Input() set firstHeader(firstHeader: string) {
    this.options.firstHeader = firstHeader;
  }

  @Input() set secondHeader(secondHeader: string) {
    this.options.secondHeader = secondHeader;
    if (this.editor) {
      this.editor.settings.secondHeader = secondHeader;
      this.markForRefresh();
    }
  }

  @Input() set placeholder(placeholder: string) {
    this.options.placeholder = placeholder;
    if (this.editor) {
      this.editor.settings.placeholder = placeholder;
      this.markForRefresh();
    }
  }

  @Input() set anchor(anchor: SohoEditorAnchor) {
    this.options.anchor = anchor;
    if (this.editor) {
      this.editor.settings.anchor = anchor;
      this.markForRefresh();
    }
  }

  @Input() set image(image: SohoEditorOptionsImage) {
    this.options.image = image;
    this.markForRefresh();
    if (this.editor) {
      this.editor.settings.image = image;
    }
  }

  @Input() set buttons(buttons: SohoEditorButtons) {
    this.options.buttons = buttons;

    if (this.editor) {
      this.editor.settings.buttons = buttons;
      this.markForRefresh();
    }
  }

  @Input() set excludeButtons(buttons: SohoEditorButtons) {
    this.options.excludeButtons = buttons;

    if (this.editor) {
      this.editor.settings.excludeButtons = buttons;
      this.markForRefresh();
    }
  }

  /**
   * onLinkClick Callback for Editor clicks
   */
  @Input() set onLinkClick(value: (e: JQuery.TriggeredEvent, elem: any) => void) {
    this.options.onLinkClick = value;
    if (this.editor) {
      this.editor.settings.onLinkClick = value;
      this.markForRefresh();
    }
  }

  @Input() set showHtmlView(showHtmlView: boolean) {
    this.options.showHtmlView = showHtmlView;
    if (this.editor) {
      this.editor.settings.showHtmlView = showHtmlView;
      this.markForRefresh();
    }
  }

  @Input() set preview(preview: boolean) {
    this.options.preview = preview;
    if (this.editor) {
      this.editor.settings.preview = preview;
      this.markForRefresh();
    }
  }

  @Input() set rows(rows: SohoEditorRows) {
    this.options.rows = rows;

    if (this.editor) {
      this.editor.settings.rows = rows;
      this.markForRefresh();
    }
  }

  @Input() set attributes(attributes: Array<Object> | Object) {
    this.options.attributes = attributes;

    if (this.editor) {
      this.editor.settings.attributes = attributes;
      this.markForRefresh();
    }
  }

  // -------------------------------------------
  // Component Output
  // -------------------------------------------

  /**
   * Called when the editor value changes
   *
   * @todo replace override of native attribute
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() change = new EventEmitter<SohoEditorEvent>();

  /**
   * Called when the editor updates in some way
   */
  @Output() updated = new EventEmitter<SohoEditorEvent>();
  @Output() generateai = new EventEmitter<SohoEditorEvent>();


  // -------------------------------------------
  // Public API
  // -------------------------------------------

  // -------------------------------------------
  // Private Member Data
  // -------------------------------------------

  // Reference to the jQuery control.
  private jQueryElement?: JQuery;

  // Reference to the SoHoXi control api.
  private editor?: SohoEditorStatic | null;

  /**
   * Creates an instance of SohoEditorComponent.
   *
   * @param element the element this component encapsulates.
   * @param ngZone the angualar zone for this component.
   * @param ref reference to the change detector
   */
  constructor(
    private element: ElementRef<HTMLElement>,
    private ngZone: NgZone,
    private ref: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    // call outside the angular zone so change detection
    // isn't triggered by the soho component.
    this.ngZone.runOutsideAngular(() => {
      // Wrap the element in a jQuery selector.
      this.jQueryElement = jQuery(this.element.nativeElement);

      // Initialise the SohoXi Control
      this.jQueryElement.editor(this.options);

      this.editor = this.jQueryElement.data('editor');

      // Bind to jQueryElement's events
      this.jQueryElement
        .on('change', (_e: JQuery.TriggeredEvent, args: SohoEditorEvent) => this.onChange(args))
        .on('generateai', (_e: JQuery.TriggeredEvent, args: SohoEditorEvent) => this.onGenerateAi(args))
        .on('updated', (_e: JQuery.TriggeredEvent, args: SohoEditorEvent) => this.onUpdated(args));

      if (this.internalValue) {
        this.jQueryElement.html(this.internalValue);
      }
    });
  }

  ngAfterViewChecked() {
    if (this.runUpdatedOnCheck) {
      // Ensure the enabled/disabled flags are set.
      if (this.isDisabled !== null) {
        this.disabled = this.isDisabled;
      }
      if (this.isReadOnly !== null) {
        this.readonly = this.isReadOnly;
      }

      this.ngZone.runOutsideAngular(() => {
        // We need to update the control AFTER the model
        // has been updated (assuming there is one), so
        // execute updated after angular has generated
        // the model and the view markup.
        if (this.editor) {
          this.editor.updated();
        }
        this.runUpdatedOnCheck = false;
      });
    }
  }

  /**
   * Handle the control being changed.
   */
  onChange(_event: SohoEditorEvent) {
    this.internalValue = this.jQueryElement?.html();

    super.writeValue(this.internalValue);

    this.ngZone.run(() => {
      this.change.emit(this.internalValue);
    });
  }

  /**
   * Handle the generate AI button being clicked
   */
  onGenerateAi(event: SohoEditorEvent) {
    this.ngZone.run(() => this.generateai.emit(event));
  }

  /**
   * Handle the updated event firing
   */
  onUpdated(event: SohoEditorEvent) {
    this.ngZone.run(() => {
      this.updated.next(event);
    });
  }

  /**
   *
   * @param value Handle model updates.
   */
  writeValue(value: any) {
    if (this.jQueryElement && this.internalValue !== value) {
      this.jQueryElement.html(value);
    }
    super.writeValue(value);
  }

  /**
   * This function is called when the control status changes to or from "DISABLED".
   * Depending on the value, it will enable or disable the appropriate DOM element.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy() {
    this.ngZone.runOutsideAngular(() => {
      if (this.jQueryElement) {
        // remove the event listeners on this element.
        this.jQueryElement.off();
        this.jQueryElement = undefined;
      }

      // Destroy any widget resources.
      if (this.editor) {
        this.editor.destroy();
        this.editor = null;
      }
    });
  }

  /**
   * Marks the components as requiring a rebuild after the next update.
   */
  markForRefresh() {
    // Run updated on the next updated check.
    this.runUpdatedOnCheck = true;

    // ... make sure the change detector kicks in, otherwise if the inputs
    // were change programmatially the component may not be eligible for
    // updating.
    this.ref.markForCheck();
  }
}
