import { MongoError } from "mongodb";
import user from "../models/users";
import bcrypt from "bcrypt";

export const createUser = async (
  name: string,
  password: string,
  email: string
) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();
  } catch (error) {
    if (error instanceof MongoError && error.code === 11000) {
      throw new Error("PLEASE_CHANGE_EMAIL");
    } else {
      throw error;
    }
  }
};

export const signinUser = async (email: string, password: string) => {
  try {
    const checkUser = await user.findOne({ email });

    if (!checkUser) {
      throw new Error("INVALID_USER");
    }
    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      throw new Error("INVALID_USER");
    }
  } catch (error) {
    throw error;
  }
};
