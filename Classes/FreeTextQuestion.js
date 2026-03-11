import Answer from "./Answer.js";
import Input from "./Input.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

class FreeTextQuestion extends Question {
    constructor(label,answer) {
        super(label)
        this.answer = answer;
    }

    ask () {
        const pod = document.querySelector(".pod");
        const inputAnswer = new Input(this.answer).createElement();
        pod.insertAdjacentElement("afterend", inputAnswer);
    }
}

// const question1 = new FreeTextQuestion("quel age as-tu?", (age) => {
//     const answerValue = age.target.value
//     if (parseInt(answerValue) === 29) {
//         console.log("youpi")
//     }
// })
// question1.ask();


