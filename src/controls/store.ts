import { reactive } from 'vue';

import { parentStruct } from './types'
// interface storeState {
//     state:Map<string,parentStruct[]>
// }
export const store = reactive({ state : new Map<string,parentStruct[]>() })
