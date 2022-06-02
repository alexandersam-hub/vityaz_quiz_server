class UserQuiz{
    id
    user
    title
    description
    category
    img
    isActive


    constructor(model) {
        this.id = model.id? model.id.toString():''
        this.user = model.user;
        this.title = model.title;
        this.description = model.description?model.description:'Моя викторина';
        this.category = model.category
        this.img = model.img
        this.isActive = model.isActive?model.isActive:true

    }
}

module.exports = UserQuiz