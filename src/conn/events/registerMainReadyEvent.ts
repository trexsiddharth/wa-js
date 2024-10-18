/*!
 * Copyright 2021 WPPConnect Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { internalEv } from '../../eventEmitter';
import * as webpack from '../../webpack';
import { Cmd, Stream } from '../../whatsapp';

webpack.onInjected(register);
let isMainReady = false;

function register() {
  const trigger = async () => {
    if (!isMainReady) {
      isMainReady = true;
      setTimeout(() => (isMainReady = false), 1000);
      internalEv.emit('conn.main_ready');
    }
  };

  if (Stream.mode === 'MAIN') {
    trigger();
  } else {
    Cmd.on('main_stream_mode_ready', trigger);
    Cmd.on('main_stream_mode_ready_legacy', trigger);
  }
}
