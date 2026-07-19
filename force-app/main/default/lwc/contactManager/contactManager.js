import { LightningElement } from 'lwc';
export default class ContactManager extends LightningElement {
    handleSelectedClick(event){
        console.log('Grant Parent is handling the event');
        console.log(event.detail)
    }

    handleClick(event){
        event.event.preventDefault();
        let childCom = this.refs.child;
        if(childCom){
            let sum = childCom.handleSum(2,3);
            alert('Sum is'+ sum);
            let welcomMessgae = childCom.welcomeMessage();
            alert('welcomMessgae is'+ welcomMessgae);
        }
    }
}