/* eslint-disable no-unused-vars */
import jwt from "jsonwebtoken";
import { ApiError } from "../errors/apiError";

export const refreshToken = (req, res, next) => {
  const refresh = req.cookies.refreshToken;

  if (!refresh) {
    return res.status(401).json({ message: "Refresh token topilmadi." });
  }

  try {
    const decoded = jwt.verify(refresh, process.env.JWT_REFRESH_SECRET);
    
    // Yangi access token yaratamiz
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" } 
    );

    // Cookiega qayta yozamiz
    res.cookie("accessToken", newAccessToken, {
      maxAge: 60 * 60 * 1000,
    });

    req.user = decoded;
    next();

  } catch (err) {
    return next(new ApiError(403, "Refresh token yaroqsiz." ));
  }
};
