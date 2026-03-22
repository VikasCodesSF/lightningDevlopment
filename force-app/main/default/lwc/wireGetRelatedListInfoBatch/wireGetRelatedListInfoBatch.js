// Use this wire adapter to get the metadata for a batch of RelatedList
import { LightningElement, wire } from "lwc";
import { getRelatedListInfoBatch } from "lightning/uiRelatedListApi";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

export default class WireGetRelatedListInfoBatch extends LightningElement {
  error;
  results;
  @wire(getRelatedListInfoBatch, {
    parentObjectApiName: ACCOUNT_OBJECT.objectApiName,
    relatedListNames: ["Contacts", "Opportunities"],
  })
  listInfo({ error, data }) {
    if (data) {
        console.log('wireGetRelatedListInfoBatch', data.results);
      this.results = data.results;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.results = undefined;
    }
  }
}