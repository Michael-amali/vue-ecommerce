<template>
  <div>
    <v-dialog
      v-model="this.$store.state.cartDialog"
      max-width="590"
      persistent
      :scrollable="true"
    >
      <v-card>
        <v-btn
          class="fixed"
          color=""
          dark
          x-small
          absolute
          fab
          @click="closeCartDialog"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-card-title class="text-h5"> My Bag </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <ul>
            <div v-if="this.$store.state.cart.length == 0" class="title">
              No item in Cart
            </div>
            <div
              v-else
              v-for="(item, idx) in this.$store.state.cart"
              :key="idx"
            >
              <v-row>
                <v-col cols="4">
                  <v-img :src="item.product_image" width="120px"></v-img>
                </v-col>
                <v-col cols="5" class="my-auto">
                  <div class="title">{{ item.productName }}</div>
                  <div class="body-1">
                    {{ item.productPrice | currency("₵") }}
                  </div>
                  <div class="body-1">Quantity: {{ item.productQuantity }}</div>
                </v-col>
                <v-col cols="3" class="my-auto">
                  <div>
                    <v-icon @click="$store.commit('removeFromCart', item)"
                      >mdi-close</v-icon
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </ul>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            outlined
            color="indigo"
            @click="$store.commit('changeCart', false)"
          >
            Continue Shopping
          </v-btn>

          <v-btn color="indigo" outlined @click="checkoutFxn"> Checkout </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "MiniCart",

  data() {
    return {};
  },
  methods: {
    closeCartDialog() {
      this.$store.commit("changeCart", false);
    },
    checkoutFxn() {
      this.$store.commit("changeCart", false);
      this.$router.push("/checkout");
    },
  },
  computed: {},
};
</script>

<style scoped>
.fixed {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  margin: 16px;
}
</style>
