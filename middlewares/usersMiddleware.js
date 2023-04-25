const tokenService = require('../services/tokenService')
const userService = require('../services/authServices')

async function usersMiddleware(req, res, next) {
    const {token} = req.body
    // console.log(token)
    if(!token){
        return res.json({badToken:true})
    }
    const user = tokenService.validationToken(token)
    console.log('!!!!', user)
    if(!user){
        return res.json({badToken:true})
    }
    const userBd = await userService.getUserById(user.id)

    if( !userBd || userBd.warning || !userBd.user.isActive )
        return res.json({badToken:true})

    if(!userBd.user.description){

        req.body.marker = "not_description"
        // console.log(req.body)
    }
    if(user.date){
        const tokenData =await tokenService.checkToken(token)
        if(!tokenData.isActiveToken){
            return res.json({badToken:true})
        }
    }
    else{
        if(!(user.role === 'admin' || user.role === 'user') )
            return res.json({badPage:true})
    }
    next()
}

module.exports = usersMiddleware