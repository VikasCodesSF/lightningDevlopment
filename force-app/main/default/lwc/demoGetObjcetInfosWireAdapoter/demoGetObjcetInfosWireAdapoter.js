import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getObjectInfos } from "lightning/uiObjectInfoApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";
import OPPORTUNITY_OBJECT from "@salesforce/schema/Opportunity";

export default class DemoGetObjcetInfosWireAdapoter extends LightningElement {
    defaultRecordTypeIds = '';
    objectInfos
    //getObjectInfo using function 
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfoData({ data, error }) {
        if (data) {
            console.log('objectInfoData data', data);
            this.defaultRecordTypeIds = data.defaultRecordTypeId || '';
        } else if (error) {
            // Using console.error helps surface in browser devtools
            // and makes it obvious in logs.
            // You can also expose a user-friendly message if needed.
            console.error('objectInfoData error', JSON.stringify(error));
            this.defaultRecordTypeIds = '';
        }
    }
    
    // getObjectInfo using Property 
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    ObjectInfoDataProperty


    /// getObjectInfos using function 
    objectApiNames = [ACCOUNT_OBJECT, OPPORTUNITY_OBJECT]

     @wire(getObjectInfos, { objectApiNames:'$objectApiNames' })
     objectInfosfub({ error, data }) {
        if (data) {
            console.log('objectInfos data', data);
            this.objectInfos = data;
        } else if (error) {
            console.log('error', error);
        }
    }

    // getObjectInfos using Property 
    @wire(getObjectInfos, { objectApiNames: '$objectApiNames' })
    objectInfosProperty; // { data: { results: [...] }, error }

    // Safe getter to iterate in template
    get objectInfosResults() {
        return this.objectInfosProperty?.data?.results ?? [];
    }
}