import { LightningElement } from 'lwc';
import templateOne from './templateOne.html'
import templateTwo from './templateTwo.html'
import renderLWC from './renderLWC.html'
export default class RenderLWC extends LightningElement {

     showTemplateOne = false;
    showDefault = true;
    render(){
        if(this.showTemplateOne){
            return templateOne
        } else if(this.showDefault){
             return renderLWC;
        }
        return templateTwo;
    }

    showTemplateOneJS(){
        this.showTemplateOne = true;
        this.showDefault= false;
    }

    showTemplateTwo(){
        this.showTemplateOne = false;
        this.showDefault= false;
    }

    showDefaultTemplate(){
        this.showTemplateOne = false;
        this.showDefault= true;
    }

}