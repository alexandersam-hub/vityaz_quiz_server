const tokenService = require('../services/tokenService')

class TokenController{
    async removeToken (req,res){
        const {userId, tokenId} = req.body
        if (!userId){
            return{warning:true, message:'Не заданы обязательные поля userId или tokenId'}
        }
        const result = await tokenService.removeToken(userId, tokenId)
        console.log(result)
        res.json(result)
    }
}

module.exports = new TokenController()