import Answer from "./Answer.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";
import Pod from "./Pod.js";

class Candidate {
    indexNb = 0;
    
    constructor(name, age, questions) {
        this.name = name;
        this.age = age;
        this.questions = questions;
    }

    display() {
        const pod = document.querySelector(".pod");
        const nameElement = document.createElement("p");
        nameElement.textContent = this.name;
        nameElement.classList.add("dialogue");
        pod.insertAdjacentElement("afterend", nameElement);
    }

    nextQuestion() {
        this.questions[this.indexNb].ask(() => {
            setTimeout(() => {
                this.indexNb++;
                this.nextQuestion();
            }, 2000);
        });
    };
};

const paul = new Candidate ("Paul Mescal", 28, [
    new FreeTextQuestion("tu as combien d'enfants ?", (childNb) => {
        const answerValue = childNb.target.value;
        if (parseInt(answerValue) === 0) {
            return true;
        } else {
            return;
        }
    }, false),
    new ChoiceQuestion("tu préfères marcher en ville ou à la montagne ?", [
        new Answer ("ville", Answer.positive),
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
paul.display();
paul.nextQuestion();