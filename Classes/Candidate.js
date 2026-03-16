import Answer from "./Answer.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";

class Candidate {
    interestLevel = 0;
   
    constructor(name, age, questions) {
        this.name = name;
        this.age = age;
        this.questions = questions;
        this.nb = 0;
    }

    display() {
        const pod = document.querySelector(".pod");
        const nameElement = document.createElement("p");
        nameElement.textContent = this.name;
        nameElement.classList.add("dialogue");
        pod.insertAdjacentElement("afterend", nameElement);
    } 

    nextQuestion() {
        this.questions[this.nb].ask((e) => {
            setTimeout(() => {
                console.log(this.nb)
                this.nb++
                this.nextQuestion();    
            }, 2000)
        });
    }
}

const paul = new Candidate ("Paul Mescal",null, [
    new FreeTextQuestion("tu as combien d'enfants ?", (childNb) => {
        const answerValue = childNb.target.value;
        if (parseInt(answerValue) === 0) {
            return true;
        } else {
            return false;
        }}),
    new ChoiceQuestion("tu préfères marcher en ville ou à la montagne ?", [
        new Answer ("ville", true),
        new Answer ("montagne", false),
    ],
    false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer ("oui", true),
        new Answer ("non", false),
    ],
    false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer ("Past Lives", true),
        new Answer ("Pearl", true),
        new Answer ("AfterSun", true),
        new Answer ("Whiplash", false),
    ],true),
])
paul.display();
paul.nextQuestion();
