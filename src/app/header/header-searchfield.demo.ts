import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-searchfield-header-demo',
    templateUrl: 'header-searchfield.demo.html'
})
export class HeaderSearchfieldDemoComponent {
  
  constructor(private router: Router) {}

  getRoute() {
    switch(this.router.url) {
      case '/header-searchfield': return 'search';
    }
    return 'default';
  }
}