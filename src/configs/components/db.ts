'use strict';

import * as joi from 'joi';

const envVarsSchema = joi.object({
    DB_DATABASE: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_PORT: joi.string().required(),
    DB_TYPE: joi.string().required(),
    DB_USERNAME: joi.string().required(),
}).unknown()
  .required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    db: {
        DATABASE: envVars.DB_DATABASE,
        HOST: envVars.DB_HOST,
        PASSWORD: envVars.DB_PASSWORD,
        PORT: envVars.DB_PORT,
        TYPE: envVars.DB_TYPE,
        USERNAME: envVars.DB_USERNAME,
    }
};

module.exports = config;
