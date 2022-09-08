<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="(item,index) in items" :key="item.id" >
        {{ item.id }} - {{ item.d }}-{{index}}
        <TxtBoxComponent :txt="item.d" @updateTxt="(text)=>{modRepl(item,text)}"></TxtBoxComponent>
        <!-- <q-input
    :model-value="item.d"
    @update:model-value="
      (val) => {
        item.d=val
        modRepl(item,val)
      }
    "
  ></q-input> -->
        <q-button @click="addi">click</q-button>
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, toRef,Ref,  onMounted } from 'vue';
import { Todo, Meta } from './models';
// import {store} from 'src/controls/store';
// import {controller} from '../controls/control';
import {plane}  from '../controls/control';
// import controller from '../controls/store';
import { parentstruct, testStruct } from '../controls/types';
import TxtBoxComponent from './textboxComponent.vue'

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
    TxtBoxComponent,
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
    let items =ref(Array<parentstruct>());
    // let items = ref(tems)
    let aid:Ref<number>=ref(0)
    const {store,load,controller}=plane()
    const {add,getList,modD,modReplace,del}=controller()
    const addi=(test:string)=>{
      const e:testStruct={
        tid: 0,
        b: test
      }
      const p:parentstruct= {
        id:items.value.length,
        d: test,
        e: e,
        aid: aid.value
      }
      add(p)
    }
    const modDelete = (parent:parentstruct)=>{
      modD(parent)
    }
    const modRepl = (parent:parentstruct,txt:string)=>{
      console.log(`modRepl event return: ${txt}`)
      
      console.log(parent)
      modReplace(parent,txt)
    }

    onMounted(()=>{
      load()
      items.value = getList(aid.value)??[]
      console.log(items)
    })
        
    return { ...useClickCount(), ...useDisplayTodo(toRef(props, 'todos')),addi,modDelete,modRepl,del,items};

  },
});
</script>
