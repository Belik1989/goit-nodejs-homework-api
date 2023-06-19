const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const gravatar = require("gravatar");

const Jimp = require("jimp");

const path = require("path");

const User = require("../models/user");

const { RequestError } = require("../helpers");

const { ctrlWrapper } = require("../decorators");

const { SECRET_KEY } = process.env;

// const { name, email, password } = req.body;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const avatar = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    avatar,
    password: hashPassword,
  });

  const { subscription } = await User.create(newUser);
  res.status(201).json({
    user: { email, subscription, avatar },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw RequestError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw RequestError(401, "Email or password is wrong");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;
  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: " " });
  res.status(204).json();
};

const userUpdateSubscription = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne(_id);
  if (!user) {
    throw RequestError(409, "No id in db. Register, please.");
  }

  const result = await User.findOneAndUpdate({ _id }, req.user, { new: true });
  res.status(201).json(result);
};

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { filename } = req.file;
  const tempPath = path.resolve(__dirname, "../temp", filename);
  const publicPath = path.resolve(__dirname, "../public/avatars", filename);

  await Jimp.read(tempPath)
    .then((img) => {
      return img.resize(250, 250).write(publicPath);
    })
    .catch((err) => {
      throw new Error(err.message);
    });

  const user = await User.findOneAndUpdate(
    { _id },
    {
      avatar: `/avatars/${filename} `,
    },
    { new: true }
  );
  if (!user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  return res.status(200).json({ data: { avatar: user.avatar } });
};

module.exports = {
  signup: ctrlWrapper(signup),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  userUpdateSubscription: ctrlWrapper(userUpdateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
