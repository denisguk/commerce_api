import "reflect-metadata";
import express from "express";
import cors from "cors";
import { createConnection } from "typeorm";

const app = express();
const ormConfig = require(`./config/orm.${process.env.NODE_ENV || 'dev'}.js`);

createConnection(ormConfig.default);

var corsOptions = {
    origin: "*"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

require("./routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
