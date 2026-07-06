export const isAdmin = (req, res, next) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (req.user.role !== "superadmin") {
      return res
        .status(403)
        .json({ message: "Access forbidden: Admins only." });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Authorization error" });
  }
};
