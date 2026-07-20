import { LightningElement, api } from 'lwc';
export default class LdsViewRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    connectedCallback() {
        console.log('recordId', this.recordId);
        console.log('objectApiName', this.objectApiName);
    }
}