const UserModel = require('../models/UserModel')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/UserDto')
const bcrypt = require('bcrypt')


class AuthServices {

    async login(login, password) {
        const user = await UserModel.findOne({username: login})
        if(!user)
            return {warning: true, message: 'User is not found', messageRu: "Пользователь не найден"}
        if (!user.isActive)
            return {warning: true, message: 'User is not active', messageRu: "Пользователь заблокирован"}
        const isPassEquals = bcrypt.compareSync(password, user.password)
        if (isPassEquals) {
            const userDto = new UserDto(user)
            const newToken = tokenService.generationToken({...userDto})
            await tokenService.tokenSave(userDto.id, newToken)
            return {
                warning: false,
                token: newToken
            }
        }
        return {warning: true, message: 'Error password', messageRu: "Неверный пароль"}
    }

    async registration(login, password, role){
        try {
            const candidate = await UserModel.findOne({username:login})
            if(candidate)
                return {warning:true, messageRu:'Пользователь с таким именем существует'}
            const cashPassword = bcrypt.hashSync(password,7)
            const newUser = await UserModel.create({username:login, password:cashPassword, role})
            return newUser
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

}

module.exports = new AuthServices()