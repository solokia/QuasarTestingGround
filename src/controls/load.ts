// import store from "./store"
// import { parentstruct, testStruct } from "./types"

// export const load= ()=>{
//     const {store} = storage()
//     let arr: parentstruct[]
//     for(let i = 0 ; i<3;i++){
//         arr=[]
//         for(let x = 0; x<100;x++){
//             const test:testStruct = {
//                 tid: x+i,
//                 b: `${x}`
//             }
//             const newItem:parentstruct = {
//                 id: x,
//                 d: `item ${x}`,
//                 e: test,
//                 aid:i
//             }
//             arr.push(newItem)
//         }
//         console.log("test")
//         // store.set(`${i}`,arr)
//         store.value.subtitles.set(`${i}`,arr)
//     }
//     return
// }