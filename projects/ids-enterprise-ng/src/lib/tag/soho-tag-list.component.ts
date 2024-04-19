import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	HostBinding,
	Output,
	QueryList
} from "@angular/core";
import { SohoTagComponent } from "./soho-tag.component";
import { first, takeUntil } from "rxjs";

@Component({
	selector: '[soho-tag-list]', // eslint-disable-line
	template: '<ng-content></ng-content>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SohoTagListComponent implements AfterContentInit {
	@ContentChildren(SohoTagComponent)
	tags: QueryList<SohoTagComponent> = new QueryList();

	@Output()
	beforeRemove = new EventEmitter();

	@Output()
	afterRemove = new EventEmitter();

	@Output()
	beforeTagRemove = new EventEmitter<SohoTagBeforeRemoveEvent>();

	@HostBinding('class.tag-list') get isTagList() {
		return true;
	}

	ngAfterContentInit() {
		// Note: Attaching event listeners this way because
		// tag components are projected in ng-content 
		this.tags.forEach((tag: SohoTagComponent) => {
			// listen to `clicked` events
			tag.clicked.pipe(takeUntil(tag.destroyed)).subscribe((event: any) => { });

			// listen to 'dismissed' event
			tag.dismissed.pipe(takeUntil(tag.destroyed)).subscribe((event: any) => {
				this.beforeRemove.emit(event);
			});

			// listen to `destroyed`
			tag.destroyed.pipe(first()).subscribe((event: any) => {
				this.afterRemove.emit(event);
			});
		})
	}
}