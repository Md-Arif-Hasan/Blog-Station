const userRepo = require("../repository/userRepo");

async function userNameDuplicate(userName){
    const name = await userRepo.checkUsername(userName);
    if(name.length> 0){
         return { exist:true, message:'Duplicate username found!'};
    }
    else{
        return { exist:false, message:'Unique username'};
    }
}

async function emailDuplicate(userEmail){
    const email = await userRepo.checkEmail(userEmail);
    if(email.length> 0){
         return { exist:true, message:'Duplicate email found!'};
    }
    else{
        return { exist:false, message:'Unique email!'};
    }
}

module.exports = { userNameDuplicate, emailDuplicate };