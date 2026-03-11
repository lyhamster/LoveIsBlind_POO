import Answer from "./Answer.js";
import Button from "./Button.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

class ChoiceQuestion extends Question {
    answers;
    callback;
    hasMultiplesAnswers;

    constructor (label, answers, callback, hasMultiplesAnswers) {
        super (label)
        this.answers = answers; 
        this.callback = callback;
        this.hasMultiplesAnswers = hasMultiplesAnswers;
        this.selectedAnswersArr = [];
    }

    ask() {
       const main = document.querySelector("main");
       const multipleChoiceInputWrapper = document.querySelector(".multipleChoiceInputWrapper");
       main.appendChild(this.createElement());

       this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                if (this.hasMultiplesAnswers) {
                    const target = e.target;
                    target.classList.add("selectedAnswer");
                    this.selectedAnswersArr.push(answer.isTrue);
                } else {
                    this.#removeButton();
                }
            }).createElement();

            multipleChoiceInputWrapper.appendChild(bttn);  
            main.appendChild(multipleChoiceInputWrapper);
        })    

        if (this.hasMultiplesAnswers) {
            const validateBttn = document.createElement("button");
            validateBttn.classList.add("multipleChoiceInput");
            validateBttn.textContent = "enter";
         
            validateBttn.addEventListener("click", () => {  
                const truthyAnswers = this.selectedAnswersArr.filter((truthyAnswer) => {
                    return truthyAnswer === true;
                })

                const negativeAnswers = this.selectedAnswersArr.length - truthyAnswers.length;

                if (truthyAnswers.length > negativeAnswers) {
                    new Pod().changeState("thinkingRight");
                } else {
                new Pod().changeState("thinkingWrong");
                }

                this.#removeButton();
            });
            main.appendChild(validateBttn);
        }
    }

    #removeButton() {
        const bttnElements = document.querySelectorAll("button");
            bttnElements.forEach((bttn) => {
                bttn.remove()    
            })
        const dialogue = document.querySelector(".dialogue");
        dialogue.remove();
    }
}

const question2 = new ChoiceQuestion ("tia un taf ?", 
    [
        new Answer("oui",true),
        new Answer("non",false),
        new Answer("oui",true),
        new Answer("oui",true),
    ],
    () => {

    },
    true,
);

question2.ask();

   