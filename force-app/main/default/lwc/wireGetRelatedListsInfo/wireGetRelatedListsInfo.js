// wireGetRelatedListsInfo.js
import { LightningElement, wire } from "lwc";
import { getRelatedListsInfo } from "lightning/uiRelatedListApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";


// Use this wire adapter to get the metadata for RelatedLists in an object’s default layout.
export default class WireGetRelatedListsInfo extends LightningElement {
  error;
  relatedLists;
  @wire(getRelatedListsInfo, {
    parentObjectApiName: ACCOUNT_OBJECT.objectApiName,
    recordTypeId: "001NS00002XTBM0YAP", //optional
  })
  listInfo({ error, data }) {
    if (data) {
      this.relatedLists = data.relatedLists;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.relatedLists = undefined;
    }
  }
}