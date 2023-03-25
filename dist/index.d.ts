export default PgSql;
declare class PgSql {
    static sqlise: any;
    constructor(config: any);
    sqlise: Sequelize;
    Connect(): Promise<void>;
    RawQuery(sql: any, replacements: any): Promise<any>;
}
import { Sequelize } from 'sequelize';
