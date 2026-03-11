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
        bttn.classList.add("multipleChoiceInput");
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


const pod = document.querySelector(".pod");
const elementWrapper = document.createElement("div");
elementWrapper.classList.add("multipleChoiceInputWrapper");
pod.insertAdjacentElement("afterend",elementWrapper);


const dogs = new Button("chiens",
    (e) => {
        console.log(e)
    },
    "theme_alt",
)

// const cats = new Button("chats");
// const pigs = new Button("pigs");


// elementWrapper.insertAdjacentElement("beforeend",dogs.createElement())
// elementWrapper.insertAdjacentElement("beforeend",cats.createElement())
// elementWrapper.insertAdjacentElement("beforeend",pigs.createElement())




