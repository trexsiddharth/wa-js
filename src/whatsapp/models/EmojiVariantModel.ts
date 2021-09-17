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

import { exportProxyModel } from '../exportModule';
import {
  Model,
  ModelOptions,
  ModelPropertiesContructor,
  ModelProxy,
} from './Model';

interface Props {
  id?: any;
  variant?: any;
}

interface Session {
  stale?: any;
}

interface Derived {}

/**
 * @whatsapp 2.2126.14:82781
 * @whatsapp 2.2136.9:14996
 * @whatsapp 2.2136.10:14996
 */
export declare interface EmojiVariantModel
  extends ModelProxy<Props, Session, Derived> {}

/**
 * @whatsapp 2.2126.14:82781
 * @whatsapp 2.2136.9:14996
 * @whatsapp 2.2136.10:14996
 */
export declare class EmojiVariantModel extends Model {
  constructor(
    proterties?: ModelPropertiesContructor<EmojiVariantModel>,
    options?: ModelOptions
  );
}

exportProxyModel(exports, 'EmojiVariantModel');
