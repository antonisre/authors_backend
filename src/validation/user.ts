import Joi from 'joi';
import { userRoles } from '../config/constants';

export const validationSignup = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        role: Joi.number().min(1).max(Object.keys(userRoles).length)
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
        role: Joi.number().min(1).max(Object.keys(userRoles).length)
    })
}

export const validationGetUsersBooks = {
    query: Joi.object({
        page: Joi.number().min(1).required(),
        results: Joi.number().min(1).required(),
    })
}

export const validationGetAllUserss = {
    query: Joi.object({
        page: Joi.number().min(1).required(),
        results: Joi.number().min(1).required(),
    })
}