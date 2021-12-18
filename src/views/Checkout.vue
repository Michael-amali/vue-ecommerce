<template>
  <v-container fluid class="my-0 mx-auto pa-0">
    <Navbar />
    <v-container class="mt-16 d-flex justify-center">
      <v-row class="mt-16">
        <v-col cols="8">
          <v-card-title class="text-h5">Checkout Page</v-card-title>
          <v-divider></v-divider>

          <v-card-text>
            <ul>
              <div v-for="(item, idx) in this.$store.state.cart" :key="idx">
                <v-row>
                  <v-col cols="4">
                    <v-img :src="item.product_image" width="120px"></v-img>
                  </v-col>
                  <v-col cols="5" class="my-auto">
                    <div class="title">{{ item.productName }}</div>
                    <div class="body-1">
                      {{ item.productPrice | currency("₵") }}
                    </div>
                    <div class="body-1">
                      Quantity: {{ item.productQuantity }}
                    </div>
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
        </v-col>
        <v-col cols="4">
          <v-card-title class="text-h5"
            >Total Price: {{ getPrice() }}
            {{ this.$store.state.sum | currency("₵") }}</v-card-title
          >
          <v-divider></v-divider>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar.vue";
export default {
  name: "Checkout",
  components: { Navbar },

  data() {
    return {};
  },
  methods: {
    getPrice() {
      this.$store.commit("getTotalPrice", this.$store.state.cart);
    },
  },
};
</script>
