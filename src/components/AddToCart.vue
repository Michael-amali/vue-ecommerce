<template>
  <div>
    <v-btn color="primary darken-1">Add to Cart</v-btn>
  </div>
</template>

<script>
export default {
  name: "AddToCart",
  components: {},
  props: {
    name: String,
    price: String,
    productId: String,
  },

  data() {
    return {
      productName: this.name,
      productPrice: this.price,
      product_id: this.id,
    };
  },
  methods: {},
};
</script>
