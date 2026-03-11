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
        this.arr = [];
        this.positiveValue = 0;
        this.negativeValue = 0;
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
                this.arr.push(answer.isTrue);
            }  else {
                this.#removedButton();
            }
            if (answer.isTrue) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
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
                this.#removedButton();
                this.arr.forEach((value) => {
                    if (value === true) {
                        this.positiveValue++
                    } else {
                        this.negativeValue++
                    }
                })
                if (this.positiveValue > this.negativeValue) {
                    new Pod().changeState("thinkingRight");
                } else {
                    new Pod().changeState("thinkingWrong");
                }
            });
            main.appendChild(validateBttn);
        }
    }

    #removedButton() {
        const bttn = document.querySelectorAll("button");
            bttn.forEach((bouton) => {
                bouton.remove()    
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

   