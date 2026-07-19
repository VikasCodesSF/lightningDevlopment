import { LightningElement } from 'lwc';

export default class ContactList extends LightningElement {

        contacts = [
        {
            "Id":1,
            "FirstName":"Vikas",
            "LastName":"Pandey",
            "Title":"Salesforce AI Consultant",
            "Email":"vikaskumar.sfdx@gmail.com",
            "Phone":"+91 9769919152",
            "Picture":""
        },
        {
            "Id":2,
            "FirstName":"Shweta",
            "LastName":"Mishra",
            "Title":"Salesforce Consultant",
            "Email":"shweta.sfdx@gmail.com",
            "Phone":"+91 9519141540",
            "Picture":""
        }

    ];

    handleSelectEvent(event){
        console.log(event.detail)
    }

}