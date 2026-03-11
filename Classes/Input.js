export default class Input {
    #callback;
    constructor (callback) {
        this.#callback = callback;
    };

    createElement() {
        const input = document.createElement("input");

        input.addEventListener("keypress", (e) => {
            if (e.key === "Enter") { 
                this.#callback(e);
            };
        });
        return input;
    };
};



