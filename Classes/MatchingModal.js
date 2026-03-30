import Answer from "./Answer.js";
import Candidate from "./Candidate.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import Pod from "./Pod.js";

class MatchingModal {
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

        const littlePod = new Pod().createElement();
        littlePod.classList.add("matchingModalPod");
        this.element.appendChild(littlePod);
        const nameElement = document.createElement("p");
        nameElement.textContent = "paul"; 
        this.element.appendChild(nameElement)
        
        this.element.appendChild(this.createDateSummary());
        
        this.bttnElement.classList.add("multipleChoiceInput");
        this.bttnElement.textContent = "Recommencer";
        this.element.appendChild(this.bttnElement);

        this.main.appendChild(this.element);
        return this.main;
    }

    createDateSummary() {
        const dateRecapWrapperElement = this.#appendElement("div", "dateRecapWrapper", null, null, null);
        const dateRecapElement = this.#appendElement("div", "dateRecap", "dateRecapSpace", null, dateRecapWrapperElement);
        
        [Candidate.totalQuestionLabel, Candidate.positiveAnswersLabel, Candidate.negativeAnswersLabel].forEach((label) => {
            this.#appendElement("p", null, null,`${label} : ${this.candidateSummaryDate[label]}`, dateRecapElement);
        })

        const favAnswerElement = this.#appendElement("div","favAnswer","dateRecapSpace", null, dateRecapWrapperElement); 
            this.#appendElement("p", "titleUnderline", null, "Réponse coup de coeur", favAnswerElement);
            this.#appendElement("p", null, null,  this.candidateSummaryDate.favQuestion, favAnswerElement);

        return dateRecapWrapperElement;
    }

    #appendElement(container, classListName, secondClassListName, elementContent, parentElement) {

        const element = document.createElement(container);
        element.textContent = elementContent;
        element.classList.add(classListName);
        element.classList.add(secondClassListName);

        if (parentElement) {
            return parentElement.appendChild(element)
        } 
        
        return element;
    }

}

const objTest = {
    [Candidate.totalQuestionLabel] : 10,
    [Candidate.positiveAnswersLabel] : 2,
    [Candidate.negativeAnswersLabel] : 2,
    favQuestion : "tu préfères marcher en ville ou à la montagne ?", 
    favAnswer : "ville",
};

const modal = new MatchingModal(objTest);
modal.createElement();
