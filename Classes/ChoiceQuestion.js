import Answer from "./Answer.js";
import Button from "./Button.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class ChoiceQuestion extends Question {
    answers;
    callback;
    hasMultiplesAnswers;
    onAnswer;
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
                this.onAnswer(answer.level);
            }).createElement();
            wrapperElement.appendChild(bttn);  
        }); 
        mainElement.appendChild(wrapperElement);     
    };

    handleMultipleAnswers(mainElement,wrapperElement) {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                const target = e.target; 
                if (target.classList.contains("selectedAnswer")) {
                    target.classList.remove("selectedAnswer");
                    this.scoreLevel -= answer.level;
                } else {
                    target.classList.add("selectedAnswer");
                    this.scoreLevel += answer.level;
                  
                }
                console.log(this.scoreLevel)
            }).createElement();
            wrapperElement.appendChild(bttn);   
        });
        mainElement.appendChild(wrapperElement);
        const validateBttn = new Button("Enter", () => {
            if (this.scoreLevel >= 0) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            }
            this.#removeButton();
            this.onAnswer(this.scoreLevel);
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

   