import { LightningElement, api } from 'lwc';
export default class LdsCreateRecord extends LightningElement {
    @api recordId;
    @api objectApiName;

    fieldList = ["Name", "Industry", "Description", "Active__c"]

    connectedCallback() {
        console.log('recordId', this.recordId);
        console.log('objectApiName', this.objectApiName);
    }

    handleSuccess(event){
        let recordId = event.detail.Id;
        console.log(JSON.stringify(event.detail))
    }

    handleError(event){
        console.log(JSON.stringify(event.detail))
    }

    handleSubmit(event){
     event.preventDefault();
     let fields = event.detail.fields;
     fields.Description = ' Override default behaviour via submit button';
     this.refs.accountRef.submit(fields);
    }


}