import Answer from "./Answer.js";
import Input from "./Input.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

class FreeTextQuestion extends Question {
    constructor(label,callback) {
        super(label)
        this.callback = callback;
    }

    ask () {
        const inputAnswer = new Input((e) =>{
            if (e) {
                const dialogue = document.querySelector(".dialogue");
                const input = document.querySelector("input");

                dialogue.remove();
                input.remove();
            }
            if(this.callback(e)) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong")
            }
        }).createElement();
        super.ask();
        this.main.appendChild(inputAnswer);
    }
}

const question1 = new FreeTextQuestion("quel age as-tu?", (age) => {
    const answerValue = age.target.value
    if (parseInt(answerValue) >= 28) {
        return true
    } else { 
        return false
    }
})
question1.ask();


