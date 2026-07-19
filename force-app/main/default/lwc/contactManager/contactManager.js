import { LightningElement } from 'lwc';
export default class ContactManager extends LightningElement {
    handleClick(event){
        console.log('Grant Parent is handling the event');
        console.log(event.detail)
    }
}