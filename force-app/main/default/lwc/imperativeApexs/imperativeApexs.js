// imperativeApex.js
import { LightningElement } from 'lwc';
import getAllAccountsByIndustry from '@salesforce/apex/AccountController.getAllAccountsByIndustry';

export default class ImperativeApexs extends LightningElement {
    accounts;
    errors;
    isLoading = false;
    industryValue = 'Education';

    handleClick(event) {
        event.preventDefault();
        this.isLoading = true;

        getAllAccountsByIndustry({
            industry: this.industryValue
        })
            .then(result => {
                this.accounts = result;
                this.errors = undefined;
            })
            .catch(err => {
                this.errors = err;
                this.accounts = undefined;
            })
            .finally(() => {
                this.isLoading = false;
            });
    }
}