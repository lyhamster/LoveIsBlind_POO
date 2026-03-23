export default class Question {
    constructor (label) {
        this.label = label;
        this.element = document.createElement("div");
        this.main = document.querySelector("main");
    }

    createElement () {      
        this.element.classList.add("dialogue");
        this.element.textContent = this.label;
        return this.element;
    }

    ask(onAnswer) {
        this.main.appendChild(this.createElement());
    }
}

