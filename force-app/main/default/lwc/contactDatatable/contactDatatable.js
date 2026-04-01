import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/contactDatatableController.getContacts';
// LWC: Displays Contact records in a lightning-datatable.
// Important: Do NOT mutate objects returned from Apex/wire directly.
// We clone each record into a plain JS object before adding derived/display-only fields (e.g., AccountName, address parts, URLs).

export default class ContactDatatable extends LightningElement {
    
    contactData = [];
    originalContacts = [];
    error;
    selectedRows = [];

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
            sortable: true, //R
            hideDefaultActions: true,
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
            sortable: true,
            hideDefaultActions: true,
            initialWidth: 150,
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
            sortable: true,
            hideDefaultActions: true,
            type: 'phone',
            wrapText: true
        },
        { 
            label: 'Email', 
            fieldName: 'Email', 
            sortable: true,
            hideDefaultActions: true,
            type: 'email',
            wrapText: true 
        },
        { 
            label: 'Street', 
            sortable: true,
            hideDefaultActions: true,
            initialWidth: 550,
            fieldName: 'Street' 
        },
        { 
            label: 'City',
            sortable: true, 
            hideDefaultActions: true,
            fieldName: 'City' 
        },
        { 
            label: 'State', 
            sortable: true,
            hideDefaultActions: true,
            fieldName: 'State' 
        },
        { 
            label: 'Country', 
            sortable: true,
            hideDefaultActions: true,
            fieldName: 'Country' 
        },
        { 
            label: 'Lead Source', 
            sortable: true,
            hideDefaultActions: true,
            fieldName: 'LeadSource',
            actions:[
                { label: 'All' , checked: true, name: 'all'}, 
                { label: 'Web',  checked: false, name: 'web'}, 
                { label: 'Phone Inquiry',  checked: false, name: 'phone_inquiry' }, 
                { label: 'Partner Referral',  checked: false, name: 'partner_referral' }, 
                { label: 'Purchased List',  checked: false, name: 'purchased_list' }, 
                { label: 'Other',  checked: false, name: 'other' }
            ]
        },
        { 
            label: 'Postal Code', 
            sortable: true,
            hideDefaultActions: true,
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
            this.originalContacts = rows
            this.selectedRows = contactData.slice(0,3).map(contact =>contact.Id);
            console.log('this.selectedRows', JSON.stringify(this.selectedRows));
            
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

     // * Sorting Attribute
    sortBy = 'Name';
    sortDirection = 'asc';
    defaultSortDirection = 'asc';

    doSorting(event) {
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        this.sortData(this.sortBy, this.sortDirection, this.primer);
    }

    primer(fieldname, record) {
        let returnValue;
        switch (fieldname) {
            case 'contactURL':
                returnValue = record['Name'];
                break;
            case 'accountURL':
                returnValue = record['AccountName'];
                break;
            default:
                returnValue = record[fieldname];
                break;
        }
        return returnValue;
    }

    sortData(fieldname, direction, primerFn) {
        const parseData = JSON.parse(JSON.stringify(this.contactData));
        // Determine the value extractor, honoring the primer (for URL fields)
        const keyValue = primerFn
            ? (row) => primerFn.call(this, fieldname, row)
            : (row) => row[fieldname];

        const isReverse = direction === 'asc' ? 1 : -1;

        parseData.sort((a, b) => {
            const x = keyValue(a) ?? '';
            const y = keyValue(b) ?? '';
            return isReverse * ((x > y) - (y > x));
        });

        this.contactData = parseData;
    }


    handleHeaderAction(event){
        console.log('Header Action', JSON.stringify(event.detail));
        const {action, columnDefinition} = event.detail;
        const contactColumns = this.contactColumns;
        const actions = contactColumns.find(contactColumns => contactColumns.fieldName === columnDefinition.fieldName)?.actions;
        if(actions){
            actions.forEach(currentAction =>{
                currentAction.checked = currentAction.name === action.name;
            });
            this.contactColumns = [...contactColumns];
            if(action.name === 'all'){
                this.contactData = this.originalContacts;
            }else{
                this.contactData = this.originalContacts.filter(contacts => contacts.LeadSource === action.label);
            }
        }
    }

    // * This method will be called when a table row is selected
    handleRowSelection(event){
        console.log('this.handleRowSelection',(JSON.stringify(event.detail)));
        this.selectedRows = event.detail.selectedRows.map(row => row.Id);
        console.log('this.selectedRows',this.selectedRows);
    }
}