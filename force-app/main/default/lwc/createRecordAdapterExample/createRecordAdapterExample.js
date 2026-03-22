import { LightningElement, wire } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import { ShowToastEvent } from "lightning/platformShowToastEvent";


export default class CreateRecordAdapterExample extends LightningElement {

    accountName;
    accountPhone;

    handleAccountName(event){
        this.accountName = event.target.value;
        console.log('AccountName is:', this.accountName);
    }

    handleAccountPhone(event){
        this.accountPhone = event.target.value;
        console.log('AccountPhone is:', this.accountPhone);
    }

    createAccount(){
        const fields = {};

        fields[ACCOUNT_NAME.fieldApiName] = this.accountName;
        fields[ACCOUNT_PHONE.fieldApiName] = this.accountPhone;

        const recordInput = {apiName : ACCOUNT_OBJECT.objectApiName, fields};

        createRecord(recordInput)
            .then((result) => {
                console.log(result);
                const evt = new ShowToastEvent({
                    title : 'Account Updated Successfully',
                    message : 'Record Id: ' + result.id,
                    variant : 'success'
                });
                this.dispatchEvent(evt);
            })
            .catch((error) => {
                console.log(error);
            })
    }
}