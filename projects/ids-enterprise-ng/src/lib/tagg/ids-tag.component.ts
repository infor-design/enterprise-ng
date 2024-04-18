import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	OnDestroy,
	Output,
	booleanAttribute
} from "@angular/core";
import { SohoTagType } from "../tag/soho-tag.component";

@Component({
	selector: '[ids-tag]', // eslint-disable-line
	templateUrl: './ids-tag.component.html',
	styleUrl: './ids-tag.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdsTagComponent implements OnDestroy {
	@Input('ids-tag')
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

	onClick(event: MouseEvent) {
		event.preventDefault();
		const e = { ...event, tag: this }
		// Note: Renamed event to `clicked` because `click` is reserved in angular
		this.clicked.emit(e);
	}

	onDismiss(event: MouseEvent) {
		this.dismissed.emit(this);
		// NOTE: is there an angular way to self-destruct?
		// Removal via nativeElement.remove() does not invoke ngOnDestroy
		this.elementRef.nativeElement.remove();
		this.ngOnDestroy();
	}

	ngOnDestroy() {
		this.destroyed.emit(this);
	}
}