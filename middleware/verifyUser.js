import errorHandler from "./errorHandler.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const cookiesWithName = req.headers.cookie;
  if (!cookiesWithName) {
    return next(errorHandler(401, "Unauthorized"));
  }

  const cookies = cookiesWithName.split(";").reduce((cookiesObj, cookie) => {
    const [name, value] = cookie.trim().split("=");
    cookiesObj[name] = value;
    return cookiesObj;
  }, {});

  const token = cookies.userTokenTask;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }

  jwt.verify(token, process.env.COOKIE_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

export const verifyManagerOrAdmin = (req, res, next) => {
  if (req.user.role != "Admin" && req.user.role != "Manager") {
    return next(errorHandler(401, "You are not perform this operation"));
  }

  next();
};
