import { LightningElement, wire } from 'lwc';
import { getRecords, getFieldValue } from 'lightning/uiRecordApi';
import CONTACT_PHONE from '@salesforce/schema/Contact.Phone';
import ACCOUNT_PHONE from '@salesforce/schema/Account.Phone';

export default class GetRecordsWireAdaptor extends LightningElement {
  accPhone;
  conPhone;
  error;
  data;

  @wire(getRecords, {
    records: [
      {
        // Contact first
        recordIds: ['003NS00001yyfy5YAA'],
        fields: [CONTACT_PHONE]
      },
      {
        // Account second
        recordIds: ['001NS00002YgF7yYAF'],
        fields: [ACCOUNT_PHONE]
      }
    ]
  })
  wiredRecords({ data, error }) {
    if (data) {
      this.data = data;
      this.error = undefined;
      // eslint-disable-next-line no-console
      console.log('getRecords data', data);
    } else if (error) {
      this.data = undefined;
      this.error = error;
      // eslint-disable-next-line no-console
      console.error('getRecords error', error);
    }
  }

  // Defensive accessors using getFieldValue and null-safety
  // Note: getRecords returns an array of wrapper objects: { statusCode, result }
  // Each result contains the actual record shape compatible with getFieldValue.
  get accountPhone() {
    if (
      !this.data ||
      !Array.isArray(this.data.results) ||
      this.data.results.length < 2 ||
      !this.data.results[1].result
    ) {
      return '';
    }
    const accountRecord = this.data.results[1].result;
    console.log('accountRecord', accountRecord);
    const val = getFieldValue(accountRecord, ACCOUNT_PHONE);
    this.accPhone = val || '';
    return this.accPhone;
  }

  get contactPhone() {
    if (
      !this.data ||
      !Array.isArray(this.data.results) ||
      this.data.results.length < 1 ||
      !this.data.results[0].result
    ) {
      return '';
    }
    const contactRecord = this.data.results[0].result;
    const val = getFieldValue(contactRecord, CONTACT_PHONE);
    this.conPhone = val || '';
    return this.conPhone;
  }
}
