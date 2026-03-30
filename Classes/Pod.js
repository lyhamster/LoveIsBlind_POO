export default class Pod {
    constructor () {   
        if (!!Pod.instance) {
            return Pod.instance;
        }

        this.main = document.querySelector("main");
        this.state = [
            "off",
            "joining",
            "presence",
            "talking",
            "thinkingRight",
            "thinkingWrong",
            "matching",   
        ];
        this.currentState = "off";
        Pod.instance = this;   
        return this
    }

    createElement() {
        const element = document.createElement("div");
        element.classList.add("pod");
        this.main.appendChild(element);
        return element;
    }

    changeState(value) {  
        this.podElement = document.querySelectorAll(".pod");
        this.podElement.forEach((podElement)=> {
            podElement.classList.remove(this.currentState)});
        this.currentState = value; 
         this.podElement.forEach((podElement)=> {
            podElement.classList.add(value)});
    }  
}

