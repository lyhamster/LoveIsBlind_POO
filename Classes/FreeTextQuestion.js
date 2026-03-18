import Answer from "./Answer.js";
import Input from "./Input.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class FreeTextQuestion extends Question {
    constructor(label, callback, isImpactSpike) {
        super(label)
        this.callback = callback;
        this.nb = 0;
        this.isImpactSpike = isImpactSpike;
    }

    ask (onAnswer) {
        const inputAnswer = new Input((e) =>{
            if (e) {
                const dialogue = document.querySelectorAll(".dialogue");
                dialogue.forEach((assignedDialogue) => {
                    assignedDialogue.remove()
                })
                const input = document.querySelector("input");
                input.remove();
            }
   
            if (this.callback(e) || this.isImpactSpike === true) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");  
            }
            onAnswer(this.callback(e), this.isImpactSpike);
        }).createElement();
        super.ask();
        this.main.appendChild(inputAnswer);
    }
}

