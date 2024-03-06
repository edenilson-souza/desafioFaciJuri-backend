import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export function checkEnvVars() {
    const envVars = ["PORT", "DATABASE_URL"];

    envVars.forEach(envVar => {
        if (!process.env[envVar]) {
            throw new Error(`Defina a variável de ambiente "${envVar}" obrigatória, leia o README.md para mais informações.`);
        }
    });
}
