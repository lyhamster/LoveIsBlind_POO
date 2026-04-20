import Answer from "./Answer.js";
import Button from "./Button.js";
import Candidate from "./Candidate.js";
import ChoiceQuestion from "./ChoiceQuestion.js";
import FreeTextQuestion from "./FreeTextQuestion.js";
import InputsManager from "./InputsManager.js";
import MatchingModal from "./MatchingModal.js";
import MessageManagers from "./MessageManagers.js";
import Pod from "./Pod.js";

export default class Game {
    seconds = 0;
    indexNb = 0;
    currentCandidatesArr;

    constructor(candidates) {
        this.candidates = candidates;
        this.pod = new Pod();
        this.message = new MessageManagers();
        this.main = document.querySelector("main");
        this.selectPod = document.querySelector(".pod");
    }

    initialize() {

        this.main.appendChild(this.pod.createElement()); 
        this.pod.changeState("off");
        const enterGameBttn = new Button("Entrer dans le pod", () => {
            this.play(() => {
                const enterGameBttn = document.querySelector(".removeBttn"); 
                enterGameBttn.classList.add("opacityBttn")
                enterGameBttn.remove();
            });
        },null);
        new InputsManager().displayInput([enterGameBttn],this.main);
    }

    play(onRemove) {
        if (this.candidates.length === 0) {
            const nameElement = document.querySelector(".dialogue");
            nameElement.remove();
            return;
        };
        onRemove(); 
        
        this.currentCandidatesArr = this.candidates;
        
        const dialogueElement = document.querySelectorAll(".dialogue");
        dialogueElement.forEach((dialogue) => {
            dialogue.remove();
        });
      
        this.indexNb = Math.floor(Math.random() * this.candidates.length);

        document.querySelector(".pod").classList.add("podTest");
        

        this.pod.changeState("joining");

        
        this.message.displayMessage("Recherche d'un candidat ...");  
        document.querySelector(".dialogue").classList.add("podTranslate");
        setTimeout(() => {
            this.pod.changeState("presence"); 
            this.message.displayMessage(`${this.candidates[this.indexNb].name} entre dans le pod`);
            this.currentCandidatesArr = [...this.candidates];
            this.candidates.splice(this.indexNb, 1);
            setTimeout(() => {
                this.#discuss();
            }, 2500);
        }, 2000);
    }

    #discuss() {
        document.querySelector(".matchingModalTitle").classList.add("podTranslate");
        this.pod.setTitle(this.currentCandidatesArr[this.indexNb].getNameElement());
       
        this.currentCandidatesArr[this.indexNb].nextQuestion(() => {
            const dateSummaryObject = this.currentCandidatesArr[this.indexNb].dateSummary();
            new MatchingModal(dateSummaryObject).createElement(() => {
                new Game(this.candidates).initialize();
                this.pod.setTitle("");
            });
        });
    }
};

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
        new Answer("ville", Answer.favourite),
        new Answer("montagne", Answer.negative),
    ], false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer("oui", Answer.positive),
        new Answer("non", Answer.negative),
    ], false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer("Past Lives", Answer.positive),
        new Answer("Pearl", Answer.positive),
        new Answer("AfterSun", Answer.positive),
        new Answer("Whiplash", Answer.ick),
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
        new Answer("ville", Answer.favourite),
        new Answer("montagne", Answer.negative),
    ], false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer("oui", Answer.positive),
        new Answer("non", Answer.negative),
    ], false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer("Past Lives", Answer.positive),
        new Answer("Pearl", Answer.positive),
        new Answer("AfterSun", Answer.positive),
        new Answer("Whiplash", Answer.ick),
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
        new Answer("ville", Answer.favourite),
        new Answer("montagne", Answer.negative),
    ], false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer("oui", Answer.positive),
        new Answer("non", Answer.negative),
    ], false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer("Past Lives", Answer.positive),
        new Answer("Pearl", Answer.positive),
        new Answer("AfterSun", Answer.positive),
        new Answer("Whiplash", Answer.ick),
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
        new Answer("ville", Answer.favourite),
        new Answer("montagne", Answer.negative),
    ], false),
    new ChoiceQuestion("est-ce tu aimes les films d'A24?", [
        new Answer("oui", Answer.positive),
        new Answer("non", Answer.negative),
    ], false),
    new ChoiceQuestion("parmis les films d'A24, lequel est-t-on pref ?", [
        new Answer("Past Lives", Answer.positive),
        new Answer("Pearl", Answer.positive),
        new Answer("AfterSun", Answer.positive),
        new Answer("Whiplash", Answer.ick),
    ], true),
]);

export const players = [John,Pierre,Paul,Jacque];
new Game(players).initialize();

