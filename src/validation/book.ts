import Joi from 'joi';

export const validationCreateBook = {
    body: Joi.object({
        title: Joi.string().required(),
        published: Joi.number().required(),
        authorId: Joi.number().required(),
    })
}

export const validationUpdateBook = {
    body: Joi.object({
        title: Joi.string(),
        published: Joi.number(),
        authorId: Joi.number()
    })
}