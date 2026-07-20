import { LightningElement, api } from 'lwc';
export default class LdsEditRecord extends LightningElement {
        @api recordId;
    @api objectApiName;

    connectedCallback() {
        console.log('recordId', this.recordId);
        console.log('objectApiName', this.objectApiName);
    }

    handleSuccess(event){
        alert('Record is saved');
        console.log(JSON.stringify(event.detail))
    }

    handleError(event){
        alert('Error Occured');
        console.log(JSON.stringify(event.detail))
    }

}