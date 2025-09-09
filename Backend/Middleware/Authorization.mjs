import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const key = process.env.JWT_KEY;

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    const err = { status: 403, msg: "token is requires" };
    next(err);
  }
  const token = authHeader.trim();

  if (!token) {
    const err = { status: 403, msg: "token is requires" };
    next(err);
  }

  jwt.verify(token, key, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Invlaid or expired token" });
    }
    req.user = user;
    next();
  });
}

export function owner_role(req, res, next) {
  const { Role } = req.user;
  if (Role == "Owner") {
    return next();
  }

  return res
    .status(403)
    .json({ msg: "You don't have access to this endpoint" });
}

export function guest_role(req, res, next) {
  const { Role } = req.user;
  if (Role == "Owner" || Role == "Watchman") {
    return next();
  }

  return res
    .status(403)
    .json({ msg: "You don't have access to this endpoint" });
}
