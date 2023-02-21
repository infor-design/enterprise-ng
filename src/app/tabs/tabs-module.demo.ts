import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import { SohoTabsComponent } from 'ids-enterprise-ng';

@Component({
  selector: 'app-tabs-module-demo',
  templateUrl: 'tabs-module.demo.html'
})
export class TabsModuleDemoComponent implements OnInit {
  @ViewChild(SohoTabsComponent, { static: true }) sohoTabsComponent?: SohoTabsComponent;
  private counter = 7;

  addTab() {
    let counter = this.counter;
    const tabId = `order-${counter}`;
    const options = {
      name: `Order ${counter}`,
      isDismissible: true,
      content: `This is the content for Tab ${counter}`
    }

    this.sohoTabsComponent?.add(tabId, options, counter);
    this.counter++;
  }

  ngOnInit() {
    console.log(this.sohoTabsComponent);
  }

  public data: Array<any> = [
    {
      id: 'order-1',
      title: 'Order 1',
      body: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.' // eslint-disable-line
    },
    {
      id: 'order-2',
      title: 'Order 2',
      body: 'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.' // eslint-disable-line
    },
    {
      id: 'order-3',
      title: 'Order 3',
      body: 'It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet ' // eslint-disable-line
    }
    ,
    {
      id: 'order-4',
      title: 'Order 4',
      body: 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! "Now fax quiz Jack!" my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck. A wizard’s job is to vex chumps quickly in fog. Watch "Jeopardy!", Alex Trebek\'s fun TV quiz game. Woven silk pyjamas exchanged for blue quartz.' // eslint-disable-line
    },
    {
      id: 'order-5',
      title: 'Order 5',
      body: 'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure? On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee.' // eslint-disable-line
    },
    {
      id: 'order-6',
      title: 'Order 6',
      body: 'You can define different named build configurations for your project, such as stage and production, with different defaults. Each named configuration can have defaults for any of the options that apply to the various builder targets, such as build, serve, and test. The Angular CLI build, serve, and test commands can then replace files with appropriate versions for your intended target environment.' // eslint-disable-line
    }
  ];
}
