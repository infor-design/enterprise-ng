///<reference path="./typings/tsd.d.ts" />

// angular imports
import {provide} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from "@angular/http";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {LocationStrategy, PathLocationStrategy} from "@angular/common";
import {AppComponent} from "./app.component";

// import "rxjs/add/operator/map";
// import "rxjs/add/operator/do";
// import "rxjs/add/operator/catch";

bootstrap(<any>AppComponent, [
    ROUTER_PROVIDERS,
    HTTP_PROVIDERS,
    provide(LocationStrategy, {useClass: PathLocationStrategy})
]);