import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let localCart = window.localStorage.getItem("cart");

export default new Vuex.Store({
  state: {
    cart: localCart ? JSON.parse(localCart) : [],
    cartDialog: null,
    sum: null,
  },
  mutations: {
    addToCart(state, item) {
      let itemExist = state.cart.find((newItem) => {
        return newItem === item;
      });
      if (itemExist) {
        itemExist.productQuantity++;
      } else {
        state.cart.push(item);
      }

      this.commit("saveData");
    },
    changeCart(state, item) {
      state.cartDialog = item;
    },
    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
    },

    removeFromCart(state, item) {
      let itemPosition = state.cart.indexOf(item);
      state.cart.splice(itemPosition, 1);
      this.commit("saveData");
    },

    getTotalPrice(state, cartData) {
      state.sum = 0;
      cartData.forEach((item) => {
        state.sum = state.sum + parseFloat(item.productPrice);
      });
      return state.sum;
    },
  },
});
