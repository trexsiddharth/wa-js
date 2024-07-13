/*!
 * Copyright 2024 WPPConnect Team
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

import { WPPError } from '../../util';
import { CallModel, CallStore, websocket } from '../../whatsapp';
import { CALL_STATES } from '../../whatsapp/enums';

/**
 * End a call
 *
 * @example
 * ```javascript
 * // End any call
 * WPP.call.end();
 *
 * // End specific call id
 * WPP.call.end(callId);
 *
 * // End any incoming call
 * WPP.on('call.incoming_call', (call) => {
 *   WPP.call.end(call.id);
 * });
 * ```
 *
 * @param   {string}  callId  The call ID, empty to end the first one
 * @return  {[type]}          [return description]
 */
export async function end(callId?: string): Promise<boolean> {
  const callOut = [
    CALL_STATES.ACTIVE,
    CALL_STATES.OUTGOING_CALLING,
    CALL_STATES.OUTGOING_RING,
  ];

  let call: CallModel | undefined = undefined;

  if (callId) {
    call = CallStore.get(callId);
  } else {
    // First outcoming ring or call group
    call = CallStore.findFirst(
      (c) => callOut.includes(c.getState()) || c.isGroup
    );
  }

  if (!call) {
    throw new WPPError(
      'call_not_found',
      `Call ${callId || '<empty>'} not found`,
      {
        callId,
      }
    );
  }

  if (!callOut.includes(call.getState()) && !call.isGroup) {
    throw new WPPError(
      'call_is_not_outcoming_calling',
      `Call ${callId || '<empty>'} is not incoming calling`,
      {
        callId,
        state: call.getState(),
      }
    );
  }

  if (!call.peerJid.isGroupCall()) {
    await websocket.ensureE2ESessions([call.peerJid]);
  }

  const node = websocket.smax(
    'call',
    {
      to: call.peerJid.toString({ legacy: true }),
      id: websocket.generateId(),
    },
    [
      websocket.smax(
        'terminate',
        {
          'call-id': call.id,
          'call-creator': call.peerJid.toString({ legacy: true }),
          // count: '0',
        },
        null
      ),
    ]
  );

  await websocket.sendSmaxStanza(node);

  return true;
}
