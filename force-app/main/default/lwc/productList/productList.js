import { LightningElement, wire } from 'lwc';
import getProducts from '@salesforce/apex/ProductController.getProducts';
import getProductByCode from '@salesforce/apex/ProductController.getProductByCode';
export default class ProductList extends LightningElement {
    products;
    error;
    filteredProducts;
    productCode= 'GC1060'

    // Wire with property
    @wire(getProducts)
    wiredProducts({ error, data }) {
        if (data) {
            this.products = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.products = undefined;
        }
    }

    // Wire with property
    @wire(getProductByCode, {productCode: "$productCode"})
    wiredProductCode({ error, data }) {
        if (data) {
            this.filteredProducts = data;
            console.log('this.filteredProducts', this.filteredProducts);
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.filteredProducts = undefined;
        }
    }
}