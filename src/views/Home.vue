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
    </v-content>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
export default {
  name: "Home",

  components: {
    Navbar,
  },
};
</script>
