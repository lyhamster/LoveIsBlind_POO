import Button from "./Button.js";
import InputsManager from "./InputsManager.js";
import MessageManagers from "./MessageManagers.js";
import Pod from "./Pod.js";
import Question from "./Question.js";

export default class ChoiceQuestion extends Question {
    answers;
    callback;
    hasMultiplesAnswers;
    onAnswer;
    scoreLevel = 0;
    bttnArr = [];

    constructor(label, answers, hasMultiplesAnswers) {
        super(label);
        this.answers = answers; 
        this.hasMultiplesAnswers = hasMultiplesAnswers;
    }

    ask(onAnswer) {
        setTimeout(() => {
            new Pod ().changeState("talking"); 
            super.ask();
            this.onAnswer = onAnswer;
            if (this.hasMultiplesAnswers) {
                this.handleMultipleAnswers();
            } else {
                this.handleAnswers(); 
            };
       }, 1000);
    }

    handleAnswers() {
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
            })
            this.bttnArr.push(bttn);
        });
        new Pod().changeState("presence");
        setTimeout(() => {   
            new InputsManager().displayInput(this.bttnArr);
        }, 4000);
    }

    handleMultipleAnswers() {
        this.answers.forEach((answer) => {
            const bttn = new Button(answer.label, (e) => {
                const target = e.target; 
                if (target.classList.contains("selectedAnswer")) {
                    target.classList.remove("selectedAnswer");
                    this.scoreLevel -= answer.level;
                } else {
                    target.classList.add("selectedAnswer");
                    this.scoreLevel += answer.level;
                };   
            }); 
            this.bttnArr.push(bttn);
        });
        new InputsManager().displayInput(this.bttnArr);

        const validateBttn = new Button("Enter", () => {
            if (this.scoreLevel >= 0) {
                new Pod().changeState("thinkingRight");
            } else {
                new Pod().changeState("thinkingWrong");
            };
            this.#removeButton();
            this.onAnswer(this.scoreLevel);
        },"theme_alt");
        const main = document.querySelector("main");
        new InputsManager().displayInput([validateBttn],main);
    }

    #removeButton() {
        const bttnElements = document.querySelectorAll("button");
            bttnElements.forEach((bttn) => {
                bttn.remove();    
            });
        const dialogue = document.querySelector(".dialogue");
        dialogue.remove();
    }
};

   