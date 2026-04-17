import MessageManagers from "./MessageManagers.js";

export default class Question {
    label;

    constructor (label) {
        this.label = label;
    }

    ask(onAnswer) {
        new MessageManagers().displayMessage(this.label);
    }
};

