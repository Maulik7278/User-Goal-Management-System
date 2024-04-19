const Joi = require('joi');
module.exports = {
    otp: Joi.object({
        email: Joi.string()
            .required(),
    }),

    create: Joi.object({
        name: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
        contact: Joi.string()
            .required(),
        path: Joi.string()
            .required(),
        email: Joi.string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        otp: Joi.string()
            .required(),
    }),
    update: Joi.object({
        name: Joi.string()
            .required(),
        contact: Joi.string()
            .required(),
        path: Joi.string()
            .required(),
    }),
    login: Joi.object({
        email: Joi.string()
            .required(),
        password: Joi.string()
            .required()
    }),

    changepass: Joi.object({
        email: Joi.string()
            .required(),
        password: Joi.string()
            .required(),
        newpassword: Joi.string()
            .required()
    }),
    forgetpass: Joi.object({
        email: Joi.string()
            .required(),
        random: Joi.string()
            .required(),
        newpassword: Joi.string()
            .required()
    })


}