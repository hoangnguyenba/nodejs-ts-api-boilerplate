import * as Joi from 'joi';
import * as express from 'express';

export async function loginValidator(req: express.Request) {
    await Joi.validate(req.body, {
        email: Joi.string().email().required(),
        password: Joi.string().required().max(128),
    });
    return req;
}
