const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  CreateUser,
  LoginUser,
  uploadUserProfile,
  RegisterVerification,
  refreshUser,
} = require("../controllers/userControllers");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads/");
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authentication token is required" });
  }
  const BearerToken = token.split(" ");
  if (BearerToken.length === 2 && BearerToken[0] === "Bearer") {
    jwt.verify(BearerToken[1], SECRET_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  }
}

router.post("/vs/register", CreateUser);
router.get("/vs/verify", RegisterVerification);
router.post("/vs/upload", upload.single("userImage"), uploadUserProfile);
router.post("/vs/session", LoginUser);
router.get("/vs/refresh", authenticateToken, refreshUser);

module.exports = router;
