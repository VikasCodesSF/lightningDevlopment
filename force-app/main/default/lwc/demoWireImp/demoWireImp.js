import { LightningElement } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts'
import filterAccountsString from '@salesforce/apex/AccountController.filterAccountsString'

export default class DemoWireImp extends LightningElement {
    accounts
    accountParamas
    searchKey
    getAccounts
    timer


    handleClick(event){
        getAccounts().then(result=>{
            console.log(result);
            this.accounts = result;
        }).catch(error=>{
            console.log(error);
        })
    }

    handleNameChange(event){
        window.clearTimeout(this.timer);
        this.searchKey = event.target.value;
        this.timer = setTimeout(()=>{
            this.callApex();
        },1000)
    }

    callApex(){
        filterAccountsString({seachKey: this.searchKey})
        .then(result=>{
            console.log(result);
            this.accountParamas = result;
        }).catch(error=>{
            console.log(error);
        })
    }
}