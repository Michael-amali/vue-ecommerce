<template>
  <div>
    <Admin />
    <v-container class="mt-16">
      <v-row class="pa-4">
        <v-col class="col-md-6 my-auto">
          <p class="text-center text-h4">Profile</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            assumenda molestiae ipsum. Omnis, voluptatum odit. Harum aspernatur
            ad, voluptatibus earum consectetur veniam deleniti aliquam veritatis
            rem quod itaque vero obcaecati! Reiciendis voluptates, ipsam quas
            hic
          </p>
        </v-col>
        <v-col class="col-md-6">
          <v-img src="../assets/svg/profile.svg"></v-img>
        </v-col>
      </v-row>
      <!-- <v-row> -->
      <div justify="center" id="sizeForm">
        <v-card>
          <v-card-text>
            <v-tabs v-model="tab" centered background-color="">
              <v-tabs-slider></v-tabs-slider>
              <v-tab href="#tab-1" class="text-capitalize"> PROFILE </v-tab>
              <v-tab href="#tab-2" class="text-capitalize">
                ACCOUNT SETTINGS
              </v-tab>
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
                          <!-- <v-card-text class="text-center pa-0 text-h6">
                            Login with your credentials
                          </v-card-text> -->
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="Full Name"
                                name="fullName"
                                v-model="profile.name"
                                type="text"
                                color="primary"
                                required
                                placeholder="Full Name"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Phone"
                                name="phone"
                                v-model="profile.phone"
                                type="text"
                                color="primary"
                                required
                                placeholder="Phone"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-text-field
                            label="Address"
                            name="address"
                            v-model="profile.address"
                            type="text"
                            color="primary"
                            required
                            placeholder="Address"
                          ></v-text-field>
                          <v-row>
                            <v-col cols="8">
                              <v-text-field
                                label="Postcode"
                                name="postcode"
                                v-model="profile.postalCode"
                                type="text"
                                color="primary"
                                required
                                placeholder="Postcode"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="4" class="pt-6">
                              <v-btn
                                color="primary darken-1"
                                :loading="loadingBtn"
                                :disabled="!loginFormValid"
                                @click="updateProfile"
                              >
                                SAVE CHANGES
                              </v-btn>
                            </v-col>
                          </v-row>
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
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="User Name"
                                name="userName"
                                v-model="account.name"
                                type="text"
                                color="primary"
                                required
                                placeholder="User Name"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Email"
                                name="email"
                                v-model="account.email"
                                type="text"
                                color="primary"
                                required
                                placeholder="Email"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col>
                              <v-text-field
                                label="New Password"
                                name="newPassword"
                                v-model="account.password"
                                type="password"
                                color="primary"
                                required
                                placeholder="New Password"
                              ></v-text-field>
                            </v-col>
                            <v-col>
                              <v-text-field
                                label="Confirm Password"
                                name="confirmPassword"
                                v-model="account.ConfirmPassword"
                                type="password"
                                color="primary"
                                required
                                placeholder="Confirm Password"
                              ></v-text-field>
                            </v-col>
                          </v-row>

                          <v-row>
                            <v-col cols="4">
                              <v-file-input
                                show-size
                                accept="image/*"
                                label="Choose File"
                                @change="uploadImage"
                              ></v-file-input>
                            </v-col>
                            <v-col cols="8" class="pt-6">
                              <v-btn
                                color="primary darken-1"
                                :loading="loadingBtn"
                                :disabled="!loginFormValid"
                                @click="login"
                              >
                                SAVE CHANGES
                              </v-btn>
                              <v-btn
                                color="primary darken-1"
                                class="mx-3"
                                @click="resetPassword"
                                >RESET PASSWORD EMAIL</v-btn
                              >
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card-text>
        </v-card>
      </div>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
import Admin from "../views/Admin.vue";
import { db, auth } from "../firebase.js";
export default {
  name: "Profile",
  components: { Admin },
  firestore() {
    const user = auth.currentUser;
    return {
      profile: db.collection("profiles").doc(user.uid),
    };
  },

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
      profile: {
        fullName: null,
        phone: null,
        address: null,
        postalCode: null,
      },
      account: {
        name: null,
        email: null,
        photoUrl: null,
        emailVerified: null,
        password: null,
        confirmPassword: null,
        uid: null,
      },
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
    };
  },
  methods: {
    resetPassword() {
      auth
        .sendPasswordResetEmail(auth.currentUser.email)
        .then(() => {
          window.Toast.fire({
            icon: "success",
            title: "Email sent successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          // var errorCode = error.code;
          // var errorMessage = error.message;
          // ..
        });
    },
    updateProfile() {
      this.$firestore.profile.update(this.profile);
    },
  },
};
</script>

<style scoped>
#sizeForm {
  width: 75%;
  margin: 0 auto;
}
</style>
