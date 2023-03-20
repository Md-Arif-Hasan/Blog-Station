
function blogValidation(title,descriptiom) {
  if (!title )
    return { validity: false, message: "Enter a valid title!" };
  if (!descriptiom)
    return { validity: false, message: "Enter a valid description" }
}

module.exports = {
    blogValidation
};
