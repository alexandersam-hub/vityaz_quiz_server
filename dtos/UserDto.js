class UserDto{

    id
    username
    password
    role
    isActive

    constructor(model) {
        this.id = model.id?model.id.toString():''
        this.username = model.username;
        this.password = model.password;
        this.role = model.role;
        this.isActive = model.isActive;
    }

}

module.exports = UserDto