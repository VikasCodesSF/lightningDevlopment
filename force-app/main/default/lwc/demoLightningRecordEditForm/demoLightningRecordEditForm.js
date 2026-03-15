import { LightningElement, api } from 'lwc';
import CONTACT_OBJECT from '@salesforce/schema/Contact';
import NAME_FEILD from '@salesforce/schema/Contact.Name';
import TITLE_FIELD from '@salesforce/schema/Contact.Title';
import PHONE_FIELD from '@salesforce/schema/Contact.Phone';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
import ACCOUNTID_FIELD from '@salesforce/schema/Contact.AccountId';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class DemoLightningRecordEditForm extends LightningElement {
    @api recordId
    @api objectApiName = CONTACT_OBJECT;
    
    // objectApiName = ACCOUNT_OBJECT;
    fieldList = {
        nameFeild:NAME_FEILD, 
        titleField:TITLE_FIELD, 
        phonefield:PHONE_FIELD, 
        accountIdField:ACCOUNTID_FIELD, 
        emailField:EMAIL_FIELD
    }

    successHandler(event){
        console.log(event.detail.id);
        this.dispatchEvent(new ShowToastEvent({
            title: "Account created successfully",
            message: "Record ID: "+ event.detail.id,
            variant:"success"
        }))
    }

    handleReset(){
        const inputFields = this.template.querySelectorAll('lightning-input-field');
        if(inputFields){
            Array.from(inputFields).forEach(field => {
                field.reset();
            });
        }
    }
}