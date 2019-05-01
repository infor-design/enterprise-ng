import {
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';

export class DeprecatedEventEmitter<T> extends EventEmitter<T> {

  constructor(private deprecatedName: string, private newName: string) {
    super();
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any): Subscription {
    console.warn(`"${this.deprecatedName}" event has been deprecated in favor
      of "${this.newName}" and will be removed in the next release.`);
    return super.subscribe(generatorOrNext, error, complete);
  }

}
