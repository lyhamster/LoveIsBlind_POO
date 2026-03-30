export default class Button {
    #label;
    #callback;
    #color;
    constructor (label,callback,color) {
        this.#label = label;
        this.#callback = callback;
        this.#color = color;
    };

    createElement() {
        const bttn = document.createElement("button");
        bttn.classList.add(...["multipleChoiceInput","removeBttn"]);
        bttn.textContent = this.#label; 

        if (this.#color) {
            bttn.classList.add(this.#color);
        };
        
        bttn.addEventListener("click",(e) => {
            this.#callback(e); 
        });
        return bttn;
    };
};


