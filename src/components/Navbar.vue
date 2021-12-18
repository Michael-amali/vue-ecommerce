<template>
  <v-card class="">
    <v-app-bar color="deep-purple accent-4" dark fixed>
      <v-toolbar-title>Akata</v-toolbar-title>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text @click="goToHome">Home</v-btn>
        <v-btn text>Products</v-btn>
        <v-btn text @click="goToAbout">About</v-btn>
      </v-toolbar-items>

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-icon @click="$store.commit('changeCart', true)">mdi-cart</v-icon>

      <v-dialog
        v-model="credentialDialog"
        max-width="600px"
        class="credentialDialog"
      >
        <template v-slot:activator="{}">
          <v-btn
            text
            outlined
            class="hidden-sm-and-down"
            @click="credentialDialog = true"
          >
            Get Started</v-btn
          >
        </template>
        <v-card>
          <v-card-text>
            <v-tabs v-model="tab" centered background-color="">
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" class="text-capitalize"> LOGIN </v-tab>
              <v-tab href="#tab-2" class="text-capitalize"> SIGN UP </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab" color="primary">
              <v-tab-item v-for="i in 2" :key="i" :value="'tab-' + i">
                <v-card flat>
                  <v-card-text v-if="tab === 'tab-1'">
                    <v-form
                      ref="loginForm"
                      v-model="loginFormValid"
                      lazy-validation
                    >
                      <v-card-text>
                        <v-container>
                          <v-card-text class="text-center pa-0 text-h6">
                            Login with your credentials
                          </v-card-text>
                          <v-text-field
                            label="E-mail Address"
                            name="email"
                            :rules="loginEmailRules"
                            v-model="loginEmail"
                            type="email"
                            color="primary"
                            required
                            placeholder="Email"
                          ></v-text-field>

                          <v-text-field
                            label="Password"
                            name="password"
                            :rules="loginPasswordRules"
                            v-model="loginPassword"
                            type="password"
                            color="primary"
                            required
                            placeholder="Password"
                          ></v-text-field>
                          <v-card-text class="text-right pr-0">
                            <span class="white primary--text reset"
                              >Forgot your PIN?</span
                            >
                          </v-card-text>
                          <v-btn
                            color="primary darken-1"
                            block
                            :loading="loadingBtn"
                            :disabled="!loginFormValid"
                            @click="login"
                          >
                            LOGIN
                          </v-btn>
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card-text>
                </v-card>

                <v-card flat>
                  <v-card-text v-if="tab === 'tab-2'">
                    <v-form
                      ref="signUpForm"
                      v-model="signUpFormValid"
                      lazy-validation
                    >
                      <v-card-text>
                        <v-container>
                          <v-card-text class="text-center pa-0 text-h6">
                            Create New Account
                          </v-card-text>
                          <v-text-field
                            label="Name"
                            name="name"
                            :rules="nameRules"
                            v-model="signUpName"
                            type="text"
                            color="primary"
                            required
                            placeholder="Name"
                          ></v-text-field>
                          <v-text-field
                            label="E-mail Address"
                            name="email"
                            :rules="signUpEmailRules"
                            v-model="signUpEmail"
                            type="email"
                            color="primary"
                            required
                            placeholder="Email"
                          ></v-text-field>

                          <v-text-field
                            label="Password"
                            name="password"
                            :rules="signUpPasswordRules"
                            v-model="signUpPassword"
                            type="password"
                            color="primary"
                            required
                            placeholder="Password"
                          ></v-text-field>
                          <v-btn
                            color="primary darken-1"
                            block
                            :loading="loadingBtn"
                            :disabled="!loginFormValid"
                            @click="register"
                          >
                            SIGN UP
                          </v-btn>
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary darken-1" @click="credentialDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary height="100vh">
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item v-for="(item, i) in navigationItems" :key="i">
            <v-list-item-icon>
              <v-icon>mdi-{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content @click="popUpDrawer(item)">
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar
      v-model="snackbar"
      timeout="4000"
      top
      center
      :color="upgradeValue ? 'green' : 'red'"
    >
      {{ snackBarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          fab
          v-bind="attrs"
          x-small
          color="grey"
          @click="snackbar = false"
        >
          <v-icon>mdi-close </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>
<script>
import { auth, db } from "../firebase.js";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      group: null,
      selectedItem: 1,
      navigationItems: [
        { title: "login", icon: "login", text: "Login" },
        { title: "signUp", icon: "kodi", text: "Sign Up" },
        { title: "product", icon: "redhat", text: "Products" },
        { title: "about", icon: "poker-chip", text: "About" },
      ],
      credentialDialog: false,
      tab: "tab-1",
      loginEmail: "",
      loginPassword: "",
      signUpName: "",
      signUpEmail: "",
      signUpPassword: "",
      message: "",
      onlyMessage: "",
      paymentOption: null,
      loadingBtn: false,
      loading: false,
      loginFormValid: true,
      signUpFormValid: true,
      snackBarText: "",
      snackbar: false,
      upgradeValue: null,
      paymentOptions: ["Stripe", "Paypal"],
      nameRules: [(value) => !!value || "Name is required"],
      loginEmailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      signUpEmailRules: [
        (value) => !!value || "E-mail is required",
        (value) => /.+@.+\..+/.test(value) || "E-mail must be valid",
      ],
      loginPasswordRules: [
        (value) => !!value || "Password is required",
        // (value) => value < 5 || "Password must be valid",
      ],
      signUpPasswordRules: [
        (value) => !!value || "Password is required",
        // (value) => value > 5 || "Password must be valid",
      ],
      selectRules: [(v) => !!v || "Select a payment option"],
      messageRules: [(v) => !!v || "Message is required"],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    register() {
      auth
        .createUserWithEmailAndPassword(this.signUpEmail, this.signUpPassword)
        .then((user) => {
          db.collection("profiles")
            .doc(user.user.uid)
            .set({
              name: this.signUpName,
            })
            .then(() => {
              console.log("Document successfully written!");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
          this.credentialDialog = false;
          this.snackbar = true;
          this.upgradeValue = true;
          this.snackBarText = "Sign Up was successful";
          this.$router.push("/admin/overview");
          console.log(user);
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    login() {
      auth
        .signInWithEmailAndPassword(this.loginEmail, this.loginPassword)
        .then((user) => {
          this.credentialDialog = false;
          this.snackbar = true;
          this.upgradeValue = true;
          this.snackBarText = "Login was successful";
          this.$router.push("/admin/overview");
          console.log(user);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
    popUpDrawer(item) {
      if (item.text == "Login") {
        this.tab = "tab-1";
        this.credentialDialog = true;
      } else if (item.text == "Sign Up") {
        this.tab = "tab-2";
        this.credentialDialog = true;
      }
    },
    goToHome() {
      this.$router.push("/");
    },
    goToAbout() {
      this.$router.push("/about");
    },
    goToProducts() {
      this.$router.push("/products");
    },
  },

  components: {},
};
</script>

<style scoped></style>
