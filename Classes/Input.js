export default class Input {
    #onEnter;
    constructor (onEnter) {
        this.#onEnter = onEnter;
    };

    createElement() {
        const input = document.createElement("input");

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") { 
                this.#onEnter(e);
            };
        });
        return input;
    };
};



