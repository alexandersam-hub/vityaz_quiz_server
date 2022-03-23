const constructorService = require('../services/constructorService')

 class ConstructorController {

    async addQuiz(req, res, next) {
        try {
        const {title, description, img, category, isActive} = req.body
        if (title && description && typeof isActive !== "undefined" && category) {
            const result = await constructorService.addQuiz({title, description, img, category, isActive})
            if(result.warning)
                return res.json({...result})
            return res.json({warning:false, message:`Викторина ${title} добавлена`})
        } else {
            return res.json({warning:true, message:`Викторина ${title} не была создана. не все поля заполнены`})
        }
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }

    async addQuestion(req, res, next) {
        try {
            const { title, quiz, type, text, img, video, answer, isActive} = req.body
            if (type && title && text && answer &&  typeof isActive !== "undefined" && quiz) {
                const result = await constructorService.addQuestion({title, quiz, type, text, img, video, answer, isActive})
                if (result) {
                    return res.json({...result})
                }
            }
            return res.json({warning: true, message: `Вопрос ${title} не был сохранен. Не все поля`})
        }
        catch (e) {
            console.log(e)
            next(e)
        }

    }
}

module.exports = new ConstructorController()