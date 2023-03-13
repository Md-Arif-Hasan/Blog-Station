const usernameRegex = /^[a-zA-Z0-9_-]{3,70}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function isValidUsername(username) {
  if (usernameRegex.test(username)) return true;
  return false;
}

function isValidEmail(email) {
  if (emailRegex.test(email)) return true;
  return false;
}

function isValidPassword(password) {
  if (!passwordRegex.test(password)) return false;
  return true;
}

function userInfoValidation(username, email, password) {
  if (!username || !email || !password)
    return { valid: false, message: "Enter all the fields!" };

  if (!isValidUsername(username))
    return { validity: false, message: "Enter a valid username" };
  if (!isValidEmail(email))
    return { validity: false, message: "Enter a valid email" };
  if (!isValidPassword(password))
    return { validity: false, message: "Enter a valid password" };

  return { validity: true, message: "All informations are valid!" };
}

module.exports = {
  isValidEmail,
  isValidUsername,
  isValidPassword,
  userInfoValidation,
};
