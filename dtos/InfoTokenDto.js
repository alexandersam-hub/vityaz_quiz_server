const {Schema} = require("mongoose");

class InfoTokenDto{

    id
    user
    tokens
    dateLastUpdate

    constructor(model) {
        this.id = model.id?model.id.toString():''
        this.user = model.user?model.user:'';
        this.tokens = model.tokens?model.tokens:[];
        this.dateLastUpdate = model.dateLastUpdate?model.dateLastUpdate:[];
    }

}

module.exports = InfoTokenDto