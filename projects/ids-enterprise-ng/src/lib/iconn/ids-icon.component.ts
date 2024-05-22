import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { pathData } from "./path-data";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
	selector: '[ids-icon]', // eslint-disable-line
	templateUrl: './ids-icon.component.html',
	styleUrl: './ids-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdsIconComponent implements OnInit {
	@Input('icon') icon: string = '';
	@Input('size') size: string = 'md'

	public viewBox = '0 0 18 18';
	public pathData = pathData;
	public iconPath: SafeHtml = '';

	constructor(public sanitizer: DomSanitizer) { }

	ngOnInit(): void {
		// NOTE: Because our icons are built using path templates,
		// we need to use `sanitizer` to bypass security
		this.iconPath = this.sanitizer.bypassSecurityTrustHtml(this.pathData[this.icon]);
	}
}