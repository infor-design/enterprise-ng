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
import { IdsTagComponent } from "./ids-tag.component";
import { first, takeUntil } from "rxjs";

@Component({
	selector: '[ids-tag-list]', // eslint-disable-line
	template: '<ng-content></ng-content>',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdsTagListComponent implements AfterContentInit {
	@ContentChildren(IdsTagComponent)
	tags: QueryList<IdsTagComponent> = new QueryList();

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
		this.tags.forEach((tag: IdsTagComponent) => {
			// listen to `clicked` events
			tag.clicked.pipe(takeUntil(tag.destroyed)).subscribe((_tag: IdsTagComponent) => {
				console.log('tag list tag clicked', _tag);
			});

			// listen to 'dismissed' event
			tag.dismissed.pipe(takeUntil(tag.destroyed)).subscribe((_tag: IdsTagComponent) => {
				console.log('tag list tag dismissed', _tag);
				this.beforeRemove.emit(_tag);
			});

			// listen to `destroyed`
			tag.destroyed.pipe(first()).subscribe((_tag: IdsTagComponent) => {
				console.log('tag list tag destroyed', _tag);
				this.afterRemove.emit(_tag);
			});
		})
	}
}