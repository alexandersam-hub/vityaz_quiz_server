const tokenService = require('../services/tokenService')

async function adminMiddleware(req, res, next) {

    const {token} = req.body
   // console.log(token)
    if(!token){
        return res.json({badToken:true})
    }
    const user = await tokenService.checkToken(token)
    console.log(user)
    if( !user || !user.tokenData || !user.tokenData.isActive )
        return res.json({badToken:true})
    if(user.tokenData.role !== 'admin')
        return res.json({badPage:true})
    next()
   // console.log(user)
}

module.exports = adminMiddleware