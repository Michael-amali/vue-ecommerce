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
              <span class="subheading">
                No more restrictions, no more limits
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon
                        x-large
                        class="blue--text d-flex justify-center text--lighten-2"
                        >mdi-account</v-icon
                      >
                    </v-card-text>
                    <v-card-title primary-title class="layout justify-center">
                      <div class="headline text-xs-center">Reach the world</div>
                    </v-card-title>
                    <v-card-text>
                      Show your stuff to the whole community of Endorfine not
                      only to your mum or your friends. We love making good
                      content viral. In this moment Endorfine is used by artists
                      who are not famous but that want to share their works to
                      the world. Unfortunately with other social networks this
                      is hard, slow and sometime expensive.
                    </v-card-text>
                  </v-card>
                </v-flex>
                <v-flex xs12 md4>
                  <v-card class="elevation-0 transparent">
                    <v-card-text class="text-xs-center">
                      <v-icon x-large class="blue--text text--lighten-2"
                        >mdi-flash_on</v-icon
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
                </v-flex>
              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>
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
export default {
  name: "Home",

  components: {
    Navbar,
  },
};
</script>
