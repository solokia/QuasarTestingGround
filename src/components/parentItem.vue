<template>
  <div>
    <TxtBoxComponent
      :txt="parentItem"
      @updateTxt="
        (text) => {
          modRepl(parentItem, text);
        }
      "
    ></TxtBoxComponent>
    <q-btn @click="addRow">add Props</q-btn>
    <div class="q-pt-md">localRef:</div>
    <TxtBoxComponent
      :txt="localPropItem"
      @updateTxt="
        (text) => {
          modRepl(localPropItem, text);
        }
      "
    ></TxtBoxComponent>
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
    let localPropItem = reactive(props.parentItem); // This doesn't rebuild if we mod the item in control that affects this not through emit.
    let aid: Ref<number> = ref(0);
    const { load, controller } = plane();
    const { add, modD, modReplace, del } = controller();
    const addRow = () => {
      const e: testStruct = {
        tid: 0,
        b: "test",
      };
      const p: parentStruct = {
        id: props.parentItem.id + 1,
        d: "test",
        e: e,
        aid: aid.value,
      };
      add(p);
    };
    const modDelete = (parent: parentStruct) => {
      modD(parent);
    };
    const modRepl = (parent: parentStruct, txt: string) => {
      console.log(`modRepl event return: ${txt}`);
      modReplace(parent, txt);
      console.log(`modRepl props item : ${props.parentItem.d}`);
    };
    onMounted(() => {
      console.log(`ParentItem mounted ${props.parentItem.d}`);
    });
    watch(
      props.parentItem,
      () => {
        console.log(`props.parentItems change in watch ${props.parentItem.d}`);
      },
      { deep: true }
    );

    return {
      addRow,
      modDelete,
      modRepl,
      del,
      localPropItem,
    };
  },
});
</script>
  