import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let localCart = window.localStorage.getItem("cart");
let localCartItems = window.localStorage.getItem("itemsInCart");
let localTotalPrice = window.localStorage.getItem("sum");

export default new Vuex.Store({
  state: {
    cart: localCart ? JSON.parse(localCart) : [],
    cartDialog: null,
    sum: localTotalPrice ? JSON.parse(localTotalPrice) : 0,
    itemsInCart: localCartItems ? JSON.parse(localCartItems) : 0,
  },
  mutations: {
    ADD_T0_CART(state, item) {
      let itemExist = state.cart.find((newItem) => {
        return newItem === item;
      });
      if (itemExist) {
        itemExist.productQuantity++;
      } else {
        state.cart.push(item);
      }
      state.itemsInCart++;

      this.commit("getTotalPrice", state.cart);
      this.commit("saveData");
    },

    changeCart(state, item) {
      state.cartDialog = item;
    },

    saveData(state) {
      window.localStorage.setItem("cart", JSON.stringify(state.cart));
      window.localStorage.setItem(
        "itemsInCart",
        JSON.stringify(state.itemsInCart)
      );
      window.localStorage.setItem("sum", JSON.stringify(state.sum));
    },

    removeFromCart(state, item) {
      let itemPosition = state.cart.indexOf(item);
      state.cart.splice(itemPosition, 1);
      state.itemsInCart = state.itemsInCart - item.productQuantity;
      this.commit("getTotalPrice", state.cart);
      this.commit("saveData");
    },

    getTotalPrice(state, cartData) {
      state.sum = 0;
      cartData.forEach((item) => {
        state.sum =
          state.sum +
          parseFloat(item.productPrice) * parseInt(item.productQuantity);
      });
      return state.sum;
    },
  },

  // The recommended way is to use actions to call mutations. Especially for asynchronous functions.
  actions: {
    addToCart({ commit }, item) {
      commit("ADD_T0_CART", item);
    },
  },
});
