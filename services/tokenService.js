const jwt = require('jsonwebtoken')
const tokenModel = require('../models/TokenModel')

class TokenService{

    generationToken(payload){
        const newToken = jwt.sign(payload, process.env.SECRET_KEY_TOKEN, {expiresIn: '30d'} )
        // console.log('payload', newToken)
       return  newToken
    }

    async tokenSave(userId, token){
        const tokenData = await tokenModel.findOne({user:userId})
        if(tokenData){
            tokenData.token = token
            await tokenData.save()
            return token
        }
        const newToken = await tokenModel.create({user:userId, token})
        return newToken
    }

    async removeToken(token){
        const tokenData = await tokenModel.deleteOne({token})
        return tokenData
    }

    validationToken(token){
        try{
            const userData=jwt.verify(token,process.env.SECRET_KEY_TOKEN)
            return userData
        }
        catch (e) {
            return null
        }
    }

    validationQrToken(token){
        try{
            // console.log('token',token)
            const userData=jwt.verify(token,process.env.SECRET_KEY_QR_TOKEN)
            return userData
        }
        catch (e) {
            return null
        }
    }

}

module.exports = new TokenService()