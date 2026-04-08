import Answer from "./Answer.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";
import MatchingModal  from "./MatchingModal.js";
import Pod from "./Pod.js";

export default class Candidate {
    indexNb = 0;
    interestLevel = 0;
    negativeCount = 0;
    positiveCount = 0; 
    favQuestion;
    favAnswer; 
    static totalQuestionLabel = "Nombres de questions répondues";
    static positiveAnswersLabel = "Nombre de réponses vraies";
    static negativeAnswersLabel = "Nombre de réponses fausses";

    constructor(name, age, questions) {
        this.name = name;
        this.age = age;
        this.questions = questions;
    }

    display() {
        const nameElement = document.createElement("p");
        nameElement.textContent = this.name;
        nameElement.classList.add("dialogue");
        return nameElement;
    }

    nextQuestion() {    
        if (this.indexNb >= this.questions.length) {
            const main = document.querySelector("main")
            main.appendChild(new MatchingModal(this.dateSummary()).createElement());
            return;
        }

        this.questions[this.indexNb].ask((answerPoints) => {
            setTimeout(() => {
                if (answerPoints < 0) {
                    this.negativeCount++;
                } else {
                    this.positiveCount++;
                }

                if (answerPoints >= Answer.favourite) {
                    this.favQuestion = this.questions[this.indexNb].label;
                    this.questions[this.indexNb].answers.forEach((answer) => {
                        if (answer.label && answer.level >= Answer.favourite) {
                            console.log("hello")
                            this.favAnswer = answer.label;
                        }
                    });
                }

                this.interestLevel += (answerPoints);
                this.indexNb++;
                this.nextQuestion();
            }, 2000);
        });
    };

    dateSummary() {
        const summaryObj = {
            [Candidate.totalQuestionLabel] : this.questions.length,
            [Candidate.positiveAnswersLabel] : this.positiveCount,
            [Candidate.negativeAnswersLabel] : this.negativeCount,
            favQuestion : this.favQuestion,
            favAnswer : this.favAnswer,
            name: this.name,
        }

        console.log(summaryObj)
        return summaryObj
    }
};