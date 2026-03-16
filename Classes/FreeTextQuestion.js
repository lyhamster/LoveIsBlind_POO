import Answer from "./Answer.js";
import Input from "./Input.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class FreeTextQuestion extends Question {
    constructor(label, callback) {
        super(label)
        this.callback = callback;
        this.nb = 0;
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
   
            if (this.callback(e)) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");  
            }
            onAnswer();
        }).createElement();
        super.ask();
        this.main.appendChild(inputAnswer);
    }
}

// const question1 = new FreeTextQuestion("quel age as-tu?", (age) => {
//     const answerValue = age.target.value
//     if (parseInt(answerValue) >= 28) {
//         return true;
//     } else { 
//         return false;
//     }
// })
// question1.ask();


