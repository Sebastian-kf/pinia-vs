import { defineStore, acceptHMRUpdate } from 'pinia';
import { groupBy } from 'lodash';
import { useLocalStorage } from '@vueuse/core';

// import store 
import {useAuthUserStore} from "@/stores/AuthUserStore";

export const useCartStore = defineStore(/* id */'CartStore', /* options */{

	historyEnabled: true,

	state: () => {
		return {
			items: useLocalStorage("cartStore:items", []),
		};
	},

	getters: {

		count: (state) => state.items.length,

		isEmpty: (state) => state.count === 0,

		grouped: (state) => {
			const grouped = groupBy(state.items, (item) => item.name)
			const sorted = Object.keys(grouped).sort()
			let inOrder = {}
			sorted.forEach(key => (inOrder[key] = grouped[key]))
			return inOrder;
		},

		groupedCount: (state) => (name) => state.grouped[name].length,

		total: (state) => state.items.reduce((p, c) => p + c.price, 0),
	},

	actions: {

		checkout() {
			const AuthUserStore = useAuthUserStore()
			alert(`${AuthUserStore.username} just bought ${this.count} items at a total ${this.price}`)
		},

		addItems(count, item) {
			count = parseInt(count);
			for(let index = 0; index < count; index++){
      			this.items.push({ ...item });
    		}
		},

		clearItem(itemName) {
			this.items = this.items.filter((item) => item.name !== itemName);
		},

		setItemCount(item, count) {
			this.clearItem(item.name)
			this.addItems(count, item)
		}

	},
});

// to add script with page reload
if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}