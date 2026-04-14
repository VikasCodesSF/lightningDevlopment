import { LightningElement, track} from 'lwc';

export default class LifeCycleParent extends LightningElement {
    @track name;
    @track isChildVisible = false;

    constructor(){
        super()
        // You can use this.template but can't use querySelector because component is not yet loaded in DOM
        // this.template.querySelector('.abc')
        console.log('Parent Constructor Called')
    }

    connectedCallback(){
        console.log('Parent Connectedcallback Called')
    }

    renderedCallback(){
        console.log('Parent RenderedCallback Called')
    }

    errorCallback(error, stack) {
        console.log(error.message);
        console.log(stack);    // stack shows which component is having error
    }

    changeHandler(event){
        this.name = event.target.value
    }

    handleClick(){
        this.isChildVisible = !this.isChildVisible
    }

}