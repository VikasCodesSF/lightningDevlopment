import { LightningElement } from 'lwc';
export default class Parent extends LightningElement {
    
    message='Data is passed from Parent to child and then child comp is added in parent and render on UI'
    contacts = [
        {
            "Id":1,
            "FirstName":"Vikas",
            "LastName":"Pandey",
            "Title":"Salesforce AI Consultant",
            "Email":"vikaskumar.sfdx@gmail.com",
            "Phone":"+91 9769919152",
            "Picture":""
        },
        {
            "Id":2,
            "FirstName":"Shweta",
            "LastName":"Mishra",
            "Title":"Salesforce Consultant",
            "Email":"shweta.sfdx@gmail.com",
            "Phone":"+91 9519141540",
            "Picture":""
        }

    ];

    gretting='';
    hasRendered = false;
    showChild = true;

    constructor(){
        // In Constructor we can update private properties
        // Also you can assign data to private varailbe coming from Apex in Contructor in case of 
        // getting data, no craete / update / delete should be added here - because constructor might be called mutiple time as 
        // page load and records will be create multiple time in Salesforce
        // Access Private properties & Assign the value & can be update & display on UI
        // Public properties assignment is not recommendation
    super();
    console.log('Parent Constructor');
    //Access Private properties & Assign the value & can be update & display on UI
    this.message = 'Called from Inside Constructor';
    this.contacts = [
        {
            "Id":1,
            "FirstName":"Shweta",
            "LastName":"Mishra",
            "Title":"Salesforce Consultant",
            "Email":"shweta.sfdx@gmail.com",
            "Phone":"+91 9519141540",
            "Picture":""
        }
    ];
  }

  connectedCallback() {
    //Called when component is inserted in to the DOM. 
    // HERE YOU CAN PERFORM SETUP THAT REQUIRES THE COMPONENR TO BE CONNECTED.
    // Call Apex method in connectedCallback
    console.log('Parent connectedCallback');
    this.handleMessage('I m handleMessage');
    this.loadCSS('I m loadCSS');
    this.gretting = `${Math.random()}` // only render once on load of component
    alert(this.gretting); // Just to show this has differnt value from renderedCallback()
    //throw new Error ('Error in ConnectCallBack'); - errorCallBack doesn't work on Parent component
  }

    handleMessage(message){
        console.log(message);
    }

    loadCSS(message){
        console.log(message);
    }

    renderedCallback(){
        // Can access the child component
        if(!this.hasRendered){
            console.log('Parent renderCallback'); 
            this.gretting = `${Math.random()}`
        }
        this.hasRendered = true;
    }

    errorCallback(error, stack) {
        console.log('Parent errorCallback');
        console.error('Error is', JSON.stringify(error));
        console.error('stack is', stack);
    }

    handleHide(){
        this.showChild = false;
    }

    handleShow(){
         this.showChild = true;
    }
  
  }