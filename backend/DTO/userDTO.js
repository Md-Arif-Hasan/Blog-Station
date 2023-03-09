class UserDTO {
  constructor(user) {
    this.users = [];

    for (var i = 0; i < user.length; i++) {
      var obj = {
        id: user[i]["id"],
        username: user[i]["username"],
        email: user[i]["email"],
        cdate: user[i]["cdate"],
        udate: user[i]["udate"],
      };
      this.users.push(obj);
    }
  }
}

//export default UserDTO;
module.exports = UserDTO;
