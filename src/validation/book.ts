import Joi from 'joi';

export const validationCreateBook = {
    body: Joi.object({
        title: Joi.string().required(),
        published: Joi.number().required(),
    })
}

export const validationUpdateBook = {
    body: Joi.object({
        title: Joi.string(),
        published: Joi.number(),
    })
}

export const validationGetAllBooks = {
    query: Joi.object({
        page: Joi.number().min(1).required(),
        results: Joi.number().min(1).required(),
    })
}