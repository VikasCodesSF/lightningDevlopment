import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord, createRecordInputFilteredByEditedFields, getCreateRecordDefaultRecordInput } from 'lightning/uiRecordApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';
import ACCOUNT_WEBSITE from '@salesforce/schema/Account.Website';

export default class CreateRecordFilteredExample extends LightningElement {

    accountName;
    accountPhone;
    accountWebsite;
    creating = false;

    handleAccountName(event){
        this.accountName = event.target.value;
        console.log('AccountName is:', this.accountName);
    }

    handleAccountPhone(event){
        this.accountPhone = event.target.value;
        console.log('AccountPhone is:', this.accountPhone);
    }

    handleAccountWebsite(event){
        this.accountWebsite = event.target.value;
        console.log('AccountWebsite is:', this.accountWebsite);
    }

    async createAccount(){
        this.creating = true;
        try {
            // Build the fields map only with provided (non-empty) values
            const fields = {};

            fields[ACCOUNT_NAME.fieldApiName] = this.accountName;
            fields[ACCOUNT_PHONE.fieldApiName] = this.accountPhone;
            fields[ACCOUNT_WEBSITE.fieldApiName] = this.accountWebsite;

            const fullRecordInput = { apiName: ACCOUNT_OBJECT.objectApiName, fields };

            // Filter to include only edited fields before create
            const recordInput = createRecordInputFilteredByEditedFields(fullRecordInput);

            const result = await createRecord(recordInput);

            // Guard result before reading id
            const recId = result && result.id ? result.id : null;
            if (!recId) {
                throw new Error('Record creation returned no Id.');
            }

            const evt = new ShowToastEvent({
                title : 'Account Created Successfully',
                message : 'Record Id: ' + recId,
                variant : 'success'
            });
            this.dispatchEvent(evt);

            // Reset local state similar to original example reset
            this.accountName = undefined;
            this.accountPhone = undefined;
            this.accountWebsite = undefined;

        } catch (error) {
            // Surface error
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: (error && error.body && error.body.message) || error.message || 'Unknown error',
                    variant: 'error'
                })
            );
            // Also log for debugging
            // eslint-disable-next-line no-console
            console.error(error);
        } finally {
            this.creating = false;
        }
    }
}
