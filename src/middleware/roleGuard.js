export const roleGuard = (roles) => {
  return (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Avtorizatsiya talab qilinadi." });
      }

      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Sizda bu amalni bajarish huquqi yo‘q." });
      }

      next();
    } catch (err) {
      next(err)
    }
  };
};
