import { LightningElement } from 'lwc';
export default class Setter extends LightningElement {
    _count = 0;
    _message = '';

    get count(){
        return this._count;
    }

    set count(value){

        if(typeof(value) === 'number'){
            this._count=value;
            this._message = '';   
            }else{
            this._message = 'Count must be number';
        }
    }

    handleClick(){
        // this._count = this._count+1;
        //Now use setter
        //this.count = this.count+1; // this.count+1 is passed as value in setter set count()
        this.count = 'Error'; // to check else part of setter
    }

}