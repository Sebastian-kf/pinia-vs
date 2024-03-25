import { defineStore } from 'pinia'

// import data from local json file
//import products from '@/data/products.json'

export const useProductStore = defineStore(/* id */'ProductStore', /* options */{
  state: () => {
    return /* original state */{
    	products : [],
    };
  },
  actions: {
    async fill() {
      this.products = (await import("@/data/products.json")).default
    },
  },
})