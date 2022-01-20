<template>
  <v-container fluid class="my-0 mx-auto pa-0">
    <section>
      <v-container class="mt-10">
        <v-row>
          <v-col class="d-flex justify-center title cols-12">
            <h1>Page Not Found</h1>
          </v-col>
        </v-row>
        <v-row class="">
          <v-col class="d-flex justify-center">
            <v-card class="" width="650">
              <v-img src="../assets/svg/not_found.svg"></v-img>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center cols-12">
            <v-btn @click="goToHome">Return Home</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </v-container>
</template>

<script>
export default {
  name: "NotFound",
  components: {},

  data() {
    return {};
  },
  methods: {
    goToHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.not-found {
  max-height: 50%;
}
.bgColor{
  background-color: antiquewhite;
}
</style>
