import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-header-default',
    templateUrl: 'header-default-content.demo.html'
})
export class HeaderDefaultContentDemoComponent implements OnInit {
    public description: String = '';

    constructor(private router: Router) {}

    ngOnInit(): void {
        switch(this.router.url) {
            case '/header-searchfield': 
                this.description = 'This page is an example of a collapsible searchfield inside the header.';
                break;
            case '/header-searchfield-flex':
                this.description = 'This page is an example of a flex searchfield inside the header.';
                break;
            case '/header-searchfield-category':
                this.description = 'This page is an example of a searchfield with categories inside the header';
                break;
            default:
                this.description = 'This is an example page'
                break;
        }
    }
}