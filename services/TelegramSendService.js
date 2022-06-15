const WebSocket = require('ws');
const client = new WebSocket('ws://127.0.0.1:8101');

class TelegramSendService{
    sendMessageToAdmin(data){
        try{
            console.log('telegramSend', data)
            client.send(JSON.stringify({action: 'telegramSendAdmin', data}));
            return true
        }catch (e) {
            return false
        }

    }
}

module.exports = new TelegramSendService()