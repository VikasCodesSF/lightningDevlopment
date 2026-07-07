import { LightningElement } from 'lwc';
export default class Parent extends LightningElement {
    
    message='Data is passed from Parent to child and then child comp is added in parent and render on UI'
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
}