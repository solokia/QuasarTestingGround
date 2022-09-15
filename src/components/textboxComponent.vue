<template>
  <q-input
    :model-value='txt.d'
    @update:model-value='
      (val) => {
        modify(val);
      }
    '
  ></q-input>
</template>
  
  <script lang='ts'>
import { defineComponent, PropType } from 'vue';
import { parentStruct  } from '../controls/types';
export default defineComponent({
  name: 'TxtBoxComponent',
  props: {
    txt: {
      type: Object as PropType<parentStruct>,
      required: true,
    },
  },
  emits: ['updateTxt'],
  setup(props, { emit }) {
    // const text = ref(props.txt);
    // let items = ref(tems)

    const modify = (eventparam: string) => {
      console.log('modify func');
      console.log(`before update eventParam : ${eventparam} , propstxt:${props.txt.d}`);
    //   text.value = eventparam;

      console.log(`aft update eventParam : ${eventparam} , propstxt:${props.txt.d}`);
      emit('updateTxt', eventparam);
    };

    return { modify };
  },
});
</script>
  