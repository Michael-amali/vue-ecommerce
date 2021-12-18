<template>
  <v-container fluid class="my-0 mx-auto pa-0">
    <Navbar />
    <v-content>
      <section>
        <v-parallax
          src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
        >
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">
              The Revolution Will Not Be Televised
            </div>
            <em
              >With the power of Endorfine you don't need to be famous or post
              pics of cute cats in order to get visibility</em
            >
          </v-layout>
        </v-parallax>
      </section>

      <section>
        <v-layout column wrap class="my-5" align-center>
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">The best way to share your amazing stuff</h2>
              <div class="subheading text-center">
                No more restrictions, no more limits
              </div>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4 v-for="(product, idx) in products" :key="idx">
                  <v-card class="elevation-0 transparent">
                    <carousel :perPage="1">
                      <slide
                        v-for="(image, idx) in product.images"
                        :key="idx"
                        class="d-flex justify-center"
                      >
                        <v-img :src="image" width="300"></v-img>
                      </slide>
                    </carousel>
                    <v-card-text class="text-xs-center"> </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        {{ product.price | currency("₵") }}
                      </div>
                    </v-card-title>
                    <v-card-text>
                      {{ product.description }}
                    </v-card-text>
                    <div class="d-flex justify-center">
                      <AddToCart
                        :productImage="getImage(product.images)"
                        :productId="product.id"
                        :price="product.price"
                        :name="product.name"
                      />
                    </div>
                  </v-card>
                </v-flex>
                <!-- <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="blue--text d-flex justify-center text--lighten-2"
                        >mdi-kodi</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline">Fast feedback</div>
                    </v-card-title>
                    <v-card-text>
                      Time is important, we don't want you to waste it. Here you
                      can get a massive feedback from real users in minutes. And
                      if your stuff is appreciated you won't only get positive
                      feedback but also lovely and sincere fans less than 3
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="blue--text d-flex justify-center text--lighten-2"
                        >mdi-share</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">
                        Create new connections
                      </div>
                    </v-card-title>
                    <v-card-text>
                      Imagine if you can directly speak with the world's
                      population. Don't you think it would be easier to find
                      nice people to interact with? Endorfine is both local and
                      global and help you to connect without limitations with
                      people from your city, your state and your universe!
                    </v-card-text>
                  </v-card>
                </v-flex> -->
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
      <!-- cart pop up -->
      <MiniCart />
      <!-- <v-dialog
        v-model="this.$store.state.cartDialog"
        max-width="590"
        persistent
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
              <div v-for="(item, idx) in this.$store.state.cart" :key="idx">
                <v-row>
                  <v-col cols="4">
                    <v-img :src="item.product_image" width="120px"></v-img>
                  </v-col>
                  <v-col cols="8" class="my-auto">
                    <div class="title">{{ item.productName }}</div>
                    <div class="body-1">
                      {{ item.productPrice | currency("₵") }}
                    </div>
                  </v-col>
                </v-row>
              </div>
            </ul>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="primary darken-1"
              text
              @click="$store.commit('changeCart', false)"
            >
              Continue Shopping
            </v-btn>

            <v-btn
              color="primary darken-1"
              text
              @click="this.$store.commit('changeCart', false)"
            >
              Checkout
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
      <section>
        <v-parallax
          src="https://firebasestorage.googleapis.com/v0/b/endorfinevue.appspot.com/o/assets%2Fo-NIGHTCLUB-facebook.jpg?alt=media&token=cefc5c4c-9714-41da-9c22-f63caf5e89a4"
          height="380"
        >
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">
              We are dropping cool news and opportunities on socials
            </div>
          </v-layout>
          <v-layout justify-space-around justify-center>
            <v-icon x-large dark>fab fa-facebook-f</v-icon>

            <v-icon x-large dark>fab fa-twitter</v-icon>

            <v-icon x-large dark>fab fa-reddit-alien</v-icon>

            <v-icon x-large dark>fab fa-instagram</v-icon>

            <v-icon x-large dark>fab fa-discord</v-icon>
          </v-layout>
        </v-parallax>
      </section>
      <section>
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm4>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Company info</div>
                </v-card-title>
                <v-card-text>
                  We are not a company. We hate companies. Just imagine us like
                  the guys from the Silicon Valley series.
                </v-card-text>
              </v-card>
            </v-flex>
            <v-flex xs12 sm4 offset-sm1>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">We are hiring</div>
                </v-card-title>
                <v-card-text>
                  Are you a creative person? Do you like techy stuff? Complete
                  the email form by writing your skills and interests
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </section>
    </v-content>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import AddToCart from "@/components/AddToCart.vue";
import MiniCart from "@/components/MiniCart.vue";
export default {
  name: "Home",

  components: {
    Navbar,
    AddToCart,
    MiniCart,
  },
  data() {
    return {
      // cartDialog: false,
      products: [
        {
          name: "Shorts",
          description:
            "Show your stuff to the whole community of Endorfine not only to your mum or your friends. We love making go",
          images: [
            "https://res.cloudinary.com/cloudfisk/image/upload/v1628246011/catalog/images/large/short1.jpg",
            "https://res.cloudinary.com/cloudfisk/image/upload/v1628246011/catalog/images/large/short1.jpg",
          ],
          price: "99.99",
          id: "1",
        },
        {
          name: "Blue Shirt",
          description:
            "Show your stuff to the whole community of Endorfine not only to your mum or your friends. We love making go",
          images: [
            "https://res.cloudinary.com/cloudfisk/image/upload/v1628246012/catalog/images/large/blue-tshirt1.jpg",
            "../assets/svg/product.svg",
          ],
          price: "99.92",
          id: "2",
        },
        {
          name: "Brown Suit",
          description:
            "Show your stuff to the whole community of Endorfine not only to your mum or your friends. We love making go",
          images: [
            "https://res.cloudinary.com/cloudfisk/image/upload/v1628246000/catalog/images/large/suit002.jpg",
            "../assets/svg/product.svg",
          ],
          price: "99.97",
          id: "3",
        },
      ],
    };
  },
  methods: {
    getImage(images) {
      return images[0];
    },
    // closeCartDialog() {
    //   this.$store.commit("changeCart", false);
    // },
  },
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
