import { computed, reactive } from 'vue';
import { store } from './store';
import { parentStruct, testStruct } from './types';

const controller = () => {
  // const {store}=storage()
  const add = (parent: parentStruct) => {
    console.log('control add function');
    const items = store.state.get(parent.aid.toString());

    if (items) {
      items.splice(items.length, 0, parent);
      store.state.set(parent.aid.toString(), items);

      console.log(`controller item length = ${items?.length}`);
    }
  };
  const del = (aid: number, id: number) => {
    const items = store.state.get(`${aid}`);
    if (items) {
      const idx = items.findIndex((item) => {
        return item.id == id;
      });
      items.splice(idx, 1);
    }
  };
  const modD = (parent: parentStruct) => {
    const items = store.state.get(parent.aid.toString());
    if (items) {
      const idx = items.findIndex((item) => {
        return item.id == parent.id;
      });
      items[idx].d = parent.d;
    }
  };
  const modReplace = (parent: parentStruct, txt: string) => {
    const items = store.state.get(parent.aid.toString());

    if (items) {
      const idx = items.findIndex((item) => {
        return item.id == parent.id;
      });
      console.log(`before mod ${items[idx].d}`);
      parent.d = txt;
      items[idx] = parent;
      console.log(`after mod ${items[idx].d}`);
    }
  };
  const getList = (aid: number) => {
    if(store.state.size==0){
        load()
    }
    const re = store.state.get(`${aid}`);
    if (re) {
        console.log(`get list list size : ${re.length}`)
      return reactive(re);
    } else {
      throw new Error('no list');
    }
  };
  return {
    add,
    del,
    modD,
    modReplace,
    getList,
  };
};

export const load = () => {
  // const {store} = storage()
  let arr: parentStruct[];
  for (let i = 0; i < 3; i++) {
    arr = [];
    for (let x = 0; x < 10; x++) {
      const test: testStruct = {
        tid: x + i,
        b: `${x}`,
      };
      const newItem: parentStruct = {
        id: x,
        d: `item ${x}`,
        e: test,
        aid: i,
      };
      arr.push(newItem);
    }
    console.log('test');
    // store.state.set(`${i}`,arr)
    store.state.set(`${i}`, arr);
  }
  return;
};
const plane = () => {
  return {
    store,
    load,
    controller,
    state: computed(() => store.state),
    stateref: store.state,
  };
};

export { plane };
