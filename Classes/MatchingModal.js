import Answer from "./Answer.js";
import Candidate from "./Candidate.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import Pod from "./Pod.js";

export default class MatchingModal {
    constructor(candidateSummaryDate) {
        this.element = document.createElement("div");
        this.textElement = document.createElement("p");
        this.main = document.querySelector("main");
        this.bttnElement = document.createElement("button");
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
        
        this.element.appendChild(this.createDateSummary());
        
        this.bttnElement.classList.add("multipleChoiceInput");
        this.bttnElement.textContent = "Recommencer";
        this.element.appendChild(this.bttnElement);

        this.main.appendChild(this.element);
        return this.main;
    }

    createDateSummary() {
        const dateRecapWrapperElement = this.#appendElement("div", ["dateRecapWrapper"], null, null);
        const dateRecapElement = this.#appendElement("div", ["dateRecap", "dateRecapSpace"], null, dateRecapWrapperElement);
        
        this.#appendElement("p", ["dialogue"],  this.candidateSummaryDate.name, dateRecapWrapperElement);

        [Candidate.totalQuestionLabel, Candidate.positiveAnswersLabel, Candidate.negativeAnswersLabel].forEach((label) => {
            this.#appendElement("p", [null],`${label} : ${this.candidateSummaryDate[label]}`, dateRecapElement);
        })

        const favAnswerElement = this.#appendElement("div",["favAnswer","dateRecapSpace"], null, dateRecapWrapperElement); 
            this.#appendElement("p", ["titleUnderline"], "Réponse coup de coeur", favAnswerElement);
            this.#appendElement("p", [null],  this.candidateSummaryDate.favQuestion, favAnswerElement);

        return dateRecapWrapperElement;
    }

    #appendElement(container, classListName, elementContent, parentElement) {

        const element = document.createElement(container);
        element.classList.add(...classListName);
        element.textContent = elementContent;
       
        if (parentElement) {
            return parentElement.appendChild(element)
        } 
        
        return element;
    }

}


