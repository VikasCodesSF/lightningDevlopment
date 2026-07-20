import { LightningElement, api } from 'lwc';
export default class LdsLoadRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    connectedCallback() {
        console.log('recordId', this.recordId);
        console.log('objectApiName', this.objectApiName);
    }

    fieldList = ["Name", "Industry", "Description", "Active__c"]
}