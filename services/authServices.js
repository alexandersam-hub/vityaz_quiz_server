const UserModel = require('../models/UserModel')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/UserDto')
const bcrypt = require('bcrypt')


class AuthServices {
    async loginByToken(token){
        const dataUser = tokenService.validationQrToken(token)
        if(dataUser)
            return await this.login(dataUser.login, dataUser.password)
        return {warning:true, massage:'Некорректный токен'}
    }

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

    async getUsers(){
        try{
            const users = await UserModel.find()
            const userDto = []
            users.forEach((item)=>{
                const user = new UserDto(item)
                delete(user.password)
                userDto.push(new UserDto(item))
            })
            return  {warning:false, data:userDto}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async updateUsersData(userId, userDto){
        try {
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}
            user.username = userDto.username
            user.isActive = userDto.isActive
            user.role = userDto.role
            await user.save()
            return {warning:false, message:'Пароль пользователя изменен'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async getUserById(userId){
        try {
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}

            return {warning:false, user}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }
    }

    async updateUserPassword(userId, newPassword){
        try {
            const cashPassword = bcrypt.hashSync(newPassword,7)
            const user = await UserModel.findById(userId)
            if(!user)
                return {warning:true, message:'Пользователь не найден'}
            user.password = cashPassword
            await user.save()
            return {warning:false, message:'Пароль пользователя изменен'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка записи в базу данных'}
        }

    }

    async deleteUser(userId){
        try {
            await UserModel.findByIdAndDelete(userId)

            return {warning:false, message:'Пользователь удален'}
        }
        catch (e) {
            console.log(e)
            return {warning:true, messageRu:'Ошибка базы данных при удалении'}
        }
    }

}

module.exports = new AuthServices()