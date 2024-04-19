const Joi = require('joi');

module.exports = {
    create: Joi.object({
        name: Joi.string()
            .required(),
        discription: Joi.string()
            .required(),
        date: Joi.string()
            .required(),
    }),
    update: Joi.object({
        name: Joi.string()
            .required(),
        goalscomplet: Joi.string()
            .required(),
        date: Joi.string()
            .required(),

    }),
    datebetweengoal: Joi.object({
        start: Joi.string()
            .required(),
        end: Joi.string()
            .required(),

    }),
    completegoal: Joi.object({
        start: Joi.string()
            .required(),
        end: Joi.string()
            .required(),

    }),
    uncompletegoal: Joi.object({
        start: Joi.string()
            .required(),
        end: Joi.string()
            .required(),

    })
}