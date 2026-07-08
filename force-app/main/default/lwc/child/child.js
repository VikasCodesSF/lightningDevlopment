import { LightningElement , api} from 'lwc';
export default class Child extends LightningElement {
  @api contacts; // Store the deatils about the contacts like Name, Email, Phone
  @api componentType;

  constructor(){
    super();
    console.log('Child Constructor');
     console.log(this.componentType); // Undefined - Because it's not update on Parent component it will happen about Parent connectedCallback()
  }

  connectedCallback() {
    console.log('Child connectedCallback');
    throw new Error ('Error in child ConnectCallBack'); 
  }

  renderedCallback() {
    console.log('Child renderCallback');
  }

    disconnectedCallback() {
    console.log('Child disconnectedCallback');
    this.removeThirdPartyLibraries();
    this.removeListers();
  }

  removeThirdPartyLibraries(){
    console.log('removeThirdPartyLibraries');
  }
  
  removeListers(){
    console.log('removeListers');
  }

}