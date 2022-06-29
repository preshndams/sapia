import {
  AuthenticationError,
  AuthorizationError,
  encodeJwt,
  ExistsError,
  NotFoundError,
  ValidationError,
} from "iyasunday";

import { uuid } from "../../utils";
import { delRedis, getRedis, setRedis, setRedisEx } from "../../utils/redis";

import { loginType, registerType } from "./interface";
import { comparePassword, User } from "./model";

export const register: registerType = async (body) => {
  const userExist = await User.findOne({ email: body.email }).lean();
  if (userExist) throw new ExistsError("User Already Exists");
  if (body.password != body.confirmPassword)
    throw new ValidationError("Password Mis-matched");
  delete body.confirmPassword;

  const user = (await User.create(body)).toObject() as any;
  delete user.password;
  const tokenRef: any = uuid.get(); //Generate new reference cache storage key for the user
  user.tokenRef = tokenRef; //assign cache token key to user

  user.token = await encodeJwt({
    data: { tokenRef, createdAt: new Date() },
    secreteKey: process.env.APP_KEY,
    duration: process.env.TOKEN_VALIDITY,
  });

  return {
    success: true,
    data: user,
    message: "",
  };
};

export const login: loginType = async ({ email, password }) => {
  let login_attempt = Number(await getRedis(`${email}-login-attempt`)); //get user login attempt cache data
  login_attempt = login_attempt = null ? 1 : (login_attempt += 1);
  if (login_attempt > 3)
    throw new AuthorizationError(
      "Failed. Your email is locked, try again in 5 mins"
    );

  let user = (await User.findOne({ email }).lean()) as any;
  if (!user || !(await comparePassword(password, user.password))) {
    setRedisEx(`${email}-login-attempt`, 300, login_attempt); //set login attempt cache to 5 min (300 seconds)
    throw new AuthenticationError("Failed login, Email or Password incorrect");
  }
  await delRedis(user.tokenRef); //delete any existing cache storage reference key to the user
  const tokenRef: any = uuid.get(); //Generate new reference cache storage key for the user
  user.tokenRef = tokenRef;
  delete user.password;

  await delRedis(`${email}-login-attempt`); //Delete user login attempt cache

  user.token = await encodeJwt({
    data: { tokenRef, createdAt: new Date() },
    secreteKey: process.env.APP_KEY,
    duration: process.env.TOKEN_VALIDITY,
  });

  await setRedis(tokenRef, user); //set new cache data for user

  return {
    success: true,
    data: user,
    message: "",
  };
};
