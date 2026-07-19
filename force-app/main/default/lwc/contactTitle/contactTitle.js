import { LightningElement , api} from 'lwc';

export default class ContactTitle extends LightningElement {
    @api contact;

    handleClick(){
        const selectEvent = new CustomEvent('select',{
            detail: this.contact.Email,
            bubbles:true,
            composed: true
        });
        this.dispatchEvent(selectEvent);
    }
}