import Button from "./Button.js";
import Candidate from "./Candidate.js";
import Game, { players } from "./Game.js";
import InputsManager from "./InputsManager.js";

export default class MatchingModal {
    constructor(candidateSummaryDate) {
        this.element = document.createElement("div");
        this.textElement = document.createElement("p");
        this.main = document.querySelector("main");
        this.candidateSummaryDate = candidateSummaryDate;
    }

    createElement() {
        this.element.classList.add("matchingModalWrapper");

        this.textElement.classList.add("matchingModalTitle");
        this.textElement.textContent = "C'est le match !";
        this.element.appendChild(this.textElement);

        const pod = document.querySelector(".pod");
        pod.classList.add("matchingModalPod");
        this.element.appendChild(pod);
        console.log(pod)
        this.element.appendChild(this.createDateSummary());
        
        const bttnElement = new Button("Recommencer",() => {
            this.main.removeChild(this.element);
            new Game().initialize();
            new Game(players).play();
        }, null);
        new InputsManager().displayInput([bttnElement],this.element);
        return this.element;
    }

    createDateSummary() {
        const dateRecapWrapperElement = this.#appendElement("div", ["dateRecapWrapper"], null, null);
        const dateRecapElement = this.#appendElement("div", ["dateRecap", "dateRecapSpace"], null, dateRecapWrapperElement);
        
        this.#appendElement("p", [null],  this.candidateSummaryDate.name, dateRecapElement);

        // [Candidate.totalQuestionLabel, Candidate.positiveAnswersLabel, Candidate.negativeAnswersLabel].forEach((label) => {
        //     this.#appendElement("p", [null],`${label} : ${this.candidateSummaryDate[label]}`, dateRecapElement);
        // })

        const favAnswerElement = this.#appendElement("div",["favAnswer","dateRecapSpace"], null, dateRecapWrapperElement); 
        this.#appendElement("p", ["titleUnderline"], "Réponse coup de coeur", favAnswerElement);
        this.#appendElement("p", [null],  this.candidateSummaryDate.favQuestion, favAnswerElement);
        this.#appendElement("p", [null],  this.candidateSummaryDate.favAnswer, favAnswerElement);
        return dateRecapWrapperElement;
    }

    #appendElement(container, classListName, elementContent, parentElement) {

        const element = document.createElement(container);
        element.classList.add(...classListName);
        element.textContent = elementContent;
       
        if (parentElement) {
            return parentElement.appendChild(element);
        }; 
        
        return element;
    }
};

    // dateSummary() {
    //     const summaryObj = {
    //         [Candidate.totalQuestionLabel] : this.questions.length,
    //         [Candidate.positiveAnswersLabel] : this.positiveCount,
    //         [Candidate.negativeAnswersLabel] : this.negativeCount,
    //         favQuestion : this.favQuestion,
    //         favAnswer : this.favAnswer,
    //         name: this.name,
    //     };
        
    //     return summaryObj;
    // }
const obj = {

    favQuestion : "blabla",
    favAnswer : "test",
    name: "Gustave",
}

new MatchingModal(obj).createElement()