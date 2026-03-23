import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import OWNER_NAME_FIELD from '@salesforce/schema/Account.Owner.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

const FIELDS = [NAME_FIELD, OWNER_NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];

export default class GetRecordWireAdaptor extends LightningElement {
  @api recordId;

  accountData;
  error;

  @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
  accountsFunction({ data, error }) {
    if (data) {
      // Keep raw record for conditional rendering
      this.accountData = data;
      this.error = undefined;
      // No direct assignment needed; use getters with getFieldValue
    } else if (error) {
      this.error = error;
      this.accountData = undefined;
      // Optional: console for debugging
      // eslint-disable-next-line no-console
      console.error('getRecord error', error);
    }
  }

  get name() {
    return this.accountData ? getFieldValue(this.accountData, NAME_FIELD) : '';
  }
  get ownerName() {
    return this.accountData ? getFieldValue(this.accountData, OWNER_NAME_FIELD) : '';
  }
  get phone() {
    return this.accountData ? getFieldValue(this.accountData, PHONE_FIELD) : '';
  }
  get industry() {
    return this.accountData ? getFieldValue(this.accountData, INDUSTRY_FIELD) : '';
  }
}
