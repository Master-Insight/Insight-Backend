import configEnv from "../../../pkg/services/env/env.js";
import jwt from "jsonwebtoken";

const JWT_PRIVATE_KEY = configEnv.jwt_code;

const createToken = (user) => jwt.sign(user, JWT_PRIVATE_KEY, { expiresIn: "1d" });

export default createToken;