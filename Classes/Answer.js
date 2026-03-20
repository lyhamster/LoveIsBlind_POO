export default class Answer {
    static positive = 5;
    static negative = -5;
    static ick = -20;
    static favourite = 10;

    constructor (label, level = 0) {
        this.label = label;
        this.level = level;
    }   
}
