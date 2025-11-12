import jwt from "jsonwebtoken";

export const authGuard = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Token topilmadi. Iltimos, tizimga kiring." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();

  } catch (err) {
    return next(err);
  }
};
