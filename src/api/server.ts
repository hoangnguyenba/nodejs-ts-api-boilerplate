require('dotenv').config();

import * as express from 'express';
import { Server } from 'typescript-rest';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import routesV1 from './routes/v1';
import { converterError } from './middlewares/error.middleware';
import {getConnectionManager} from 'typeorm';
import config from '../configs/config';
import { UserModel } from '../components/users/user.model';

export class ApiServer {

    private readonly app: express.Application;
    private server: http.Server = null;
    public PORT: number = +process.env.PORT || 3000;

    constructor() {
        // DB init
        const connectionManager = getConnectionManager();
        const connection = connectionManager.create({
            database: config.db.DATABASE,
            entities: [UserModel],
            host: config.db.HOST,
            password: config.db.PASSWORD,
            port: 3306,
            type: config.db.TYPE,
            username: config.db.USERNAME,
        });
        connection.connect().then(() => {
            // tslint:disable-next-line:no-console
            console.log('Connected DB');
        }); // performs connection

        this.app = express();
        // General config
        this.config();

        // Router
        Server.useIoC();
        Server.buildServices(this.app, ...routesV1);
        Server.swagger(this.app, './dist/swagger.json', '/api-docs', 'localhost:3000', ['http']);

        // Error handler
        this.app.use(converterError);
    }

    /**
     * Configure the express app.
     */
    private config(): void {
        // Native Express configuration
        this.app.use( bodyParser.urlencoded( { extended: false } ) );
        this.app.use( bodyParser.json( { limit: '1mb' } ) );
        // this.app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
        this.app.use(cors());
    }

    /**
     * Start the server
     * @returns {Promise<any>}
     */
    public start(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.server = this.app.listen(this.PORT, (err: any) => {
                if (err) {
                    return reject(err);
                }

                // TODO: replace with Morgan call
                // tslint:disable-next-line:no-console
                console.log(`Listening to http://${this.server.address().address}:${this.server.address().port}`);

                return resolve();
            });
        });

    }

    /**
     * Stop the server (if running).
     * @returns {Promise<boolean>}
     */
    public stop(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.server) {
                this.server.close(() => {
                    return resolve(true);
                });
            } else {
                return resolve(true);
            }
        });
    }

}
