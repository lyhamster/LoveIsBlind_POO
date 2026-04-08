import Button from "./Button.js";
import Input from "./Input.js";
import Pod from "./Pod.js";

export default class InputsManager {
    constructor () {
        if (!!InputsManager.instance) {
            return InputsManager.instance;
        };
        this.main = document.querySelector("main");
        this.wrapper = document.querySelector(".multipleChoiceInputWrapper");
        InputsManager.instance = this;
        return this;
    }

    displayInput(instanceArray,parentElement) { 
        if (instanceArray.length > 1) {
            instanceArray.forEach((instance) => {
                this.wrapper.appendChild(instance.createElement());
            });
            this.main.appendChild(this.wrapper);    
        } else {
           parentElement.appendChild(instanceArray[0].createElement());
        }
    }
}

