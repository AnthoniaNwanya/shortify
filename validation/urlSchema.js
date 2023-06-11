const Joi = require("joi");

const postUrlValidation = Joi.object({
    origUrl: Joi.string()
        .min(3)
        .required(),

})

module.exports = {
    postUrlValidation,
};
