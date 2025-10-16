import jwt, { SignOptions, Secret } from "jsonwebtoken";

const JWT_SECRET: Secret = process.env.JWT_SECRET || "myjwtsecret";
const REFRESH_SECRET: Secret = process.env.REFRESH_SECRET || "myrefreshsecret";

export const signAccessToken = (payload: string | object | Buffer, expiresIn = "15m"): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as SignOptions);
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const signRefreshToken = (payload: string | object | Buffer, expiresIn = "7d"): string => {
  return jwt.sign(payload, REFRESH_SECRET, { expiresIn } as SignOptions);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
