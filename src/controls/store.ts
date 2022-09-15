import { reactive } from 'vue';

import { parentStruct } from './types'

export const store = reactive(new Map<string,parentStruct[]>())
// export const store = reactive({
//     subtitle:new Map<string,parentstruct[]>()})

// const storage = ()=>{
//     return {store:computed(()=>store)}
// }

