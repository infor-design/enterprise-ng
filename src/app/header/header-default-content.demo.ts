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
        if (this.router.url === '/header-searchfield') {
            this.description = 'This page is an example of a collapsible searchfield inside the header toolbar.'
        }
    }
}