import { LightningElement } from 'lwc';
import signinTemplate from './signinTemplate.html'
import signupTemplate from './signupTemplate.html'
import renderMethodTemplate from './renderMethodComponent.html'

export default class RenderMethodComponent extends LightningElement {
    selectedButton = ''
    render(){
       return  this.selectedButton === 'Signin' ? signinTemplate : 
       this.selectedButton === 'Signup' ? signupTemplate : 
       renderMethodTemplate
    }
    
    handleClick(event){
        this.selectedButton = event.target.label
    }
}