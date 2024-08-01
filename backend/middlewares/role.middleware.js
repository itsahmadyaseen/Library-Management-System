
export const roleMiddleware = (roles) => {
  console.log(roles);
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      console.log("Access Denied : Member does not have access for this");
      return res.status(403).json({
        message: "Access Denied : Member does not have access for this",
      });
    }
    next();
  };
};
