import { computed, reactive } from "vue";

import { parentstruct, testStruct } from "./types"

export const store = reactive(new Map<string,parentstruct[]>())
// export const store = reactive({
//     subtitle:new Map<string,parentstruct[]>()})

// const storage = ()=>{
//     return {store:computed(()=>store)}
// }

