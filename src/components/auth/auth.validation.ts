import * as Joi from 'joi';
import * as express from 'express';

export const login = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required().max(128),
    }
};

export async function loginValidator(req: express.Request): Promise<express.Request> {

    const validateResult = await Joi.validate(req.body, {
        email: Joi.string().email().required(),
        password: Joi.string().required().max(128),
    });

    if (!validateResult.error) {
        return req;
    } else {
        throw new Error('bad request');
    }
}
