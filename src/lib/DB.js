import { Sequelize, Op } from 'sequelize';

export class DB {

    #config;

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
    // static sequelize = {};

    constructor(config) {
        this.#config = config;
        this.sequelize = new Sequelize(config.database, config.user, config.password, {
            host: config.host,
            dialect: config.dialect,

            operatorsAliases: Op, // use Sequelize.Op
            pool: {
                max: config.pool.max,
                min: config.pool.min,
                idle: config.pool.idle
            }
        });
    }

    async Connect() {
        await this.sequelize.authenticate();
    }
    async RawQuery(sql, replacements) {
        const { QueryTypes } = require('sequelize');

        if(replacements === undefined) {
            replacements = {};
        }
        let queryType = QueryTypes.SELECT;
        switch(sql.substring(0, 6).toLowerCase()) {
            case "update":
                queryType = QueryTypes.UPDATE;
                break;
            case "delete":
                queryType = QueryTypes.DELETE;
                break;
        }
        return await this.sequelize.query(sql,
            {
                replacements: replacements,
                type: queryType
            }
        );
    }
}