import { LightningElement, api } from 'lwc';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FEILD from '@salesforce/schema/Account.Name';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ANNUALREVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import TYPE_FIELD from '@salesforce/schema/Account.Type';

export default class DemoLightningViewForm extends LightningElement {

    @api recordId
    @api objectApiName
    
    objectApiName = ACCOUNT_OBJECT;
    fieldList = [NAME_FEILD, TYPE_FIELD, INDUSTRY_FIELD, ANNUALREVENUE_FIELD];

}