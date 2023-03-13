const usernameRegex = /^[a-zA-Z0-9_-]{3,70}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function isValidUsername(username) {
  if (usernameRegex.test(username)) return true;
  return false;
}

function isValidPassword(password) {
  if (!passwordRegex.test(password)) return false;
  return true;
}

function userInfoValidation(username,password) {
  if (!username || !password)
    return { valid: false, message: "Enter all the fields!" };
  if (!isValidUsername(username))
    return { validity: false, message: "Enter a valid username" };
  if (!isValidPassword(password))
    return { validity: false, message: "Enter a valid password" };
  return { validity: true, message: "All informations are valid!" };
}

module.exports = {
  isValidUsername,
  isValidPassword,
  userInfoValidation,
};
