import { Sequelize, Op, QueryTypes } from 'sequelize';

class PgSql {
    static sqlise;
    constructor(config) {
        this.sqlise = new Sequelize(config.database, config.user, config.password, {
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
        return await this.sqlise.authenticate();
    }
    async RawQuery(sql, replacements) {

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

export default PgSql;



