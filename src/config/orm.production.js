import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export default {
  type: "mysql",
  host: "ecommerce.cle6tbzhrmb0.eu-central-1.rds.amazonaws.com",
  port: 3306,
  username: "root",
  password: "rootroot",
  database: "ecommerce",
  synchronize: true,
  logging: false,
  entities: [
    "./build/entity/*.js"
  ],
  migrations: [
    "./build/migration/**/*.js"
  ],
  subscribers: [
    "./build/subscriber/**/*.js"
  ],
  namingStrategy: new SnakeNamingStrategy(),
}
