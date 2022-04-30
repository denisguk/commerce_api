import "reflect-metadata";
import express from "express";
import cookieSession from "cookie-session";
import cors from "cors";
import {createConnection} from "typeorm";
import {loadConfig} from "./utils";

const app = express();
const ormConfig = loadConfig('orm');

createConnection(ormConfig);

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'session',
    keys: ['super'],
    maxAge: 24 * 4 * 60 * 60 * 1000 // 4 days
}))

require("./routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
