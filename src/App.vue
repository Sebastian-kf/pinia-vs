<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
//import products from "@/data/products.json";

// pinia stores
import {useProductStore} from "@/stores/ProductStore";
import {useCartStore} from "@/stores/CartStore";

// use imported state
const productStore = useProductStore ();
const cartStore = useCartStore ();

// to subscribe to action
cartStore.$onAction(({ name, store, args, after, onError })=>{
  if (name === 'addItems'){
    after(()=>{
      console.log(args[0]);
    })

    onError((error) =>{
      console.log("hello error: ", error.message);
    })
  }
});

productStore.fill();

// add to cart function
/*const addToCart = (count, product) => {
  count = parseInt(count)
  cartStore.$patch(state =>{
    for(let index = 0; index < count; index++){
      state.itmes.push(product);
    }
  })
}*/

</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
