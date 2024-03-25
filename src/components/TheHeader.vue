<script>
// imports
import CartWidget from './CartWidget.vue';
// import store 
import {useAuthUserStore} from "@/stores/AuthUserStore";
import {mapState, mapActions} from 'pinia';

// to write
//import {mapWritableState} from 'pinia';

export default {
	components: { CartWidget },
	//computed : { ...mapState(useAuthUserStore, ["username"]) } //options api
	computed : { 
		...mapState(useAuthUserStore, {user: store => `Hello ${store.username}`})  //calling state into different name options api // read only
		/*...mapWritableState(useAuthUserStore, {name: "username",) //writable state */
	},
	// for actions 
	method: {
		//...mapAction(useAuthUserStore, ['visitTwitterProfile']),
		...mapActions(useAuthUserStore, {
			toTwitter: 'visitTwitterProfile'
		}),
	}
}

</script>

<template>
  <header 
    class="flex justify-between p-6 mb-10 items-center"
    style="background-image: url('/images/double-bubble-outline.png')"
  >
    <h1 class="text-4xl text-gray-700 font-bold">The Pineapple Stand</h1>
    <div>
    	<!-- <input v-modal="name" type="text" /> -->
    	<span class="mr-5" @click="toTwitter" >{{ user }}</span>
    	<CartWidget class="inline-block" />
    </div>
  </header>
</template>