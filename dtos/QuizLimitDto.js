class QuizLimitDto{
    id
    user
    quizzesOpen

    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.user = model.user;
        this.quizzesOpen = model.quizzesOpen;
    }
}

module.exports = QuizLimitDto