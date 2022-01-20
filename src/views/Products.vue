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
          <v-dialog v-model="addProductDialog" max-width="830">
            <v-card>
              <v-form
                ref="ProductForm"
                v-model="productFormValid"
                lazy-validation
              >
                <v-card-text>
                  <v-container>
                    <!-- <v-card-text class="text-start pa-0 text-h6">
                      Add Product
                    </v-card-text> -->
                    <v-card-title class="pa-0" v-if="this.modal == 'add'"> Add Product </v-card-title>
                    <v-card-title class="pa-0" v-if="this.modal == 'edit'"> Edit Product </v-card-title>
                    <v-divider></v-divider>
                    <v-row>
                      <v-col cols="12" sm="6" md="7">
                        <v-text-field
                          label="Product Name"
                          name="name"
                          v-model="product.productName"
                          type="text"
                          color="primary"
                          required
                          placeholder="Product Name"
                        ></v-text-field>
                        <!-- <v-textarea
                          filled
                          v-model="product.description"
                          name="description"
                          label="Product description"
                          value=""
                          rows="8"
                        ></v-textarea> -->
                        <vue-editor v-model="product.description"></vue-editor>
                      </v-col>
                      <v-col>
                        <v-card-text class="text-start pa-0 text-h6">
                          Product Details
                        </v-card-text>
                        <v-text-field
                          label="Product Price"
                          name="price"
                          v-model="product.productPrice"
                          type="number"
                          color="primary"
                          required
                          placeholder="Product price"
                        ></v-text-field>
                        <div>
                          <v-text-field
                            label="Product tags"
                            name="tag"
                            v-model="tag"
                            type="text"
                            color="primary"
                            placeholder="Product tag"
                            @keyup.188="addTag()"
                          ></v-text-field>
                          <div class="d-flex">
                            <p v-for="(tag, idx) in product.tags" :key="idx">
                              <span class="pa-1">{{ tag }}</span>
                            </p>
                          </div>
                        </div>

                        <v-file-input
                          show-size
                          accept="image/*"
                          label="Choose Image"
                          @change="uploadImage"
                        ></v-file-input>
                        <div class="d-flex">
                          <v-card
                            width="90px"
                            class="pa-1"
                            v-for="(image, idx) in this.product.images"
                            :key="idx"
                          >
                            <v-btn
                              class="fixed"
                              color=""
                              dark
                              x-small
                              absolute
                              fab
                              @click="deleteImage(image, idx)"
                            >
                              <v-icon>mdi-close</v-icon>
                            </v-btn>

                            <v-img :src="image"></v-img>
                          </v-card>
                        </div>
                      </v-col>
                    </v-row>

                    <v-btn
                      color="primary darken-1 mt-2"
                      block
                      @click="addProduct"
                      v-if="this.modal == 'add'"
                    >
                      Save Data
                    </v-btn>
                    <v-btn
                      color="primary darken-1 mt-2"
                      block
                      @click="updateProduct"
                      v-if="this.modal == 'edit'"
                    >
                      Save Changes
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
          <v-btn class="float-right primary darken-1" @click="addProductPopUp()"
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
                <td>{{ product.productName }}</td>
                <td>{{ product.productPrice }}</td>
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
                    @click="deleteProduct(product)"
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
import { VueEditor } from "vue2-editor";
import Admin from "../views/Admin.vue";
import { db, storage } from "../firebase.js";
export default {
  name: "Products",
  components: { Admin, VueEditor },

  data() {
    return {
      product: {
        productName: null,
        productPrice: null,
        tags: [],
        description: null,
        images: [],
      },
      tag: null,
      modal: null,
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
  firestore() {
    return {
      // Collection
      products: db.collection("products"),
    };
  },
  methods: {
    // watcher() {
    //   db.collection("products").onSnapshot((querySnapshot) => {
    //     this.products = [];
    //     querySnapshot.forEach((doc) => {
    //       this.products.push(doc);
    //     });
    //   });
    // },
    reset() {
      this.product = {
        productName: null,
        productPrice: null,
        tags: [],
        description: null,
        images: [],
      };
    },
    addProduct() {
      if (!this.$refs.ProductForm.validate()) return;
      this.$firestore.products.add(this.product);
      this.addProductDialog = false;
      window.Toast.fire({
        icon: "success",
        title: "Product added successfully",
      });
      // db.collection("products")
      //   .add(this.product)
      //   .then((docRef) => {
      //     this.snackbar = true;
      //     this.upgradeValue = true;
      //     this.snackBarText = "Product added successfully";
      //     this.addProductDialog = false;
      //     this.watcher();
      //     console.log("Document written with ID: ", docRef.id);
      //     setTimeout(() => this.$refs.ProductForm.reset(), 2000);
      //   })
      //   .catch((error) => {
      //     console.error("Error adding document: ", error);
      //   });
    },
    readData() {
      // db.collection("products")
      //   .get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       // doc.data() is never undefined for query doc snapshots
      //       this.products.push(doc); // doc.data() useful when reading only data. But deleting, you must push doc
      //       console.log(doc.id, " => ", doc.data());
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("Error getting documents: ", error);
      //   });
    },
    deleteProduct(doc) {
      window.Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.$firestore.products.doc(doc.id).delete();
          console.log(doc[".key"]);
          window.Toast.fire({
            icon: "success",
            title: "Deleted successfully",
          });
          // window.Swal.fire(
          //   "Deleted!",
          //   "Your file has been deleted.",
          //   "success"
          // );
        }
      });
      //   if (confirm("Are you sure?")) {
      //     db.collection("products")
      //       .doc(doc)
      //       .delete()
      //       .then(() => {
      //         this.watcher();
      //         console.log("Document successfully deleted!");
      //       })
      //       .catch((error) => {
      //         console.error("Error removing document: ", error);
      //       });
      //   }
    },
    editProduct(product) {
      this.modal = "edit";
      this.addProductDialog = true;
      this.product = product;
      //   this.editDialog = true;
      //   // save the item id to the activeItem so we can have access to it in updateProduct() function
      //   this.activeItem = product.id;
      //   this.product = product.data();
    },
    addProductPopUp() {
      this.modal = "add";
      this.reset();
      this.addProductDialog = true;
      // save the item id to the activeItem so we can have access to it in updateProduct() function
      // this.activeItem = product.id;
      // this.product = product.data();
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);
      window.Toast.fire({
        icon: "success",
        title: "Updated successfully",
      });
      this.addProductDialog = false;
      // db.collection("products")
      //   .doc(this.activeItem)
      //   .update(this.product)
      //   .then(() => {
      //     this.editDialog = false;
      //     this.watcher();
      //     this.$refs.ProductForm.reset(), 2000;
      //     console.log("Document successfully updated!");
      //   })
      //   .catch((error) => {
      //     // The document probably doesn't exist.
      //     console.error("Error updating document: ", error);
      //   });
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e) {
        let file = e;
        let storageRef = storage.ref("products/" + file.name);
        let uploadTask = storageRef.put(file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (error) => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.product.images.push(downloadURL);
              console.log("File available at", downloadURL);
            });
          }
        );
      }
    },
    deleteImage(img, index) {
      let image = storage.refFromURL(img);
      this.product.images.splice(index, 1);
      image
        .delete()
        .then(() => {
          console.log("Image deleted");
        })
        .catch(() => {
          console.log("error occured");
        });
    },
  },
  created() {
    // this.readData();
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
.fixed {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
}
</style>
