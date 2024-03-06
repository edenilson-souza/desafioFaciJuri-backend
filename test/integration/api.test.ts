const dotenv = require("dotenv");
dotenv.config({ path: "./env" });

import axios from "axios";

axios.defaults.validateStatus = function () {
    return true;
};

test("Deve criar a conta", async function () {
    const input = {
        name: "Edenilson Souza",
        email: `edenilson.sza${Math.random()}@gmail.com`,
        phone: "79999889371"
    };
    const responseSignup = await axios.post("http://localhost:3001/signup", input, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    const outputSignup = responseSignup.data;
    expect(outputSignup.accountId).toBeDefined();
    const responseGetAccount = await axios.get(`http://localhost:3001/accounts/${outputSignup.accountId}`);
    const outputGetAccount = responseGetAccount.data;
    expect(outputGetAccount.name).toBe(input.name);
    expect(outputGetAccount.email).toBe(input.email);
    expect(outputGetAccount.phone).toBe(input.phone);
});
