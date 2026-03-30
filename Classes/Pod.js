export default class Pod {
    constructor () {   
        if (!!Pod.instance) {
            return Pod.instance;
        }

        this.element = document.createElement("div");
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
        this.element.classList.add("pod");
        this.main.appendChild(this.element);
        return this.element;
    }

    changeState(value) {  
        this.podElement = document.querySelector(".pod");
        this.podElement.classList.remove(this.currentState);
        this.currentState = value; 
        this.podElement.classList.add(value);
    }  
}

// const caca = new Pod();

// caca.createElement()
// caca.changeState("matching")