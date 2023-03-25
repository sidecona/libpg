export class DB {
    /**
     * Create a db object
     * @param {object} config
     * @param {object} config
     * @param {string} config.user          User Name
     * @param {string} config.password      Password
     * @param {string} config.host          Host
     * @param {string} config.port          Port
     * @param {string} config.database      Database Name
     * @param {string} config.dialect       Sequelize Dialect
     * @param {object} config.pool          Connection Pool
     * @param {number} config.pool.max      Max Connections
     * @param {number} config.pool.min      Min Connections
     * @param {number} config.pool.idle     Idle Connections
     */
    constructor(config: object);
    sequelize: Sequelize;
    Connect(): Promise<void>;
    RawQuery(sql: any, replacements: any): Promise<[unknown[], unknown]>;
    #private;
}
import { Sequelize } from 'sequelize';
