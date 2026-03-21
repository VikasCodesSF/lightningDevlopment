import { LightningElement, wire, api } from "lwc";
import { getRelatedListCount } from "lightning/uiRelatedListApi";
export default class WireGetRelatedListCount extends LightningElement {
    //getRelatedListCount - Place it in record page of Account for example to get related Opportunities present on the Account
  error;
  responseData;
  @api recordId
  @wire(getRelatedListCount, {
    parentRecordId: '$recordId',
    relatedListId: "Opportunities",
  })
  listInfo({ error, data }) {
    if (data) {
      this.responseData = data;
      console.log('this.responseData', JSON.parse(JSON.stringify(this.responseData)))
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.responseData = undefined;
    }
  }
}
