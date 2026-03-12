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
       const multipleChoiceInputWrapper = document.querySelector(".multipleChoiceInputWrapper");
       super.ask();
       
       this.handleAnswers(main,multipleChoiceInputWrapper);
       if (this.hasMultiplesAnswers) {
        this.handleMultipleAnswers(main)
       }
    }

    handleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                if (answer.isTrue) {
                    new Pod().changeState("thinkingRight");
                } else {
                    new Pod().changeState("thinkingWrong")
                }

                if (this.hasMultiplesAnswers) {
                    const target = e.target;
                    target.classList.add("selectedAnswer");
                    this.selectedAnswersArr.push(answer.isTrue);
                } else {
                    this.#removeButton();
                }
            }).createElement();
        wrapperElement.appendChild(bttn);  
        mainElement.appendChild(wrapperElement);
        })    
    }

    handleMultipleAnswers(mainElement) {
        const validateBttn = new Button("Enter", () => {
            const truthyAnswers = this.selectedAnswersArr.filter((truthyAnswer) => {
                return truthyAnswer === true;
            })
            const negativeAnswers = this.selectedAnswersArr.length - truthyAnswers.length;

            if (truthyAnswers.length >= negativeAnswers) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            }
            this.#removeButton();
        }).createElement()
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
//     () => {
//     },
//     false,
// );

// question2.ask();

   