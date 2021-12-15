<template>
  <div>
    <v-app-bar color="deep-purple accent-4" dense dark height="65">
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>

      <v-toolbar-title>Roll It Tight</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu left bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon x-large>mdi-account-circle</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in menuList"
            :key="item.title"
            @click="logOut"
          >
            <v-list-item-title> {{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="mini"
      permanent
      class="deep-purple accent-4"
      dark
      ><v-list-item></v-list-item>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img src="../assets/legoMan.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="subtitle-1">Gangster Lego</v-list-item-title>
        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
          class="my-6"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="subtitle-1">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { auth } from "../firebase.js";
export default {
  name: "Admin",
  components: {},

  data() {
    return {
      drawer: true,
      items: [
        { title: "Overview", icon: "mdi-kodi", link: "/admin/overview" },
        { title: "Products", icon: "mdi-redhat", link: "/admin/products" },
        { title: "Orders", icon: "mdi-gift", link: "/admin/orders" },
      ],
      mini: false,
      menuList: [{ title: "LogOut" }],
    };
  },
  methods: {
    logOut() {
      auth
        .signOut()
        .then(() => {
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped></style>
