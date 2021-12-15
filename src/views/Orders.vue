<template>
  <div>
    <Admin />
    <v-container class="mt-16">
      <v-row class="pa-4">
        <v-col class="col-md-6 my-auto">
          <p class="text-center text-h4">Orders</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            assumenda molestiae ipsum. Omnis, voluptatum odit. Harum aspernatur
            ad, voluptatibus earum consectetur veniam deleniti aliquam veritatis
            rem quod itaque vero obcaecati! Reiciendis voluptates, ipsam quas
            hic
          </p>
        </v-col>
        <v-col class="col-md-6">
          <v-img src="../assets/svg/order.svg"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Admin from "../views/Admin.vue";
export default {
  name: "Orders",
  components: { Admin },

  data() {
    return {};
  },
  methods: {},
};
</script>
