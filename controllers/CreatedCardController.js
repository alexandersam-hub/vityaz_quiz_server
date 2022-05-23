const createQrCard = require('../services/createQrCard')
const userService = require('../services/authServices')
const tokenService = require('../services/tokenService')
class CreatedCardController{



    async generationCard(req, res){
            const {prefix, index_start, index_stop} = req.body
            const createdCardList = []
            const wrongCreatedCardList = []

            const  getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

            if(prefix && index_start && index_stop){
                for (let i = index_start; i<=index_stop; i++){
                    const n = i>9?i:'0'+i
                    const name = prefix+'_'+ n
                    const password = getRandomInt(100001, 999999).toString()
                    const user = userService.registration(name, password, 'user', true, '')
                    const token = (process.env.URL_CLIENT_QUIZ+'/qr/'+ await tokenService.generationToken({username:name, password})).replace('https://викторина.родныеигры.рф/qr/','https://xn--80adsajtfqq.xn--c1abdmxeng9ge.xn--p1ai/qr/')

                    if (!user.warning && await createQrCard.createQrCard(name, password, token))
                        createdCardList.push(name)
                    else
                        wrongCreatedCardList.push(name)
                }
                return ({warning:false, listCreated:createdCardList, wrongList:wrongCreatedCardList})
            }
            return res.json({warning:true, message:'Не все данные заполнены'})

    }
}

module.exports = new CreatedCardController()