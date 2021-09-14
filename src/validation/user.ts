import Joi from 'joi';

export const validationSignup = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.string()
    })
}

export const validationSignin = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
}

export const validationUpdateUser = {
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
    })
}

export const validationGetUsersBooks = {
    query: Joi.object({
        page: Joi.number().min(1).required(),
        results: Joi.number().min(1).required(),
    })
}