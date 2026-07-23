import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue, getFieldDisplayValue } from 'lightning/uiRecordApi';

import NAME_FIELD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import CREATED_FIELD from '@salesforce/schema/Account.CreatedDate';

const fields = [NAME_FIELD, INDUSTRY_FIELD, REVENUE_FIELD, CREATED_FIELD];

export default class AccountDetail extends LightningElement {
    @api recordId;

    @wire(getRecord, { recordId: '$recordId', fields })
    account;

    // Raw values — used here just to demonstrate access, typically used in logic
    get rawRevenue() {
        return getFieldValue(this.account.data, REVENUE_FIELD);
    }

    // Display values — used for on-screen text
    get name() {
        return getFieldValue(this.account.data, NAME_FIELD); // Name has no special display formatting
    }
    get industry() {
        return getFieldValue(this.account.data, INDUSTRY_FIELD);
    }
    get formattedRevenue() {
        return getFieldDisplayValue(this.account.data, REVENUE_FIELD);
    }
    get formattedCreatedDate() {
        return getFieldDisplayValue(this.account.data, CREATED_FIELD);
    }

    // A derived getter using the RAW value for logic
    get isHighValueAccount() {
        return this.rawRevenue > 1000000;
    }
}