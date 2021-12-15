<template>
  <div>
    <Admin />
    <v-container class="mt-16">
      <v-row class="pa-4">
        <v-col class="col-md-6 my-auto">
          <p class="text-center text-h4">Products</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
            assumenda molestiae ipsum. Omnis, voluptatum odit. Harum aspernatur
            ad, voluptatibus earum consectetur veniam deleniti aliquam veritatis
            rem quod itaque vero obcaecati! Reiciendis voluptates, ipsam quas
            hic
          </p>
          <v-dialog v-model="addProductDialog" max-width="590">
            <v-card>
              <v-form
                ref="ProductForm"
                v-model="productFormValid"
                lazy-validation
              >
                <v-card-text>
                  <v-container>
                    <v-card-text class="text-center pa-0 text-h6">
                      Add Product
                    </v-card-text>
                    <v-text-field
                      label="Product Name"
                      name="name"
                      :rules="nameRules"
                      v-model="product.productName"
                      type="text"
                      color="primary"
                      required
                      placeholder="Product Name"
                    ></v-text-field>
                    <v-text-field
                      label="Price"
                      name="price"
                      :rules="priceRules"
                      v-model="product.productPrice"
                      type="number"
                      color="primary"
                      required
                      placeholder="Product price"
                    ></v-text-field>
                    <v-btn color="primary darken-1" block @click="saveData">
                      Save Data
                    </v-btn>
                  </v-container>
                </v-card-text>
              </v-form>
            </v-card>
          </v-dialog>
        </v-col>
        <v-col class="col-md-6">
          <v-img src="../assets/svg/product.svg"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="px-16">
          <hr />
          <h1 class="d-inline">Product List</h1>
          <!-- <v-spacer></v-spacer> -->
          <v-btn class="float-right primary darken-1" @click="addProduct()"
            >Add Product</v-btn
          >
          <table>
            <col style="width: 35%" />
            <col style="width: 30%" />
            <col style="width: 35%" />
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th class="d-flex justify-center">Modify</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, idx) in this.products" :key="idx">
                <td>{{ product.data().productName }}</td>
                <td>{{ product.data().productPrice }}</td>
                <td class="d-flex justify-center">
                  <v-btn
                    color="primary darken-1"
                    class="ma-1"
                    @click="editProduct(product)"
                    >Edit</v-btn
                  >
                  <v-btn
                    color="secondary darken-1"
                    class="ma-1"
                    @click="deleteProduct(product.id)"
                    >Delete</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </v-col>
      </v-row>
      <!-- Pop dialog for editing product information -->
      <v-dialog v-model="editDialog" max-width="590">
        <v-card>
          <v-form ref="ProductForm" v-model="productFormValid" lazy-validation>
            <v-card-text>
              <v-container>
                <v-card-text class="text-center pa-0 text-h6">
                  Edit Product
                </v-card-text>
                <v-text-field
                  label="Product Name"
                  name="name"
                  :rules="nameRules"
                  v-model="product.productName"
                  type="text"
                  color="primary"
                  required
                  placeholder="Product Name"
                ></v-text-field>
                <v-text-field
                  label="Price"
                  name="price"
                  :rules="priceRules"
                  v-model="product.productPrice"
                  type="number"
                  color="primary"
                  required
                  placeholder="Product price"
                ></v-text-field>
                <v-btn color="primary darken-1" block @click="updateProduct()">
                  Save Changes
                </v-btn>
              </v-container>
            </v-card-text>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="editDialog = false">
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
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
  </div>
</template>

<script>
import Admin from "../views/Admin.vue";
import { db } from "../firebase.js";
export default {
  name: "Products",
  components: { Admin },

  data() {
    return {
      product: {
        productName: null,
        productPrice: null,
      },
      products: [],
      editDialog: false,
      addProductDialog: false,
      activeItem: null,
      productFormValid: true,
      snackBarText: "",
      snackbar: false,
      upgradeValue: null,
      nameRules: [(value) => !!value || "Name is required"],
      priceRules: [(value) => !!value || "Price is required"],
    };
  },
  methods: {
    watcher() {
      db.collection("products").onSnapshot((querySnapshot) => {
        this.products = [];
        querySnapshot.forEach((doc) => {
          this.products.push(doc);
        });
      });
    },
    saveData() {
      if (!this.$refs.ProductForm.validate()) return;
      db.collection("products")
        .add(this.product)
        .then((docRef) => {
          this.snackbar = true;
          this.upgradeValue = true;
          this.snackBarText = "Product added successfully";
          this.addProductDialog = false;
          // this.readData();
          this.watcher();
          console.log("Document written with ID: ", docRef.id);
          setTimeout(() => this.$refs.ProductForm.reset(), 2000);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    },
    readData() {
      db.collection("products")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            this.products.push(doc); // doc.data() useful when reading only data. But deleting, you must push doc
            console.log(doc.id, " => ", doc.data());
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    },
    deleteProduct(doc) {
      if (confirm("Are you sure?")) {
        db.collection("products")
          .doc(doc)
          .delete()
          .then(() => {
            this.watcher();
            console.log("Document successfully deleted!");
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    },
    editProduct(product) {
      this.editDialog = true;
      // save the item id to the activeItem so we can have access to it in updateProduct() function
      this.activeItem = product.id;
      this.product = product.data();
    },
    addProduct() {
      this.addProductDialog = true;
      // save the item id to the activeItem so we can have access to it in updateProduct() function
      // this.activeItem = product.id;
      // this.product = product.data();
    },
    updateProduct() {
      db.collection("products")
        .doc(this.activeItem)
        .update(this.product)
        .then(() => {
          this.editDialog = false;
          this.watcher();
          this.$refs.ProductForm.reset(), 2000;
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    },
  },
  created() {
    this.readData();
  },
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

table.a {
  table-layout: auto;
  width: 880px;
}
</style>
