/* istanbul ignore file */

import DatabaseConnection from "../database/DatabaseConnection";

export default class ORM {
    constructor(readonly connection: DatabaseConnection) {}

    async save(model: any) {
        const columns = model.columns.map((column: any) => column.column).join(",");
        const params = model.columns.map((column: any, index: number) => `$${index + 1}`).join(",");
        const values = model.columns.map((column: any) => model[column.property]);
        const query = `INSERT INTO ${model.schema}.${model.table} (${columns}) values (${params})`;
        await this.connection.query(query, values);
    }

    async findBy(model: any, field: string, value: string) {
        const query = `SELECT * FROM ${model.prototype.schema}.${model.prototype.table} WHERE ${field} = $1`;
        const [data] = await this.connection.query(query, [value]);
        if (!data) return;
        const obj = new model();
        for (const column of model.prototype.columns) {
            obj[column.property] = data[column.column];
        }
        return obj;
    }

    async findAll(model: any, page: number, limit: number) {
        const query = `SELECT * FROM ${model.prototype.schema}.${model.prototype.table} LIMIT $1 OFFSET $2`;
        const data = await this.connection.query(query, [limit, (page - 1) * limit]);
        return data.map((row: any) => {
            const obj = new model();
            for (const column of model.prototype.columns) {
                obj[column.property] = row[column.column];
            }
            return obj;
        });
    }

    async update(model: any, field: string, identifier: string, data: any): Promise<void> {
        const columns = data.columns.map((column: any, index: any) => `${column.column} = $${index + 1}`).join(",");
        const query = `UPDATE ${model.prototype.schema}.${model.prototype.table} SET ${columns} WHERE ${field} = $${Object.keys(data).length + 1}`;
        const values = [...Object.values(data), identifier];
        await this.connection.query(query, values);
    }

    async delete(model: any, field: string, value: string) {
        const query = `DELETE FROM ${model.prototype.schema}.${model.prototype.table} WHERE ${field} = $1`;
        await this.connection.query(query, [value]);
    }
}

export class Model {
    declare schema: string;
    declare table: string;
    declare columns: { property: string; column: string; pk: boolean }[];
    [key: string]: any;
}

export function model(schema: string, table: string) {
    return function (constructor: Function) {
        constructor.prototype.schema = schema;
        constructor.prototype.table = table;
    };
}

export function column(name: string, pk: boolean = false) {
    return function (target: any, propertyKey: string) {
        target.columns = target.columns || [];
        target.columns.push({ property: propertyKey, column: name, pk });
    };
}
