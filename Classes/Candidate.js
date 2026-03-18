import Answer from "./Answer.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";

class Candidate {
    interestLevel = 0;
    favouriteAnswer = 0;
    ickAnswer = 0;
    indexNb = 0;
    positiveAnswer = 0;
    negativeAnswer = 0;
    totalAnswer = 0;
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
        this.questions[this.indexNb].ask((answerIsTrue, answerIsImpactSpike) => {
            if (answerIsTrue && answerIsImpactSpike === true) {
                console.log("fav answer")
                this.favouriteAnswer +=10;
                this.positiveAnswer++;
            } 
            if (!answerIsTrue && answerIsImpactSpike === false) {
                console.log("ickkk");
                this.ickAnswer -= 10;
                this.negativeAnswer++;
            }
            
            if (answerIsTrue) {
                this.interestLevel += 5;
            } else {
                this.interestLevel -=5;
                this.negativeAnswer++;
            }
            setTimeout(() => {
                this.indexNb++;
                this.nextQuestion();
            }, 2000);
        });
    };
};

const paul = new Candidate ("Paul Mescal", 28, [
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer ("Past Lives", true),
        new Answer ("Pearl", true),
        new Answer ("AfterSun", true),
        new Answer ("Whiplash", false,false),
    ],true),
])
paul.display();
paul.nextQuestion();

// [
//     new FreeTextQuestion("tu as combien d'enfants ?", (childNb) => {
//         const answerValue = childNb.target.value;
//         if (parseInt(answerValue) === 0) {
//             return true;
//         } else {
//             return false;
//         }
//     }, false),
//     new ChoiceQuestion("tu préfères marcher en ville ou à la montagne ?", [
//         new Answer ("ville", true, null),
//         new Answer ("montagne", false, true),
//     ],
//     false),
//     new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
//         new Answer ("oui", true, true),
//         new Answer ("non", false, null),
//     ],
//     false),