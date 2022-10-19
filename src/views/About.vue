<template>
  <v-container fluid class="my-0 mx-auto pa-0">
    <Navbar />
    <section>
      <v-container class="">
        <v-row class="pa-4">
          <v-col class="col-md-6 my-auto">
            <p class="text-center text-h4">About Us</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Asperiores assumenda molestiae ipsum. Omnis, voluptatum odit.
              Harum aspernatur ad, voluptatibus earum consectetur veniam
              deleniti aliquam veritatis rem quod itaque vero obcaecati!
              Reiciendis voluptates, ipsam quas hic
            </p>
          </v-col>
          <v-col class="col-md-6">
            <v-img src="../assets/svg/profile-users.svg"></v-img>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <MiniCart />
    <!-- <div
      style="height: 50px; width: 50px"
      :class="this.colors"
      @click="dialog = true"
    >
      <v-dialog v-model="dialog" max-width="226">
        <v-card>
          <chrome-picker :value="colors" @input="updateValue" />

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">
              Disagree
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div> -->
    <span
      class="input-group color-picker"
      ref="colorpicker"
      style="border: 1px solid red; display: in-line"
    >
      <span
        class="current-color"
        :style="'background-color: ' + colorValue"
        @click="togglePicker()"
      ></span>
      <chrome-picker
        :value="colors"
        @input="updateFromPicker"
        v-if="displayPicker"
      />
    </span>
    <!-- <chrome-picker :value="colors" @input="updateValue" /> -->
  </v-container>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import MiniCart from "@/components/MiniCart.vue";
import { Chrome } from "vue-color";
export default {
  name: "About",
  components: { Navbar, MiniCart, "chrome-picker": Chrome },

  data() {
    return {
      dialog: false,
      colors: {
        hex: "#000000",
      },
      colorValue: "",
      displayPicker: false,
    };
  },
  // methods: {
  //   updateValue(value) {
  //     this.colors = value;
  //   },
  // },

  methods: {
    setColor(color) {
      this.updateColors(color);
      this.colorValue = color;
    },
    updateColors(color) {
      if (color.slice(0, 1) == "#") {
        this.colors = {
          hex: color,
        };
      } else if (color.slice(0, 4) == "rgba") {
        var rgba = color.replace(/^rgba?\(|\s+|\)$/g, "").split(","),
          hex =
            "#" +
            (
              (1 << 24) +
              (parseInt(rgba[0]) << 16) +
              (parseInt(rgba[1]) << 8) +
              parseInt(rgba[2])
            )
              .toString(16)
              .slice(1);
        this.colors = {
          hex: hex,
          a: rgba[3],
        };
      }
    },
    showPicker() {
      document.addEventListener("click", this.documentClick);
      this.displayPicker = true;
    },
    hidePicker() {
      document.removeEventListener("click", this.documentClick);
      this.displayPicker = false;
    },
    togglePicker() {
      this.displayPicker ? this.hidePicker() : this.showPicker();
    },
    updateFromInput() {
      this.updateColors(this.colorValue);
    },
    updateFromPicker(color) {
      this.colors = color;
      if (color.rgba.a == 1) {
        this.colorValue = color.hex;
      } else {
        this.colorValue =
          "rgba(" +
          color.rgba.r +
          ", " +
          color.rgba.g +
          ", " +
          color.rgba.b +
          ", " +
          color.rgba.a +
          ")";
      }
    },
    documentClick(e) {
      var el = this.$refs.colorpicker,
        target = e.target;
      if (el !== target && !el?.contains(target)) {
        this.hidePicker();
      }
    },
  },
  watch: {
    colorValue(val) {
      if (val) {
        this.updateColors(val);
        this.$emit("input", val);
        //document.body.style.background = val;
      }
    },
  },

  mounted() {
    this.setColor(this.color || "#000000");
  },
};
</script>

<style>
h1 {
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.vc-chrome {
  position: relative;
  top: 15px;
  right: 0;
  /* z-index: 9; */
}
.current-color {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-color: #000;
  cursor: pointer;
}
.footer {
  margin-top: 20px;
  text-align: center;
}
</style>
