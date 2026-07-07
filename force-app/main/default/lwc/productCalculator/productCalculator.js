import { LightningElement } from 'lwc';
export default class ProductCalculator extends LightningElement {
    _price = 100;
    _quantity = 1;
    taxRate =1.10;

    get price(){
        return this._price;
    }

    get quantity(){
        return this._quantity;
    }
    set quantity(value){
        if(parseInt(value)>= 1){
            this._quantity = parseInt(value);
        }else{
             this._quantity = 1;
        }
    }

    get subTotal(){
        return this._price*this._quantity
    }

    get tax(){
        return this.subTotal+this.taxRate
    }

    get total(){
        return this.subTotal+this.tax
    }

    get formmatedTotal(){
        return `${this.total.toFixed(2)}`
    }

    handleClick(){
        this.quantity = this.quantity +1;
    }
}