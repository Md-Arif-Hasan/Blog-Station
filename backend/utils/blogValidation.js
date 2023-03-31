
function blogValidation(title,description) {
 
  if (!title) throw Object.assign(new Error("Enter a valid title!"), { statusCode: 400 });
  if (!description) throw Object.assign(new Error("Enter a valid description!"), { statusCode: 400 });
}
module.exports = {
    blogValidation
};
