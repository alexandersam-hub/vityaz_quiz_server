const authService = require('../services/authServices')
class AuthController{

    async login(req,res,next){
        try{
            const {username, password} = req.body
            const result = await authService.login(username, password)
            if (result.warning) {
                return  res.json({warning: true, message: result.messageRu})
            }
            return res.json({warning: false, data: {token: result.token}})
        }
        catch (e) {
            console.log(e)
            next(e)
        }
    }
    async loginByToken(req,res,next){
        const {token} = req.body
        if(!token){
            return res.json({warning:true, message:'нет токена'})
        }
        const result = await authService.loginByToken(token)
        if (result.warning) {
            return  res.json({warning: true, message:'Ошибка авторизации'})
        }

        return res.json({warning: false, data: {token: result.token}})
    }

    async loginByQr(req,res,next){
        const token  = req.params['token']
        //console.log(token)
        if(!token){
            return res.json({warning:true, message:'нет токена'})
        }
        const result = await authService.loginByToken(token)
        if (result.warning) {
            return  res.json({warning: true, message:'Ошибка авторизации'})
        }

        return res.json({warning: false, data: {token: result.token}})
        // if(!token){
        //     return res.json({warning:true, message:'нет токена'})
        // }
        // const result = await authService.loginByToken(token)
        // if (result.warning) {
        //     return  res.json({warning: true, message:'Ошибка авторизации'})
        // }
        //
        // return res.json({warning: false, data: {token: result.token}})
    }

    async registration(req,res,next){
        try{
            const {username, password, role} = req.body
            if(username && password && role){
                const result = await authService.registration(username, password, role)
                if(result.warning){
                    return res.json({warning:true, data:{
                            message:`Пользователь ${username} не создан. ${result.messageRu}`
                        }})
                }
                return res.json({warning:false, data:{
                    message:`Пользователь ${username} создан`
                }})
            }
            else{
                return res.json({warning:true, data:{
                        message:`Пользователь ${username} не создан`
                    }})
            }
        }
        catch (e) {
            next(e)

        }
    }
}

module.exports = new AuthController()