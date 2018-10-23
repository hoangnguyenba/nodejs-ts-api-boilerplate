'use strict';

const server = require('./components/server');
const db = require('./components/db');

export default Object.assign({}, server, db);
