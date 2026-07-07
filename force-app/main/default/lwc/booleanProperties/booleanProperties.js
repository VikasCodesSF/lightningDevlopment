import { LightningElement } from 'lwc';
export default class BooleanProperties extends LightningElement {
    isLoading = false;

    handleClick(){
      this.isLoading =!this.isLoading;  
    }

    handleStopClick(){
        isLoading = false;
    }
}