const jwt = require('jsonwebtoken')
const tokenModel = require('../models/TokenModel')// old release
const infoTokenModel = require('../models/InfoTokenModel') // new release

class Token{
    id
    token
    date
    info

    constructor(id, token, info) {
        this.date = Date.now()
        this.id = id
        this.token = token
        this.info = info
    }
}

class InfoToken{
    user
    tokens
    dateLastUpdate

    constructor(user, token) {
        this.user = user
        this.tokens = [token]
        this.dateLastUpdate = []
    }
}

class TokenService{

    generationToken(payload){
        const newToken = jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: '30000d'} )
       return  newToken
    }

    async tokenSave(user, token,userInfo ){
        // const tokenData = await tokenModel.findOne({user:userId})
        const tokenInfoData = await infoTokenModel.findOne({user:user.id})
        // console.log('user', user)
        if(user.role === 'admin'){
            return {warning:false, token}
        }
        if(tokenInfoData){
            //если количество токенов у пользователя превышено
            // if(tokenInfoData.tokens.length >= process.env.MAX_COUNT_TOKEN_BY_USER){

            //     let countUpdateMonth = 0
            //     tokenInfoData.dateLastUpdate.forEach(t=>{
            //         const currentDate = new Date(Date.now());
            //         currentDate.setMonth(currentDate.getMonth() - 1);
            //         if(currentDate<t)
            //             countUpdateMonth++
            //     })
            //     if(countUpdateMonth>= process.env.MAX_COUNT_REPLACE_TOKEN)
            //         return {warning:true, message:`Количество авторазий превысело максимально возможное: ${ process.env.MAX_COUNT_TOKEN_BY_USER}`}
            //     else
            //         return {warning:true, user:user.id, tokenInfo:{countUpdateMonth, lastCountUpdates:process.env.MAX_COUNT_TOKEN_BY_USER - countUpdateMonth, tokens:tokenInfoData.tokens,}, message:`Количество авторазий превысело максимально возможное: ${ process.env.MAX_COUNT_TOKEN_BY_USER}`}
            // }

            // const lastId = tokenInfoData.tokens.length>0?tokenInfoData.tokens[tokenInfoData.tokens.length-1].id:0
            // tokenInfoData.tokens.push(new Token(lastId+1, token, userInfo))
            await tokenInfoData.save()
            return {warning:false, token}
        }

        await infoTokenModel.create({user:user.id, tokens:[new Token(0,token,userInfo)], dateLastUpdate:[]})
        return {warning:false, token}
    }

    async removeTokenByToken(token){
        try{
            await infoTokenModel.findOneAndRemove({token})

        }catch (e){

        }
    }

    async removeToken(userId, tokenId){

        // try {
            const tokenData = await infoTokenModel.findOne({user:userId})
            if (tokenData){
                tokenData.tokens = tokenData.tokens.filter(token=>token.id !== tokenId)
                tokenData.dateLastUpdate =  tokenData.dateLastUpdate.filter(date=> {
                    const d = new Date(date)
                    const currentDate = new Date(Date.now())
                    currentDate.setMonth(date.getMonth() - 1);
                    return currentDate < d
                }  )
                tokenData.dateLastUpdate.push(Date.now())

                let countUpdateMonth = 0
                tokenData.dateLastUpdate.forEach(t=>{
                    const currentDate = new Date(Date.now());
                    currentDate.setMonth(currentDate.getMonth() - 1);
                    if(currentDate<t)
                        countUpdateMonth++
                })
                const tokens = tokenData.tokens
                tokenData.save()
                return {warning:false,tokenId, tokenInfo:{countUpdateMonth, lastCountUpdates:process.env.MAX_COUNT_TOKEN_BY_USER - countUpdateMonth, tokens,}}
            }
            else{
                return {warning:true, message:'Пользователь не найден'}
            }

        // }
        // catch (e){
        //     return {warning:true, message:'Ошибка сервера'}
        // }
    }

    validationToken(token){
        try{
            const userData=jwt.verify(token,process.env.SECRET_KEY_TOKEN)
            return userData
        }
        catch (e) {
            this.removeTokenByToken(token)
            return null
        }
    }

    async checkToken(token){
        try{
            const userData=jwt.verify(token,process.env.SECRET_KEY_TOKEN)
            if(userData.role === 'admin')
                return {isActiveToken:true, tokenData:userData}
            if(!userData)
                return {isActiveToken:false, tokenData:null}
            const tokenData = await infoTokenModel.findOne({user:userData.id})
            let isActiveToken = false
                tokenData.tokens.forEach(t=> {
                    if (t.token === token)
                        isActiveToken = true
                })
            return {isActiveToken, tokenData}
        }
        catch (e) {
            return {isActiveToken:false, tokenData:null}
        }
    }

    validationQrToken(token){
        try{

            const userData=jwt.verify(token, process.env.SECRET_KEY_TOKEN)
            //console.log('token2',userData)
            return userData
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

}

module.exports = new TokenService()