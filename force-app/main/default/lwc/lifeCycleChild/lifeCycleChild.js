import { LightningElement } from 'lwc';

export default class LifeCycleChild extends LightningElement {
    interval
    constructor(){
        super()
        // You can use this.template but can't use querySelector because component is not yet loaded in DOM
        // this.template.querySelector('.abc')
        console.log('Child Constructor Called')
    }

    connectedCallback(){
        console.log('Child Connectedcallback Called')
        window.addEventListener('click', handleClick)
        this.interval = window.setInterval()
        // Explictly throwing error
        throw new Error ('Loading of Child Component Failed');

    }

    renderedCallback(){
        console.log('Child RenderedCallback Called')
    }
      disconnectedCallback() {
        alert('Child disconnectedCallback Called')
        //This needs to be explicilty remove to avoid memory leak issue
        window.removeEventListener('click', handleClick)
        window.clearInterval(this.interval)
    }
}