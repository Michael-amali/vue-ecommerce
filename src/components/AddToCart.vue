<template>
  <div>
    <v-btn @click="addToCart" color="primary darken-1">Add to Cart</v-btn>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  components: {},
  props: ["name", "price", "productId", "productImage", "cartDialog"],

  data() {
    return {
      item: {
        productName: this.name,
        productPrice: this.price,
        product_id: this.productId,
        product_image: this.productImage,
        productQuantity: 1,
      },
    };
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", this.item);
      this.changeCart();
      // recalcultating the price as the quantity changes.
      this.item.productPrice = this.price * this.item.productQuantity;
    },
    changeCart() {
      this.$store.commit("changeCart", true);
    },
  },
};
</script>
