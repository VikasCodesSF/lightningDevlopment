import { LightningElement, wire } from 'lwc'
import getAccounts from '@salesforce/apex/AccountController.getAccounts'
import filterAccounts from '@salesforce/apex/AccountController.filterAccounts'

export default class DemoWireApex extends LightningElement {
    accountList;
    filterAccountList;
    error;
    selectedType='Prospect'
    //Wire Apex with property
    @wire(getAccounts)
    accounts;

    //Wire Apex with method
    @wire(getAccounts)
    wiredAccounts({error, data}) {
        if(data) {
            console.log('Data Coming',data);
            // Data Coming (5) [{…}, {…}, {…}, {…}, {…}]
            this.accountList = data.map(item=>{
                let newType =  item.Type === "Customer - Direct" ? "Direct" : 
                item.Type === "Customer - Channel" ? "Channel" : '-------'
                return {...item, newType }
            })
        } else if(error) {
            this.error =  error;
        }
    }

    @wire(filterAccounts, {type: '$selectedType'})
    wiredFilterAccountsProperty
       

    @wire(filterAccounts, {type: '$selectedType'})
    wiredFilterAccounts({error, data}) {
        if(data) {
            this.filterAccountList = data;
        } else if(error) {
            console.error(error)
        }
    }

    get options(){
        return [
            {label: 'Prospect', value: 'Prospect'},
            {label: 'Customer - Direct', value: 'Customer - Direct'}
        ]
    }

    get optionsProperty(){
        return [
            {label: 'Customer - Channel', value: 'Customer - Channel'},
            {label: 'Customer - Direct', value: 'Customer - Direct'}
        ]
    }

    handleChange(event) {
        this.selectedType = event.detail.value;
    }
}