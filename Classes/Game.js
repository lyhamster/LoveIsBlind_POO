import Answer from "./Answer.js";
import Candidate from "./Candidate.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";
import InputsManager from "./InputsManager.js";
import MessageManagers from "./MessageManagers.js";
import Pod from "./Pod.js";

export default class Game {
    seconds = 0;
    randomNb = 0;
    currentCandidatesArr;

    constructor (candidates) {
        this.candidates = candidates;
        this.pod = new Pod();
        this.message = new MessageManagers();
    }

    initialize() {
        const main = document.querySelector("main");
        main.appendChild(this.pod.createElement())
    }

    play() { 
        this.pod.changeState("off");
        if (this.candidates.length === 0) {
            const nameElement = document.querySelector(".dialogue");
            nameElement.remove();
            return;
        }
        
        const dialogueElement = document.querySelectorAll(".dialogue");
        dialogueElement.forEach((dialogue) => {
            dialogue.remove();
        })

        setTimeout(() => {
            this.randomNb = Math.floor(Math.random() * this.candidates.length);
            this.pod.changeState("joining");
            this.message.displayMessage("Recherche d'un candidat ...");  
            
            setTimeout(() => {
                this.pod.changeState("presence"); 
                const wrapper = document.createElement("div");
                wrapper.classList.add("wrapperElement");

                wrapper.appendChild(this.candidates[this.randomNb].display());
                wrapper.appendChild(this.message.displayMessage("entre dans le pod"));
                
                const main = document.querySelector("main");
                main.appendChild(wrapper);
                this.currentCandidatesArr = this.candidates;
                this.candidates.splice(this.randomNb, 1);

                setTimeout(() => {
                    this.#discuss();
                }, 3000);
            }, 5000)
        }, 2000)
    }

    #discuss() {
        this.message.displayMessage("");
        this.currentCandidatesArr[this.randomNb].nextQuestion();
    }
}

const Pierre = new Candidate ("Pierre", 28, [
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
const Paul = new Candidate ("Paul", 28, [
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
const Jacque = new Candidate ("Jacque", 28, [
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
const John = new Candidate ("John", 28,[
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



new Game().initialize()