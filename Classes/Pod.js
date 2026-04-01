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
        return this;
    }

    createElement() {
        const element = document.createElement("div");
        element.classList.add("pod", this.currentState);
        this.main.appendChild(element);
        return element;
    }

    changeState(value) {  
        const podElement = document.querySelectorAll(".pod");
        podElement.forEach((pod) => {
            pod.classList.remove(this.currentState);
            pod.classList.add(value);
        });    
        this.currentState = value;
    }  
}

