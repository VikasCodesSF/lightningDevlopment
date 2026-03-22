// wireGetRelatedListInfo.js
import { LightningElement, wire, api } from "lwc";
import { getRelatedListInfo } from "lightning/uiRelatedListApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class WireGetRelatedListInfo extends LightningElement {
  error;
  displayColumns;
  @api recordId
  @wire(getRelatedListInfo, {
    parentObjectApiName: ACCOUNT_OBJECT.objectApiName,
    relatedListId: "Contacts",
    // recordTypeId: '$recordId'
  })
  listInfo({ error, data }) {
    if (data) {
        console.log('displayColumns', JSON.parse(JSON.stringify(data)));
        this.displayColumns = data.displayColumns;
        this.error = undefined;
    } else if (error) {
        this.error = error;
        this.displayColumns = undefined;
    }
  }
}