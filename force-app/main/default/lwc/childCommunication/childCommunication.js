import { LightningElement } from 'lwc';
export default class ChildCommunication extends LightningElement {
  // Simple Event
  handleFireEvent(){
    /* Step 1 is prepare the event  */
    const dataEvent = new CustomEvent('datachange',{
        detail:{
            message: 'This is from Child Communication',
            source: 'child'
        }
    });
    /* Step 2 Fire the event  */
    this.dispatchEvent(dataEvent);
  }
}