<template>
  <div>
    <p>Where's My Items</p>
    <div v-if="items">
      <q-virtual-scroll
        id="parent-scroll"
        class="scroll"
        style="height: calc(100vh - 285px)"
        :items-size="items.length"
        :items-fn="getSnippets"
        :virtual-scroll-slice-size="5"
        scroll-target="#parent-scroll"
        ref="items.value"
        v-slot="{ item, index }"
      >
        <q-item :key="item.id" dense class="q-pa-none">
          {{ item.id }} - {{ item.d }}-{{ index }}
          <ParentItem :parentItem="item"></ParentItem>
        </q-item>
      </q-virtual-scroll>

      <p>Count: {{ items.length }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, watch, reactive, computed, onBeforeMount, ref, watchEffect } from 'vue';

// import {store} from 'src/controls/store';
// import {controller} from '../controls/control';
import { plane } from '../controls/control';
// import controller from '../controls/store';
import { parentStruct, testStruct } from '../controls/types';
import ParentItem from './parentItem.vue';

export default defineComponent({
  name: 'CompositionComponent',
  components: {
    ParentItem,
  },
  props: {
    aid: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { load, controller, stateref } = plane();
    const { getList } = controller();

    let items = ref(Array<parentStruct>());
    const getSnippets = (from: number, size: number) => {
      if (items.value.length === 0) {
        console.log('There is literally nothieng to load');
        return;
      } else {
        console.log(`getsnippets ${from}  ${size}`);
      }

      return items.value.slice(from, from + size);
    };

    onMounted(() => {
      console.log('parent list on mounted');
      // if(items.value==undefined)  
      // load();
      // items.value = stateref.get(props.aid.toString())??[]//getList(props.aid) ?? [];
      console.log(items);
    });

    watch(
      items,
      () => {
        console.log('items change in watch');
      },
      { deep: true }
    );
    const stop = watchEffect(()=>{
      items.value = getList(props.aid)??[]
    })
    return { getSnippets, items  };
  },
});
</script>
