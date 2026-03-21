import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import RATING_FIELD from "@salesforce/schema/Account.Rating";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class DemoGetPicklistValue extends LightningElement {

    accountRecordTypeId;
    ratings;
    industryoptions= [];
    value;

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    results({ error, data }) {
        if (data) {
        this.accountRecordTypeId = data.defaultRecordTypeId;
        this.error = undefined;
        } else if (error) {
        this.error = error;
        this.accountRecordTypeId = undefined;
        }
    }


  @wire(getPicklistValues, { recordTypeId: "$accountRecordTypeId", fieldApiName: RATING_FIELD })
  picklistResults({ error, data }) {
        if (data) {
            console.log('Piclikst data', data);
        console.log('Piclikst data.values', data.values);
        this.ratings = data.values;
        this.error = undefined;
        } else if (error) {
        this.error = error;
        this.ratings = undefined;
        }
    }



   @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
   objectInfoData

   @wire(getPicklistValues, { recordTypeId: "$objectInfoData.data.defaultRecordTypeId", 
    fieldApiName: INDUSTRY_FIELD })
    industryDemo({ error, data }) {
        if (data) {
            console.log('Pick List data', data);
            console.log('Pick List', data.values);
            this.industryoptions = [... this.gemneratePicklist(data)];
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.industry = undefined;
        }
    }

    handleChange(event){
        this.value = event.detail.value;
    }

    gemneratePicklist(data){
        return data.values.map(item => (
             {
                label: item.label,
                value: item.value
            }))
    }
}