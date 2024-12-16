import { Component } from '@angular/core';

@Component({
    selector: 'app-homepage-scenario-d-demo',
    templateUrl: 'homepage-scenario-d.demo.html',
    standalone: false
})
export class HomePageScenarioDDemoComponent {
    banner: SohoHomePageBannerOptions = {
        image: 'https://img.freepik.com/free-photo/abstract-sale-busioness-background-banner-design-multipurpose_1340-16809.jpg?w=2000&t=st=1714724265~exp=1714724865~hmac=966730f0c5207f83b729e74530994ebdedea820f7ede0492ca1ca2089fe59f33',
        icon: {
            image: 'https://www.nicepng.com/png/full/920-9202759_starbucks-logo-transparent-background-starbucks-icon-png.png'
        }
    }
}
