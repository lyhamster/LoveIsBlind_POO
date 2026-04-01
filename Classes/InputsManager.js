import Button from "./Button.js";
import Input from "./Input.js";
import Pod from "./Pod.js";

class InputManager {
    constructor () {
        if (!!InputManager.instance) {
            return InputManager.instance;
        }
        this.main = document.querySelector("main");
        this.wrapper = document.querySelector(".multipleChoiceInputWrapper");
        InputManager.instance = this;
        return this;
    }

    displayInput(instanceArray) { 
        this.wrapper.replaceChildren()
        instanceArray.forEach((instance) => {
            this.wrapper.appendChild(instance.createElement())
        })
        this.main.appendChild(this.wrapper)

    }
}

const chat = new Button ("chat");
const chien = new Button ("chien");
const paresseux = new Button ("paresseux");
const ageInput = new Input ();


new InputManager().displayInput([chien,chat, paresseux])
new InputManager().displayInput([ageInput])
new InputManager().displayInput([chien,chat, paresseux])
new InputManager().displayInput([ageInput])







