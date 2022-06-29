"use strict";

import { Router } from "express";

import { joiValidator } from "iyasunday";

import * as controller from "./controller";
import validation from "./validation";
const route = Router();

route.post(
  "/user/register",
  joiValidator(validation.register),
  controller.register
);

route.post("/user/login", joiValidator(validation.login), controller.login);
export default route;
