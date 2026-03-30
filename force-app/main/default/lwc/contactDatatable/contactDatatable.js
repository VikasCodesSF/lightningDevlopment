import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactDatatableController.getContacts';
// LWC: Displays Contact records in a lightning-datatable.
// Important: Do NOT mutate objects returned from Apex/wire directly.
// We clone each record into a plain JS object before adding derived/display-only fields (e.g., AccountName, address parts, URLs).

export default class ContactDatatable extends LightningElement {
    
    contactData = [];
    error;

    // Row-level actions for the datatable (view/edit/delete)
    rowActions = [
        {
            label: 'View', 
            name: 'view'
        },
        {
            label: 'Edit', 
            name: 'edit'
        },
        {
            label: 'Delete', 
            name: 'delete'
        }
    ]

    // Datatable column configuration.
    // We keep flat keys (e.g., 'Street', 'City') for ease of binding in the table.
    // Address parts are derived below from Contact Mailing* fields.
    contactColumns = [
        { 
            label: 'Name', 
            fieldName: 'contactURL', 
            type: 'url', 
            typeAttributes:{
                label:{
                    fieldName: 'Name'
                },
                target: '_blank',
                tooltip: 'View Contact!'
            }
        },
        { 
            label: 'Account Name', 
            fieldName: 'accountURL', 
            type: 'url',
            typeAttributes:{
                label:{
                    fieldName: 'AccountName'
                },
                target: '_blank',
                tooltip: 'View Account!'
            } 
        },
        { 
            label: 'Phone', 
            fieldName: 'Phone', 
            type: 'phone' 
        },
        { 
            label: 'Email', 
            fieldName: 'Email', 
            type: 'email' 
        },
        { 
            label: 'Street', 
            fieldName: 'Street' 
        },
        { 
            label: 'City', 
            fieldName: 'City' 
        },
        { 
            label: 'State', 
            fieldName: 'State' 
        },
        { 
            label: 'Country', 
            fieldName: 'Country' 
        },
        { 
            label: 'Postal Code', 
            fieldName: 'PostalCode' 
        },
        {
            type: 'action',
            typeAttributes : { 
                rowActions: this.rowActions,
                menuAlignment: 'auto'
            }    
        }
    ];


    connectedCallback() {
        // Imperative Apex call to retrieve Contacts.
        // Note: Records returned from Apex can be non-extensible/proxied by the framework.
        // Never add properties directly to those objects; instead, shallow-clone per item.
        getContacts()
        .then(contactData => {
            // Build a new array of plain objects; do not mutate wire/Apex-returned records.
            const rows = contactData.map(c => {
                // Shallow clone (plain, extensible object)
                const row = { ...c };

                // Flatten nested/compound fields to simple keys expected by the datatable
                row.AccountName = c.Account?.Name;

                // Convenience URLs for quick navigation from the datatable
                row.accountURL = '/' + c.Account?.Id;
                row.contactURL = '/' + c.Id;

                // Prefer atomic fields; fallback to MailingAddress parts if present.
                // This keeps UI resilient regardless of how Salesforce serializes Contact address data.
                row.Street = c.MailingStreet ?? c.MailingAddress?.Street ?? null;
                row.City = c.MailingCity ?? c.MailingAddress?.City ?? null;
                row.State = c.MailingState ?? c.MailingAddress?.State ?? null;
                row.Country = c.MailingCountry ?? c.MailingAddress?.Country ?? null;
                row.PostalCode = c.MailingPostalCode ?? c.MailingAddress?.PostalCode ?? null;

                return row;
            });

            // Assign the derived array to the property consumed by the datatable
            // eslint-disable-next-line no-console
            console.log('Contact Data', JSON.stringify(rows));
            this.contactData = rows;
        })
        .catch(error => {
            // Surface and store errors for troubleshooting
            // eslint-disable-next-line no-console
            console.log('Error Contact:', error);
            this.error = error;
        })
    }

    handleRowAction(event){
        console.log('Row Action', JSON.stringify(event.detail))
        const actionName = event.detail?.action?.name;
        const row = event.detail?.row
        console.log('Row', JSON.stringify(row))

        switch (actionName){
            case 'view':    
            window.open(row.contactURL, '_blank'); 
            break;

             case 'edit': 
             console.log('Delete Called')               
             break;          

            case 'delete':
            break;
        }
    }
}