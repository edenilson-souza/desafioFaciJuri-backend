import pgp from "pg-promise";

export default interface DatabaseConnection {
    query(statement: string, params: any): Promise<any>;
    close(): Promise<any>;
}

export class PgPromiseAdapter implements DatabaseConnection {
    connection: any;

    constructor() {
        const url = process.env.DATABASE_URL;
        if (!url) throw new Error("DATABASE_URL is required");
        this.connection = pgp()(url);
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }

    async close(): Promise<any> {
        // detalhe traduzido no adapter
        return this.connection.$pool.end();
    }
}
