import Vue from "vue";
export const registerModule = {
  methods: {
    registerStoreModule(moduleName, storeModule) {
      const store = this.$store;

      if (store && store.state && store.state[moduleName] != undefined) {
        Vue.nextTick(() => {
          store.registerModule(moduleName, storeModule);
        });
      }
    }
  }
};
export const unRegisterModule = {
  methods: {
    unRegisterStoreModule(moduleName) {
      const store = this.$store;
      if (store && store.state && store.state[moduleName] != undefined) {
        Vue.nextTick(() => {
          store.unregisterModule(moduleName);
          delete store.state[moduleName];
        });
      }
    }
  }
};
