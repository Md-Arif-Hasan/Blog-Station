
function blogValidation(title,description) {
  if (!title || !description ) throw Object.assign(new Error("Enter a valid title & description!"), { statusCode: 400 });
}


function blogUpdateValidation(blogId,title,description) {
  if (!blogId) throw Object.assign(new Error("Enter a valid blogId!"), { statusCode: 400 });
  if (!title || !description ) throw Object.assign(new Error("Enter a valid title & description!"), { statusCode: 400 });
}

module.exports = {
    blogValidation,
    blogUpdateValidation
};
