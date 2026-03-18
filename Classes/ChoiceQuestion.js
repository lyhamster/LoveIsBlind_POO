import Answer from "./Answer.js";
import Button from "./Button.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class ChoiceQuestion extends Question {
    answers;
    callback;
    hasMultiplesAnswers;
    onAnswer;
    selectedAnswersArr = [];
    filteredSelectedAnswers;
    ickAnswer = [];

    constructor (label, answers, hasMultiplesAnswers) {
        super (label);
        this.answers = answers; 
        this.hasMultiplesAnswers = hasMultiplesAnswers;
    }

    ask(onAnswer) {
       const main = document.querySelector("main"); 
       const multipleChoiceInputWrapper = document.querySelector(".multipleChoiceInputWrapper");
       super.ask();
       this.onAnswer = onAnswer;
      
       if (this.hasMultiplesAnswers) {
        this.handleMultipleAnswers(main, multipleChoiceInputWrapper);
       } else {
        this.handleAnswers(main, multipleChoiceInputWrapper); 
       }
    };

    handleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, () => {
                if (answer.isTrue || answer.isImpactSpike === true) { 
                    this.onAnswer(answer.isTrue);
                    new Pod().changeState("thinkingRight");
                    this.#removeButton();
                } else {
                    this.onAnswer(answer.isTrue, answer.isImpactSpike);
                    new Pod().changeState("thinkingWrong");
                    this.#removeButton();
                }
            }).createElement();
            wrapperElement.appendChild(bttn);  
        }); 
        mainElement.appendChild(wrapperElement);     
    };

    handleMultipleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                const target = e.target;     
                if (target.classList.contains("selectedAnswer") && answer.isTrue === true) {
                    target.classList.remove("selectedAnswer");
                    const indexOfTrue = this.selectedAnswersArr.indexOf(true);
                    this.selectedAnswersArr.splice(indexOfTrue,1); 
                } else if (target.classList.contains("selectedAnswer")) {
                    target.classList.remove("selectedAnswer");
                    const indexofFalse = this.selectedAnswersArr.indexOf(false);
                    this.selectedAnswersArr.splice(indexofFalse,1);
                }
                else {
                    target.classList.add("selectedAnswer");
                    this.selectedAnswersArr.push(answer.isTrue);
                }    
                // this.selectedAnswersArr.forEach((truthy) => {
                //     if (truthy === answer.isImpactSpike) {
                        
                //     }
                // })
            }).createElement();
            wrapperElement.appendChild(bttn);   
        });
        mainElement.appendChild(wrapperElement);
        const validateBttn = new Button("Enter", () => {
            const truthyAnswers = this.selectedAnswersArr.filter((truthyAnswer) => truthyAnswer);
            const negativeAnswers = this.selectedAnswersArr.length - truthyAnswers.length;

            if (truthyAnswers.length >= negativeAnswers) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            }
            this.#removeButton();
            this.onAnswer(truthyAnswers.length >= negativeAnswers, this.isImpactSpike);
        }).createElement(); 

        mainElement.appendChild(validateBttn);
    };

    #removeButton() {
        const bttnElements = document.querySelectorAll("button");
            bttnElements.forEach((bttn) => {
                bttn.remove();    
            });
        const dialogue = document.querySelector(".dialogue");
        dialogue.remove();
    };
};

   