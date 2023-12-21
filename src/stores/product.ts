import { defineStore } from "pinia";
import { useApiPrivate } from "../composables/useApi";
import router from "@/router";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: Float32Array;
  image: string;
}

export interface State {
  product: Product;
  accessToken: string;
  authReady: boolean;
}

export const useProductStore = defineStore('product', {
  state: (): State => {
    return {
      product: {} as Product,
      accessToken: "" as string,
      authReady: false as boolean
    };
  },

  getters: {
    userDetail: (state: State) => state.product,
    isAuthenticated: (state: State) => state.accessToken ? true : false
  },

  actions: {
    async attempt() {
      try {
        await this.getProducts();
      } catch (error) {
        return;
      }
    },

    async getProducts() {
      try {
        const { data } = await useApiPrivate().get(`/api/products/getAllProducts`);
        this.product = data;
        return data;
      } catch (error: Error | any) {
        throw error.message;
      }
    },

    async addProduct(newProduct: Product) {
      try {
        const api = useApiPrivate();
        const { data } = await api.post('/api/products/addProduct', newProduct);
        router.push('/products');
        return data;
      } catch (error) {
        console.error('Error adding product:', error);
        throw error.message;
      }
    },

    async getProductdata(id: any) {
      try {
        const api = useApiPrivate();
        const { data } = await api.get(`/api/products/getProductById/${id}`);
        this.product = data;
        return data;
      } catch (error) {
        console.error('Error getting product data:', error);
        throw error.message;
      }
    },

    async updateProduct(updatedProduct: Product) {
      try {
        const api = useApiPrivate();
        const { data } = await api.put(`/api/products/updateProduct/${updatedProduct.id}`, updatedProduct);
        // Assuming the API response contains the updated product data
        this.product = data;
        return data;
      } catch (error) {
        console.error('Error updating product:', error);
        throw error.message;
      }
    },

    async deleteProduct(productId: number) {
      try {
        const api = useApiPrivate();
        await api.delete(`/api/products/deleteProduct/${productId}`);
        
        // Assuming you want to refresh the product list after deletion
        await this.getProducts();
        
        return true; // You can return true or any value to indicate success
      } catch (error) {
        console.error('Error deleting product:', error);
        throw error.message;
      }
    }


  }
});
