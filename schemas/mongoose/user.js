import mongoose from 'mongoose';
const { Schema } = mongoose;
import bcrypt from 'bcryptjs';

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
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
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },

    currentBalance: {
      type: String,
    },
    startBalance: {
      type: String,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },
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
