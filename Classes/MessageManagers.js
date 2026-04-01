//singleton

import Candidate from "./Candidate.js";
import Pod from "./Pod.js";

class MessageManagers {

    constructor () {
        if (!!MessageManagers.instance) {
            return MessageManagers.instance;
        }
        this.messageElement = document.createElement("div")
        this.main = document.querySelector("main")
        MessageManagers.instance = this;
        return this;
    }

    displayMessage(message) {
        this.messageElement.classList.add("dialogue")
        this.messageElement.textContent = message;
        this.main.appendChild(this.messageElement)

        return this.messageElement;
        
    }
}

