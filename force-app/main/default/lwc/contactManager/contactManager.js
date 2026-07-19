import { LightningElement } from 'lwc';
import {add, reduceError} from 'c/idsUtils';
export default class ContactManager extends LightningElement {
    handleSelectedClick(event){
        console.log('Grant Parent is handling the event');
        console.log(event.detail)
    }

    handleClick(event){
        event.preventDefault();
        let childCom = this.refs.child;
        if(childCom){
            let sum = childCom.handleSum(2,3);
            alert('Sum is'+ sum);
            let welcomMessgae = childCom.welcomeMessage();
            alert('welcomMessgae is'+ welcomMessgae);
        }

         // Use the method from Utility Component
        let sumIs = add(78,45);
        alert('sumIs'+ sumIs);
    }

}