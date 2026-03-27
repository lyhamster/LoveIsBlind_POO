import Answer from "./Answer.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";
import Pod from "./Pod.js";

export default class Candidate {
    indexNb = 0;
    interestLevel = 0;
    negativeCount = 0;
    positiveCount = 0; 
    favQuestion;
    favAnswer; 

    constructor(name, age, questions) {
        this.name = name;
        this.age = age;
        this.questions = questions;
    }

    display() {
        const podElement = new Pod().createElement();
        const nameElement = document.createElement("p");
        nameElement.textContent = this.name;
        nameElement.classList.add("dialogue");
        podElement.insertAdjacentElement("afterend", nameElement);
    }

    nextQuestion() {    
        if (this.indexNb >= this.questions.length) {
            this.dateSummary();
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
        positiveCount : this.positiveCount,
        negativeCount : this.negativeCount,
        favQuestion : this.favQuestion,
        favAnswer : this.favAnswer,
    }
    console.log(summaryObj) 
    }
};

const paul = new Candidate ("Paul Mescal", 28, [
    new FreeTextQuestion("tu as combien d'enfants ?", (childNb) => {
        const answerValue = childNb.target.value;
        if (parseInt(answerValue) === 0) {
            return 5;
        } else {
            return -5;
        }
    }, false),
    new ChoiceQuestion("tu préfères marcher en ville ou à la montagne ?", [
        new Answer ("ville", Answer.favourite),
        new Answer ("montagne", Answer.negative),
    ], false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer ("oui", Answer.positive),
        new Answer ("non", Answer.negative),
    ], false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer ("Past Lives", Answer.positive),
        new Answer ("Pearl", Answer.positive),
        new Answer ("AfterSun", Answer.positive),
        new Answer ("Whiplash", Answer.ick),
    ], true),
]);

// paul.display()
// paul.nextQuestion();