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
        this.element.appendChild(this.createDateSummary());

        this.bttnElement.classList.add("multipleChoiceInput");
        this.bttnElement.textContent = "Recommencer";
        this.element.appendChild(this.bttnElement);

        this.main.appendChild(this.element);
        return this.main;
    }

    createDateSummary() {
        const dateRecapWrapperElement = document.createElement("div");
        dateRecapWrapperElement.classList.add("dateRecapWrapper");

        const dateRecapElement = document.createElement("div");
        dateRecapElement.classList.add("dateRecap")
        
        for (const [key,value] of Object.entries(this.candidateSummaryDate)) {
            if (key === "favQuestion") {
               break;
            }
            const labelElement = document.createElement("p"); 
            labelElement.textContent = `${key} : ${value}`;
            dateRecapElement.appendChild(labelElement);
        }
        dateRecapWrapperElement.appendChild(dateRecapElement);

        const favAnswerElement = document.createElement("div");
        favAnswerElement.classList.add("favAnswer");
        const favAnswer = document.createElement("p"); 
        favAnswer.textContent = "Reponse coup de coeur";
        favAnswerElement.appendChild(favAnswer);

        const favQuestionElement = document.createElement("p");
        favQuestionElement.textContent = this.candidateSummaryDate.favQuestion;

        favAnswerElement.appendChild(favQuestionElement);
        dateRecapWrapperElement.appendChild(favAnswerElement)

        return dateRecapWrapperElement;
    }
}

const objTest = {
    "Nombres de questions repondues": 10,
    "Nombre de reponses vraies" : 2,
    "Nombres de reponses fausses" : 2,
    favQuestion : "tu préfères marcher en ville ou à la montagne ?", 
    favAnswer : "ville",
};

const modal = new MatchingModal(objTest);
modal.createElement();
// modal.createDateSummary();
