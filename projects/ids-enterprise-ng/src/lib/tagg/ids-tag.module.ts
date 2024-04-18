import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdsTagComponent } from './ids-tag.component';
import { IdsIconModule } from '../iconn/ids-icon.module';
import { IdsTagListComponent } from './ids-tag-list.component';

@NgModule({
	imports: [
		CommonModule,
		IdsIconModule
	],
	declarations: [
		IdsTagListComponent,
		IdsTagComponent
	],
	exports: [
		IdsTagListComponent,
		IdsTagComponent
	],
})
export class IdsTagModule { }
