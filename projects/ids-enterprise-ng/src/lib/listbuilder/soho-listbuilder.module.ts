import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SohoButtonModule } from "../button";
import { SohoIconModule } from "../icon";
import { SohoListViewModule } from "../listview";
import { SohoToolbarModule } from "../toolbar";
import { SohoListBuilderComponent } from "./soho-listbuilder.component";

@NgModule({
    imports: [
        CommonModule,
        SohoButtonModule,
        SohoIconModule,
        SohoToolbarModule,
        SohoListViewModule
    ],
    declarations: [
        SohoListBuilderComponent
    ],
    exports: [
        SohoListBuilderComponent
    ]
})
export class SohoListBuilderModule {}