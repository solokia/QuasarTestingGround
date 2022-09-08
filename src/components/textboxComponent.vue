<template>
  <q-input
    :model-value="txt"
    @update:model-value="
      (val) => {
        modify(val);
      }
    "
  ></q-input>
</template>
  
  <script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TxtBoxComponent',
  props: {
    txt: {
      type: String,
      required: true,
    },
  },
  emits: ['updateTxt'],
  setup(props, { emit }) {
    // const text = ref(props.txt);
    // let items = ref(tems)

    const modify = (eventparam: string) => {
      console.log('modify func');
      console.log(`before update t : ${eventparam} , propstxt:${props.txt}`);
    //   text.value = eventparam;

      console.log(`aft update t : ${eventparam} , propstxt:${props.txt}`);
      emit('updateTxt', props.txt);
    };

    return { modify };
  },
});
</script>
  