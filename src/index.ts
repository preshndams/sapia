import Express from "express";

import Route from "./app/routes";
import Middleware from "./app/routes/middleware";
import MongoDB from "./app/utils/db";
const app = Express();

Middleware(app);
Route(app);

const PORT = 6000;
async function start() {
  await MongoDB();
  app.listen(PORT, () => console.log(`App is running on Port ${PORT}`));
}
start();
