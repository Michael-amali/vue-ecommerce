<template>
  <div>
    <Admin />

    <v-container class="mt-16">
      <v-row class="pa-4">
        <v-col class="col-md-6">
          <p class="text-center text-h4" id="category-list">Overiew</p>
          <p id="category-item1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            assumenda molestiae ipsum. Omnis, voluptatum odit. Harum aspernatur
            ad, voluptatibus earum consectetur veniam deleniti aliquam veritatis
            rem quod itaque vero obcaecati! Reiciendis voluptates, ipsam quas
            hic
          </p>
        </v-col>
        <v-col class="col-md-6" id="category-item2">
          <v-img src="../assets/svg/overview.svg"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Admin from "../views/Admin.vue";
import introJS from "intro.js";
import "intro.js/introjs.css";
import {debounce} from 'lodash';
// import "intro.js/minified/introjs.min.css";
export default {
  name: "Overview",
  components: { Admin },

  data() {
    return {};
  },
  methods: {
    introSetup() {
      let steps = [
        { title: `Welcome`, intro: `Hi! Let me show you around` },
        {
          intro: `Find similar talks`,
          element: document.querySelector("#category-list"),
        },
        {
          intro: `Hope alive`,
          element: document.querySelector("#category-item1"),
        },
        {
          intro: `Now I know`,
          element: document.querySelector("#category-item2"),
        },
      ];
      let tour = introJS();
      tour.setOptions({
        steps: steps.filter((step) => {
          if (Object.prototype.hasOwnProperty.call(step, "element")) {
            return true;
          }
          // return !!step.element.getClientRects().length;
        }),
      });
      tour.onexit(() => window.removeEventListener("resize", refreshTourSteps));
      tour.oncomplete(() =>
        window.removeEventListener("resize", refreshTourSteps)
      );
      tour.start();

      const refreshTourSteps = debounce(() => {
        tour.setOptions({
          steps: steps.filter((step) => {
            if (Object.prototype.hasOwnProperty.call(step, "element")) {
              return true;
            }
            // return !!step.element.getClientRects().length;
          }),
        });
      });

      window.addEventListener("resize", refreshTourSteps);
      tour.refresh(true);
    },
  },
  mounted() {
    this.introSetup();
  },
};
</script>
