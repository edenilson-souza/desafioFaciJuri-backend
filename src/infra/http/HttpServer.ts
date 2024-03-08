import express from "express";

export default interface HttpServer {
    register(method: string, url: string, callback: Function): void;
    listen(port: number): void;
}

export class ExpressAdapter implements HttpServer {
    app: any;

    constructor() {
        this.app = express();
        this.app.use(express.json());

        this.app.use((req: any, res: any, next: any) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    }

    register(method: string, url: string, callback: Function): void {
        this.app[method](url, async function (req: any, res: any) {
            try {
                const output = await callback({ body: req.body, params: req.params, query: req.query });
                res.json(output);
            } catch (e: any) {
                return res.status(422).json({
                    message: e.message
                });
            }
        });
    }

    listen(port: number): void {
        if (!port) throw new Error("Port is required");
        this.app.listen(port);
        console.log(`Server running on port ${port}`);
    }
}
