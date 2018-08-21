import {
  EventEmitter
} from '@angular/core';

export class DeprecatedEventEmitter<T> extends EventEmitter<T> {

  constructor(private deprecatedName: string, private newName: string) {
    super();
  }

  subscribe(generatorOrNext?: any, error?: any, complete?: any) {
    console.warn(`"${this.deprecatedName}" event has been deprecated in favor
      of "${this.newName}" and will be removed in the next release.`);
    super.subscribe(generatorOrNext, error, complete);
  }

}
