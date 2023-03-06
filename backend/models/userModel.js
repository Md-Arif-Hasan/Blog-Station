
const dbcon = require("../db.config");
var User = function(users){

    this.id = users.id;
    this.username = users.username;
    this.email =  users.email;
    this.password =  users.password;
    this.cdate = users.cdate;
    this.udate = users.udate;

}



User.getallUsers = (result) =>{
    dbcon.query('SELECT * FROM users', (err, res)=>{
        if(err){
            console.log('Error while fetching users', err);
            result(null,err);
        } else{
            console.log('Users fetched successfully');
            result(null,res);
        }
    })
}

module.exports = User;