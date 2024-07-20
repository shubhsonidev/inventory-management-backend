const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    profileImageURL: {
      type: String,
      default: "https://i.ibb.co/jysWMPY/user-6380868-640.webp",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "ADMIN",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt).update(user.password).digest("hex");
  this.salt = salt;
  this.password = hashedPassword;

  next();
});

const user = mongoose.model("user", userSchema);

module.exports = user;
