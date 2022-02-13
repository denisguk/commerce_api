import {SnakeNamingStrategy} from "typeorm-naming-strategies";

export default {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "rootroot",
  database: "ecommerce_api",
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
