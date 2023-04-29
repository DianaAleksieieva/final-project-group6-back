/* eslint-disable no-undef */
import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const userSchema = Schema(
  {
    userName: {
      type: String,
      default: 'Unnamed',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password  is required'],
      minlenght: 6,
    },
    token: {
      type: String,
      default: ({ _id }) => {
        return jwt.sign({ id: _id }, process.env.SECRET_KEY, {
          //  expiresIn: '15m'
        });
      },
    },
    refreshToken: {
      type: String,
      default: ({ _id }) => {
        return jwt.sign({ id: _id }, process.env.SECRET_KEY, {
          //  expiresIn: '72h'
        });
      },
    },
    avatarUrl: {
      type: String,
      required: true,
    },

    currentBalance: {
      type: Number,
      default: 0,
    },
    startBalance: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true },
);

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;
