import Answer from "./Answer.js";
import Button from "./Button.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class ChoiceQuestion extends Question {
    answers;
    callback;
    hasMultiplesAnswers;
    onAnswer;

    constructor (label, answers, hasMultiplesAnswers) {
        super (label);
        this.answers = answers; 
        this.hasMultiplesAnswers = hasMultiplesAnswers;
        this.selectedAnswersArr = [];
    }

    ask(onAnswer) {
       const main = document.querySelector("main"); 
       const multipleChoiceInputWrapper = document.querySelector(".multipleChoiceInputWrapper");
       super.ask();
       this.onAnswer = onAnswer;
       this.handleAnswers(main, multipleChoiceInputWrapper);
       if (this.hasMultiplesAnswers) {
        this.handleMultipleAnswers(main)
       };
    }

    handleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                if (this.hasMultiplesAnswers) {
                    const target = e.target;
                    target.classList.toggle("selectedAnswer");
                    this.selectedAnswersArr.push(answer.isTrue);
                } else if (!this.hasMultiplesAnswers && answer.isTrue) {
                    new Pod().changeState("thinkingRight");
                    this.#removeButton();
                } else {
                    new Pod().changeState("thinkingWrong");
                    console.log("thinking wrong??")
                    this.#removeButton();
                };
            this.onAnswer();
            }).createElement();
        wrapperElement.appendChild(bttn);  
        mainElement.appendChild(wrapperElement);
        })    
    }

    handleMultipleAnswers(mainElement) {
        const validateBttn = new Button("Enter", () => {
            const truthyAnswers = this.selectedAnswersArr.filter((truthyAnswer) => truthyAnswer);
            const negativeAnswers = this.selectedAnswersArr.length - truthyAnswers.length;

            if (truthyAnswers.length >= negativeAnswers) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            }
            this.#removeButton();
            this.onAnswer();
        }).createElement();
        mainElement.appendChild(validateBttn);
    }

    #removeButton() {
        const bttnElements = document.querySelectorAll("button");
            bttnElements.forEach((bttn) => {
                bttn.remove();    
            })
        const dialogue = document.querySelector(".dialogue");
        dialogue.remove();
    }
}

// const question2 = new ChoiceQuestion ("tia un taf ?", 
//     [
//         new Answer("oui",true),
//         new Answer("non",false),
//         new Answer("oui",true),
//         new Answer("oui",true),
//     ],
//     true,
// );

// question2.ask();

   