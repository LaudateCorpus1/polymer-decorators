/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import {computed, customElement, observe, property, query, queryAll} from '../../decorators';

@customElement('test-element')
export class TestElement extends PolymerElement {
  static get template() {
    return html`
      <div id="num">{{aNum}}</div>
      <div id="string">{{aString}}</div>
      <div id="computed">{{computedOne}}</div>
      <div id="computedTwo">{{computedTwo}}</div>
    `;
  }

  @property({notify: true}) aNum: number = 42;

  @property() doesntNotify: boolean = true;

  @property({notify: true}) aString: string = 'yes';

  @property() aBool: boolean = true;

  @property({reflectToAttribute: true}) reflectedString: string = 'yahoo';

  @property({readOnly: true}) readOnlyString: string = '';

  @property({computed: 'computeString(reflectedString)'})
  computedString!: string;

  @property({observer: 'observeString'}) observedString: string = '';

  @property() dependencyOne: string = '';

  @property() dependencyTwo: string = '';

  @computed('dependencyOne')
  get computedOne() {
    return this.dependencyOne;
  }

  @computed('dependencyOne', 'dependencyTwo')
  get computedTwo() {
    return this.dependencyOne + this.dependencyTwo;
  }

  @property({type: String})
  @computed('dependencyOne')
  get computedWithOptions() {
    return this.dependencyOne;
  }

  // stand-in for set function dynamically created by Polymer on read only
  // properties
  _setReadOnlyString!: (value: string) => void;

  lastNumChange: number|undefined;

  lastChange: string|undefined;

  lastMultiChange: any[] = [];

  @query('#num') numDiv!: HTMLDivElement;

  @queryAll('div') divs!: HTMLInputElement[];

  @observe('aNum')
  protected _aNumChanged(newNum: number) {
    this.lastNumChange = newNum;
  }

  ready() {
    super.ready();
    this._setReadOnlyString('initial value')
  }

  @observe('aNum', 'aString')
  protected _numStringChanged(newNum: number, newString: string) {
    this.lastMultiChange = [newNum, newString];
  }

  protected computeString(s: string) {
    return 'computed ' + s;
  }

  protected observeString(s: string) {
    this.lastChange = s;
  }
}
