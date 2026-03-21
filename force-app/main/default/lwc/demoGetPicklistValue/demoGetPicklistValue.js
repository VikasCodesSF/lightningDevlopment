import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues, getPicklistValuesByRecordType  } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import RATING_FIELD from "@salesforce/schema/Account.Rating";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";

export default class DemoGetPicklistValue extends LightningElement {

    accountRecordTypeId;
    ratings;
    industryoptions = [];
    value;
    Active;
    SLA;
    selectedActive;
    selectedSLA;


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

    handleChange(event) {
        this.value = event.detail.value;
    }

    gemneratePicklist(data){
        return data.values.map(item => (
             {
                label: item.label,
                value: item.value
            }))
    }


    @wire(getPicklistValuesByRecordType, { objectApiName: ACCOUNT_OBJECT, recordTypeId: "$objectInfoData.data.defaultRecordTypeId"})
    allPicklists({data, error}){
        if(data){
            this.Active = [... this.gemneratePicklist(data.picklistFieldValues.Active__c)];
            console.log('Active', this.Active)
            this.SLA = [... this.gemneratePicklist(data.picklistFieldValues.SLA__c)];
            console.log('SLA',this.SLA)
        }else if(error){
            this.error = error;
            this.industry = undefined;
        }
    }

    handlePicklisthange(event) {
        const value = event.detail.value;
        const label = event.target.label?.toLowerCase();

        // Prefer a name attribute if provided; fallback to label heuristic
        const name = event.target.name ? String(event.target.name).toLowerCase() : label;

        if (name === 'active' || label === 'active') {
            this.selectedActive = value;
        } else if (name === 'sla' || label === 'sla') {
            this.selectedSLA = value;
        }
        // Optional: log safely
        // console.log(`picklist change: ${name} -> ${value}`);
    }
}
