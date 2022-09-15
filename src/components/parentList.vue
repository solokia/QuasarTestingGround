<template>
  <div>
    <p>{{ title }}</p>
    <ul >
      <li v-for='(item,index) in items' :key='index' >
        {{ item.id }} - {{ item.d }}-{{index}}
        <ParentItem :parentItem='item'></ParentItem>
        <!-- <q-input
    :model-value='item.d'
    @update:model-value='
      (val) => {
        item.d=val
        modRepl(item,val)
      }
    '
  ></q-input> -->
        <!-- <q-btn @click='addi'>click</q-btn> -->
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, computed, ref, toRef,Ref,  onMounted, watch } from 'vue';
import { Todo, Meta } from './models';
// import {store} from 'src/controls/store';
// import {controller} from '../controls/control';
import {plane}  from '../controls/control';
// import controller from '../controls/store';
import { parentStruct, testStruct } from '../controls/types';
import ParentItem from './parentItem.vue'
function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1;
    return clickCount.value;
  }

  return { clickCount, increment };
}

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

export default defineComponent({
  name: 'CompositionComponent',
  components:{
    ParentItem,
},
  props: {
    title: {
      type: String,
      required: true,
    },
    todos: {
      type: Array as PropType<Todo[]>,
      default: () => [],
    },
    meta: {
      type: Object as PropType<Meta>,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  setup(props) {
    let items =ref(Array<parentStruct>());
    // let items = ref(tems)
    let aid:Ref<number>=ref(0)
    const {load,controller}=plane()
    const {add,getList,modD,modReplace,del}=controller()
    const addi=(test:string)=>{
      const e:testStruct={
        tid: 0,
        b: test
      }
      const p:parentStruct= {
        id:items.value.length,
        d: test,
        e: e,
        aid: aid.value
      }
      add(p)
    }
    const modDelete = (parent:parentStruct)=>{
      modD(parent)
    }
    const modRepl = (parent:parentStruct,txt:string)=>{
      const idx =items.value.findIndex((item)=>{return item.id==parent.id})
      const item=items.value[idx]
      console.log(`modRepl composition component localstore item : ${item.d}`)
      console.log(`modRepl event return: ${txt}`)
      
      console.log(parent)
      modReplace(parent,txt)
      console.log(`modRepl after composition component item : ${item.d}`)

    }

    onMounted(()=>{
      console.log("parent list on mounted")
      load()
      items.value = getList(aid.value)??[]
      console.log(items)
    })

    watch(items,()=>{
      console.log('items change in watch')
    },{ deep : true})
        
    return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')),addi,modDelete,modRepl,del,items};

  },
});
</script>
