/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {GestureEventListeners} from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

import {DeclarativeEventListeners} from '../../declarative-event-listeners';
import {customElement, listen, property} from '../../decorators';

@customElement('gesture-listener-test-element')
export class GestureListenerTestElement extends DeclarativeEventListeners
(GestureEventListeners(PolymerElement)) {
  static get template() {
    return html`
      <style>
        .event-area {
          height: 100px;
          width: 100px;
          border: 1px solid #000000;
          margin: 32px;
        }
      </style>
      <div class="event-area" id="tapRegion"></div>
    `;
  }

  @property() elementClickCounter: number = 0;

  @property() nonGestureElementClickCounter: number = 0;

  @property() documentClickCounter: number = 0;

  @property() windowClickCounter: number = 0;

  @listen('tap', 'tapRegion')
  elementTapEventHandler(_e: Event) {
    this.elementClickCounter++;
  }

  @listen('tap', document)
  documentTapEventHandler(_e: Event) {
    this.documentClickCounter++;
  }

  @listen('tap', window)
  windowTapEventHandler(_e: Event) {
    this.windowClickCounter++;
  }

  @listen('element-event', 'tapRegion')
  elementEventHandler(_e: Event) {
    this.nonGestureElementClickCounter++;
  }
}
