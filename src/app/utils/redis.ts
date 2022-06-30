import redis from "ioredis";

const Redis = new redis(`${process.env.REDIS_URL}`);

Redis.on("connect", () => console.log("Redis is connected")).off(
  "error",
  (err) => console.log(err)
);

export async function setRedis(key: any, data: any) {
  if (typeof data === "object") data = JSON.stringify(data);
  if (typeof key === "object") key = key.toString();
  return await Redis.set(key, data);
}

export async function setRedisEx(key: any, duration: any, data: any) {
  if (typeof data === "object") data = JSON.stringify(data);
  if (typeof key === "object") key = key.toString();
  return await Redis.setex(key, duration, data);
}

export async function getRedis(key:any, parse = false) {
  try {
    if (!key) throw new Error("Cache key not found");
    const data = await Redis.get(key);
    return parse ? JSON.parse(data) : data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function delRedis(key: any) {
  try {
    if (!key) return false;
    return await Redis.del(key);
  } catch (error) {
    throw new Error(error);
  }
}

export default Redis;
