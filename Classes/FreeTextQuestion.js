import Input from "./Input.js";
import InputsManager from "./InputsManager.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class FreeTextQuestion extends Question {
    constructor(label, callback) {
        super(label);
        this.callback = callback;
        this.main = document.querySelector("main");
    }

    ask(onAnswer) {
        const inputAnswer = new Input((e) =>{
            if (e) {
                const dialogue = document.querySelectorAll(".dialogue");
                dialogue.forEach((assignedDialogue) => {
                    assignedDialogue.remove();
                });
                const input = document.querySelector("input");
                input.remove();
            };
   
            if (this.callback(e) > 0) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");  
            };
            onAnswer(this.callback(e));
        });
        super.ask();
        new InputsManager().displayInput([inputAnswer],this.main);
    }
};

