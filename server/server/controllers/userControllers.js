const User = require("../model/UserModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const nodemailer = require("nodemailer");

cloudinary.config({
  cloud_name: process.env.IMG_CLOUD_NAME,
  api_key: process.env.IMG_API_KEY,
  api_secret: process.env.IMG_API_SECRET,
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "viveks.brainerhub@gmail.com",
    pass: "pnfkvbmosvfljlun",
  },
});

exports.CreateUser = async (req, res) => {
  try {
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      res.status(400).send("Email Already Exist");
      return;
    }

    const hash = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, hash);
    if (req.body.password.length < 6) {
      res.status(400).send("Password must be 6 character length");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(req.body.email)) {
      const user = new User({
        name: req.body.name,
        password: hashPassword,
        email: req.body.email,
        userImage: req.file ? req.file.filename : null,
        verified: false,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

      const mailOptions = {
        from: "Test123@gmail.com",
        to: req.body.email,
        subject: "Email Verification",
        html:
          "<p>Hi " +
          user.name +
          " Please click on the following link to verify your email:http://localhost:5000/vs/verify?id=" +
          user._id +
          "",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).json({ message: "Email could not be sent" });
        } else {
          res.status(200).json({
            user: user,
            verified: user.verified,
            token: token,
            message: "Check your email for verification.",
          });
        }
      });

      // res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).send("invalid email address");
      return;
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.RegisterVerification = async (req, res) => {
  const { id } = req.query;
  try {
    const user = await User.findOne({ _id: id });
    user.verified = true;
    await user.save();
    // res.status(200).json("succeessfully verified");
    res.render("VerificationSuccess.html");
  } catch (err) {
    console.log("err: ", err);
  }
};
exports.uploadUserProfile = async (req, res) => {
  const { email } = req.body;
  const profilePicture = req.file;
  const userImage = await cloudinary.uploader.upload(profilePicture.path);
  console.log("userImage: ", userImage);

  try {
    if (userImage) {
      const user = await User.findOneAndUpdate(
        { email },
        { userImage: userImage?.url }
      );
      await user.save();
      res.status(200).json("upload succeessfully");
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(400).json({ error: error });
  }
};

exports.LoginUser = async (req, res) => {
  const userEmail = await User.findOne({ email: req.body.email });

  if (!userEmail) {
    return res.status(400).send("Incorrect password or email");
  }
  const validPassword = await bcrypt.compare(
    req.body.password,
    userEmail.password
  );

  if (!validPassword) {
    return res.status(400).send("Incorrect password or email");
  }
  if (!userEmail?.verified) {
    return res.status(400).send("User is unauthorized");
  }
  try {
    if (validPassword) {
      const token = jwt.sign({ _id: userEmail?._id }, process.env.SECRET_KEY);
      res.header("auth-token", token).send({
        token: token,
        name: userEmail.name,
        email: userEmail.email,
        userImage: userEmail.userImage,
      });
    } else {
      res.status(400).send("errors");
    }
  } catch (error) {
    res.status(500).send("error");
  }
};

exports.refreshUser = async (req, res) => {
  const token = await req.header("Authorization");
  const BearerToken = await token.split(" ");
  try {
    User.findOne({ _id: req.user._id })
      .then((user) => {
        if (user && BearerToken.length === 2 && BearerToken[0] === "Bearer") {
          res.status(200).send({
            name: user.name,
            email: user.email,
            userImage: user.userImage,
            verified: user.verified,
            token: BearerToken[1],
            id: user._id,
          });
        } else {
          console.log("User not found");
        }
      })
      .catch((error) => {
        res.status(500).send("error");
        console.error("Error:", error);
      });
  } catch (error) {
    console.log("CATCHerror: ", error);
    res.status(500).send("error");
  }
};
