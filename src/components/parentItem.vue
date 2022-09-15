<template>
  <div>
    <!-- {{ item.id }} - {{ item.d }}-{{ index }} -->
    <TxtBoxComponent 
      :txt='parentItem'
      @updateTxt='
        (text) => {
          modRepl(parentItem, text);
        }
      '
    ></TxtBoxComponent>


    <q-btn @click='addiProp'>addi Props</q-btn>

    <div class="q-pt-md">localRef:</div>

    <TxtBoxComponent
      :txt='localPropItem'
      @updateTxt='
        (text) => {
          modRepl(localPropItem, text);
        }
      '
    ></TxtBoxComponent>

    <q-btn @click='addiLocal'>addi Local</q-btn>
  </div>
</template>
  
  <script lang='ts'>
import {
  defineComponent,
  PropType,

  ref,
  Ref,
  onMounted,
  watch,
  reactive,
} from 'vue';
import { plane } from '../controls/control';
import { parentStruct, testStruct } from '../controls/types';
import TxtBoxComponent from './textboxComponent.vue';

export default defineComponent({
  name: 'ParentItem',
  props: {
    parentItem: {
      type: Object as PropType<parentStruct>,
      required: true,
    },
  },
  components: {
    TxtBoxComponent,
  },
  setup(props) {
    let localPropItem = reactive(props.parentItem);
    let items = ref(Array<parentStruct>());
    let aid: Ref<number> = ref(0);
    const { load, controller } = plane();
    const { add, getList, modD, modReplace, del } = controller();
    const addiProp = (test: string) => {
      const e: testStruct = {
        tid: 0,
        b: test,
      };
      const p: parentStruct = {
        id: props.parentItem.id + 1,
        d: test,
        e: e,
        aid: aid.value,
      };
      add(p);
    };

    const addiLocal = (test: string) => {
      const e: testStruct = {
        tid: 0,
        b: test,
      };
      const p: parentStruct = {
        id: props.parentItem.id + 1,
        d: test,
        e: e,
        aid: aid.value,
      };
      add(p);
    };

    const modDelete = (parent: parentStruct) => {
      modD(parent);
    };
    const modRepl = (parent: parentStruct, txt: string) => {
      const idx = items.value.findIndex((item) => {
        return item.id == parent.id;
      });
      const item = items.value[idx];
      console.log(`parenitem getlocalstore item : ${item.d}`);
      console.log(`modRepl event return: ${txt}`);

      console.log(parent);
      modReplace(parent, txt);
      console.log(`modRepl after composition component item : ${item.d}`);
      console.log(`modRepl props item : ${props.parentItem.d}`);
    };

    onMounted(() => {
        // console.log("parentItemOnMounted")
      console.log(`ParentItem mounted ${props.parentItem.d}`);
      load();
      items.value = getList(aid.value) ?? [];
    //   console.log(items);
    });

    watch(
      props.parentItem,
      () => {
        console.log(`props.parentItems change in watch ${props.parentItem.d}`);
      },
      { deep: true }
    );

    return {
      addiProp,
      addiLocal,
      modDelete,
      modRepl,
      del,
      localPropItem,
    };
  },
});
</script>
  