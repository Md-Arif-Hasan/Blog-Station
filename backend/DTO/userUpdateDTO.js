class UserUpdateDTO {
  constructor(user) {
    this.users = [];

    var obj = {
      id: user.id,
      email: user.email,
      cdate: user.cdate,
      udate: user.udate,
    };
    this.users.push(obj);
  }
}

module.exports = UserUpdateDTO;
