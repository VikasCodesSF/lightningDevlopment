// wireGetRelatedListRecords.js
import { LightningElement, wire, api } from 'lwc';
import { getRelatedListRecords } from 'lightning/uiRelatedListApi';
export default class WireGetRelatedListRecords extends LightningElement {
  
  @api recordId  
  error;
  records;
  @wire(getRelatedListRecords, {
    parentRecordId: '001NS00002XTBM0YAP',
    relatedListId: 'Contacts',
    fields: ['Contact.Id', 'Contact.Name'],
    where: '{ Name: { like: "Gomu%" }}',
  })
  listInfo({ error, data }) {
    if (data) {
        console.log('wireGetRelatedListRecords', JSON.parse(JSON.stringify(data)))
      this.records = data.records;
      this.error = undefined;
    } else if (error) {
      this.error = error;
      this.records = undefined;
    }
  }
}