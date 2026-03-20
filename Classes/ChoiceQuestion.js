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
    scoreLevel = 0;
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
                if (answer.level >= 0) {
                    new Pod().changeState("thinkingRight");
                    this.#removeButton();
                } else {
                    new Pod().changeState("thinkingWrong");
                    this.#removeButton();
                }
                this.onAnswer();
            }).createElement();
            wrapperElement.appendChild(bttn);  
        }); 
        mainElement.appendChild(wrapperElement);     
    };

    handleMultipleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                const target = e.target; 
                if (target.classList.contains("selectedAnswer") && answer.level) {
                    target.classList.remove("selectedAnswer");
                    const indexOfLevel = this.selectedAnswersArr.indexOf(answer.level);
                    this.selectedAnswersArr.splice(indexOfLevel, 1);
                } else {
                    target.classList.add("selectedAnswer");
                    this.selectedAnswersArr.push(answer.level);
                }
            }).createElement();
            wrapperElement.appendChild(bttn);   
        });
        mainElement.appendChild(wrapperElement);
        const validateBttn = new Button("Enter", () => {
            this.selectedAnswersArr.map((points) => {
                this.scoreLevel += points;
            })
            if (this.scoreLevel >= 0) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            }
            this.#removeButton();
            this.onAnswer();
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

   