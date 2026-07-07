import { LightningElement , api} from 'lwc';
export default class Child extends LightningElement {
  @api contacts; // Store the deatils about the contacts like Name, Email, Phone
  @api componentType;
}