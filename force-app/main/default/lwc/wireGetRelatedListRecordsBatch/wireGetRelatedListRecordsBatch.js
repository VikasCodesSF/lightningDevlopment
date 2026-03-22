// wireGetRelatedListRecordsBatch.js
import { LightningElement, wire, api } from "lwc";
import { getRelatedListRecordsBatch } from "lightning/uiRelatedListApi";
export default class WireGetRelatedListRecordsBatch extends LightningElement {
  error;
  results;
  @api recordId

  //Use this wire adapter to get records for a batch of RelatedLists.

  @wire(getRelatedListRecordsBatch, {
    parentRecordId: "$recordId",
    relatedListParameters: [
      {
        relatedListId: "Contacts",
        fields: ["Contact.Name", "Contact.Id"],
        sortBy: ["Contact.Name"],
        where: '{ Name: { like: "Gomu%" }}'
      },
      {
        relatedListId: "Opportunities",
        fields: ["Opportunity.Name", "Opportunity.Amount"],
        sortBy: ["Opportunity.Amount"],
        //where: "{ and: [{ Name: { like: \"ACME%\" }}] }",
      },
    ],
  })
  listInfo({ error, data }) {
    if (data) {
      this.results = data.results;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.results = undefined;
    }
  }
}