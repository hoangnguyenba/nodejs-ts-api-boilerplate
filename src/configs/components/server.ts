'use strict';

import * as joi from 'joi';

const envVarsSchema = joi.object({
    NODE_ENV: joi.string()
        .allow(['development', 'production', 'test', 'provision'])
        .required(),

    PORT: joi.number()
        .required(),

    JWT_SECRET: joi.string()
        .required(),

    JWT_EXPIRESIN: joi.number()
        .required(),

    BASE_URL: joi.string().uri()
        .required()
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    base_url: envVars.BASE_URL,
    env: envVars.NODE_ENV,
    isDevelopment: envVars.NODE_ENV === 'development',
    isTest: envVars.NODE_ENV === 'test',
    jwt: {
        expiresIn: envVars.JWT_EXPIRESIN,
        secret: envVars.JWT_SECRET,
    },
    server: {
        port: envVars.PORT
    }
};

module.exports = config;
