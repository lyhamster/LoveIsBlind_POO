export default class Question {
    constructor (label) {
        this.label = label;
        this.element = document.createElement("div");
    }

    createElement () {      
        this.element.classList.add("dialogue");
        this.element.textContent = this.label;
        return this.element;
    }

    ask() {}
}

