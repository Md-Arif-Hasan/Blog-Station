function blogValidation(title, description) {
    if (!title) return { validity: false, message: 'Enter a valid title!' };
    if (!description) return { validity: false, message: 'Enter a valid description' };
    return { validity: true, message: 'Title & descriptions are valid' };
}

module.exports = {
    blogValidation,
};
