export default class Pod {
    constructor () {   
        if (!!Pod.instance) {
            return Pod.instance;
        }

        this.element = document.querySelector(".pod");
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

    changeState(value) {  
        this.element.classList.remove(this.currentState);
        this.currentState = value; 
        this.element.classList.add(value);
    }  
}




