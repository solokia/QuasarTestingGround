
import {store}  from "./store"
import { parentstruct,testStruct } from "./types"


const controller = ()=>{
    // const {store}=storage()
    const add=(parent:parentstruct) =>{
        const items= store.get(parent.aid.toString())
        items?.push(parent)
    }
    const del =(aid:number,id:number)=>{
        const items = store.get(`${aid}`)
        if(items){
            const idx =items.findIndex((item)=>{return item.id==id})
            items.splice(idx,1)
        }
    }
    const modD = (parent:parentstruct)=>{
        const items= store.get(parent.aid.toString())
        if(items){
            const idx =items.findIndex((item)=>{return item.id==parent.id})
            items[idx].d=parent.d
        }
    }
    const modReplace = (parent:parentstruct,txt:string)=>{
        
        const items= store.get(parent.aid.toString())
        
        if(items){
            
            const idx =items.findIndex((item)=>{return item.id==parent.id})
            console.log(`before mod ${items[idx].d}`)
            console.log(items[idx].d.length)
            if(items[idx].d.length<9)
                parent.d = txt
            else
                items[idx].d = 'invalid'
            console.log(`after mod ${items[idx].d}`)
            items[idx]=parent
        }
    }
    const getList = (aid:number) => {
        return store.get(`${aid}`)
    }
    return {
        add,
        del,
        modD,
        modReplace,
        getList
    }
}

export const load= ()=>{
    // const {store} = storage()
    let arr: parentstruct[]
    for(let i = 0 ; i<3;i++){
        arr=[]
        for(let x = 0; x<100;x++){
            const test:testStruct = {
                tid: x+i,
                b: `${x}`
            }
            const newItem:parentstruct = {
                id: x,
                d: `item ${x}`,
                e: test,
                aid:i
            }
            arr.push(newItem)
        }
        console.log("test")
        // store.set(`${i}`,arr)
        store.set(`${i}`,arr)
    }
    return
}
const plane = ()=>{
    return {store,load,controller}
}

export {plane}