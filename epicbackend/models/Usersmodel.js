const mongoose = require("mongoose");
const allowedGenders = ["M", "F", "L", "G", "T", "not specified"];
const bcrypt = require("bcrypt");
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },

    surname: {
      type: String,
      required: true,
      minLength: 3,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
    },

    dob: {
      type: Date,
      required: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    username: {
      type: String,
      required: true,
      minLength: 3,
    },

    gender: {
      type: String,
      enum: allowedGenders,
      required: false,
      default: "not specified",
    },

    address: {
      type: String,
      required: false,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "booksModel",
      },
    ],
  },
  {
    timestamps: true,
    strict: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("userModel", UserSchema, "users");
