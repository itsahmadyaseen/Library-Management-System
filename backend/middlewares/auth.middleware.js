import jwt from 'jsonwebtoken'

export const verifyJWT = async (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    console.log("Access Denied", token);
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if (!decodedToken) {
      console.log("Forbidden verification", decodedToken);
      return res
        .status(403)
        .json({ message: "Forbidden verification", data: decodedToken });
    }

    req.user = decodedToken;
    console.log("User verified , decodedToken", decodedToken);
    // console.log("req.user", req.user);
    next();
  } catch (error) {
    console.log("Error verifying user : ", error);
    return res
      .status(500)
      .json({ message: "Error verifying user", data: error });
  }
};
